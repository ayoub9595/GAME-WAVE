// The game board is 8x8 logically, but C++ represents it as an 8x4 matrix.
// This function maps an (x, y) 8x8 logical coordinate to the 8x4 inner coordinate.
function getInnerCoord(row, col) {
    // Only dark squares can hold pieces. Dark squares are when (row + col) % 2 !== 0
    if ((row + col) % 2 === 0) return null;
    return { x: row, y: Math.floor(col / 2) };
}

// Map the 8x4 C++ matrix string back to 8x8 index
// State string is length 32
function getPieceAt(stateStr, row, col) {
    const inner = getInnerCoord(row, col);
    if (!inner) return 'e'; // empty/light square
    const index = inner.x * 4 + inner.y;
    return stateStr.charAt(index);
}

// Map 8x4 index to 8x8 index
function getOuterCoord(index) {
    const row = Math.floor(index / 4);
    const y = index % 4;
    const col = (row % 2 === 0) ? y * 2 + 1 : y * 2;
    return { row, col };
}

document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('board');
    const turnIndicator = document.getElementById('turn-indicator');
    const loader = document.getElementById('loader');

    const gameModeSelect = document.getElementById('game-mode');
    const resetBtn = document.getElementById('reset-game');

    let isMyTurn = true;
    let selectedPiece = null;
    let validMoves = []; // Array of {row, col}
    let gameState = "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"; // 32 'e's
    let gameMode = '1vscpu';

    function initAPI() {
        console.log("Wasm module loaded!");
        window.api = {
            initGame: Module.cwrap('initGame', null, []),
            getBoardState: Module.cwrap('getBoardState', 'string', []),
            makeMove: Module.cwrap('makeMove', 'number', ['number', 'number', 'number', 'number']),
            getTurn: Module.cwrap('getTurn', 'number', []),
            isGameOver: Module.cwrap('isGameOver', 'number', []),
            computeAiMove: Module.cwrap('computeAiMove', null, []),
            getValidMoves: Module.cwrap('getValidMoves', 'string', ['number', 'number'])
        };

        gameModeSelect.addEventListener('change', (e) => {
            gameMode = e.target.value;
            startGame();
        });

        resetBtn.addEventListener('click', () => {
            startGame();
        });

        startGame();
    }

    // Handle race conditions where Module is already loaded from cache
    if (typeof Module !== 'undefined' && Module._initGame) {
        initAPI();
    } else {
        window.Module = window.Module || {};
        const oldInit = window.Module.onRuntimeInitialized;
        window.Module.onRuntimeInitialized = () => {
            if (oldInit) oldInit();
            initAPI();
        };
    }

    function startGame() {
        api.initGame();
        updateBoard();
    }

    function createPiece(type, row, col) {
        const piece = document.createElement('div');
        piece.classList.add('piece');

        if (type === 'r') piece.classList.add('red');
        else if (type === 'R') piece.classList.add('red', 'king');
        else if (type === 'b') piece.classList.add('black');
        else if (type === 'B') piece.classList.add('black', 'king');
        else return null;

        piece.dataset.row = row;
        piece.dataset.col = col;
        return piece;
    }

    function render() {
        boardEl.innerHTML = '';
        const turn = api.getTurn(); // 0 is Black (Player 1), 1 is Red (Player 2/AI)
        isMyTurn = turn === 0;

        if (api.isGameOver()) {
            turnIndicator.textContent = "Game Over!";
            turnIndicator.style.color = "#fbbf24";
        } else if (isMyTurn) {
            turnIndicator.textContent = gameMode === '1vscpu' ? "Your Turn (Black)" : "Player 1 Turn (Black)";
            turnIndicator.style.color = "#f8fafc";
            loader.classList.remove('active');
        } else {
            if (gameMode === '1vscpu') {
                turnIndicator.textContent = "AI is thinking (Red)...";
                turnIndicator.style.color = "#f87171";
                loader.classList.add('active');
            } else {
                turnIndicator.textContent = "Player 2 Turn (Red)";
                turnIndicator.style.color = "#f87171";
                loader.classList.remove('active');
            }
        }

        // Pre-compute which pieces are movable for the current player
        const movablePieces = new Set();
        if (!api.isGameOver()) {
            const turn = api.getTurn(); // 0 = Black, 1 = Red
            const playerIsBlack = turn === 0;
            const playerIsRed = turn === 1;
            // In 1vs1 either player controls their colour; in 1vscpu only black player is human
            const humanControlsBlack = gameMode === '1vscpu' ? true : true;
            const humanControlsRed = gameMode === '1vs1';

            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const pt = getPieceAt(gameState, r, c);
                    if (pt === 'e') continue;
                    const isBlack = pt === 'b' || pt === 'B';
                    const isRed = pt === 'r' || pt === 'R';
                    // Only mark pieces belonging to the current active player
                    if ((playerIsBlack && isBlack && humanControlsBlack) ||
                        (playerIsRed && isRed && humanControlsRed)) {
                        const inner = getInnerCoord(r, c);
                        if (inner) {
                            const moves = api.getValidMoves(inner.x, inner.y);
                            if (moves && moves.length > 0) {
                                movablePieces.add(`${r},${c}`);
                            }
                        }
                    }
                }
            }
        }

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');

                // Determine square color based on row+col parity
                const isDark = (row + col) % 2 !== 0;
                square.classList.add(isDark ? 'dark' : 'light');
                square.dataset.row = row;
                square.dataset.col = col;

                if (isDark) {
                    const pieceType = getPieceAt(gameState, row, col);
                    if (pieceType !== 'e') {
                        const piece = createPiece(pieceType, row, col);
                        if (piece) {
                            square.appendChild(piece);

                            // Only allow clicks if it's our turn and it's our piece
                            const isBlackPiece = pieceType === 'b' || pieceType === 'B';
                            const isRedPiece = pieceType === 'r' || pieceType === 'R';

                            let canClick = false;
                            if (gameMode === '1vscpu') {
                                canClick = isMyTurn && isBlackPiece;
                            } else {
                                canClick = (isMyTurn && isBlackPiece) || (!isMyTurn && isRedPiece);
                            }

                            if (canClick) {
                                piece.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                    selectPiece(row, col);
                                });
                            }

                            // Highlight movable pieces so the player knows what they can pick
                            if (movablePieces.has(`${row},${col}`)) {
                                piece.classList.add('movable');
                            }
                        }
                    }
                }

                // If this square is a valid move, highlight it
                if (isDark && validMoves.some(m => m.row === row && m.col === col)) {
                    square.classList.add('valid-move');
                }

                square.addEventListener('click', () => {
                    handleSquareClick(row, col);
                });

                boardEl.appendChild(square);
            }
        }
    }

    function selectPiece(row, col) {
        const turn = api.getTurn();
        if (gameMode === '1vscpu' && turn === 1) return;

        // Fetch valid moves for this piece FIRST, before committing to selection
        const inner = getInnerCoord(row, col);
        const newValidMoves = [];

        if (inner) {
            const movesStr = api.getValidMoves(inner.x, inner.y);
            if (movesStr) {
                const moves = movesStr.split(';');
                moves.forEach(m => {
                    const parts = m.split(',');
                    if (parts.length === 2) {
                        const xf = parseInt(parts[0], 10);
                        const yf = parseInt(parts[1], 10);
                        newValidMoves.push(getOuterCoord(xf * 4 + yf));
                    }
                });
            }
        }

        // If this piece has no valid moves, don't select it at all
        if (newValidMoves.length === 0) {
            return;
        }

        selectedPiece = { row, col };
        validMoves = newValidMoves;

        render(); // re-render to clear previous selections and show new valid moves

        // Highlight the selected square/piece
        const sq = boardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (sq && sq.firstChild) {
            sq.firstChild.classList.add('selected');
        }
    }

    function animateMove(oldState, newState, onComplete) {
        if (oldState === newState) {
            onComplete();
            return;
        }

        let originIdx = -1;
        let destIdx = -1;
        let capturedIndices = [];

        for (let i = 0; i < 32; i++) {
            if (newState[i] !== 'e' && oldState[i] === 'e') {
                destIdx = i;
            }
        }

        if (destIdx !== -1) {
            const destPiece = newState[destIdx];
            const isRed = destPiece === 'r' || destPiece === 'R';
            const isBlack = destPiece === 'b' || destPiece === 'B';

            for (let i = 0; i < 32; i++) {
                if (oldState[i] !== 'e' && newState[i] === 'e') {
                    const oldPiece = oldState[i];
                    const oldIsRed = oldPiece === 'r' || oldPiece === 'R';
                    const oldIsBlack = oldPiece === 'b' || oldPiece === 'B';

                    if ((isRed && oldIsRed) || (isBlack && oldIsBlack)) {
                        originIdx = i;
                    } else {
                        capturedIndices.push(i);
                    }
                }
            }
        }

        if (originIdx === -1 || destIdx === -1) {
            onComplete();
            return;
        }

        const startCoord = getOuterCoord(originIdx);
        const endCoord = getOuterCoord(destIdx);

        const pieceEl = boardEl.querySelector(`.piece[data-row="${startCoord.row}"][data-col="${startCoord.col}"]`);
        const endSquareEl = boardEl.querySelector(`.square[data-row="${endCoord.row}"][data-col="${endCoord.col}"]`);

        if (!pieceEl || !endSquareEl) {
            onComplete();
            return;
        }

        capturedIndices.forEach(idx => {
            const coord = getOuterCoord(idx);
            const capEl = boardEl.querySelector(`.piece[data-row="${coord.row}"][data-col="${coord.col}"]`);
            if (capEl) {
                capEl.style.transition = 'opacity 0.2s';
                capEl.style.opacity = '0';
            }
        });

        const startRect = pieceEl.getBoundingClientRect();
        const endRect = endSquareEl.getBoundingClientRect();
        const dx = endRect.left - startRect.left + (endRect.width - startRect.width) / 2;
        const dy = endRect.top - startRect.top + (endRect.height - startRect.height) / 2;

        pieceEl.style.zIndex = 100;
        pieceEl.style.transition = 'transform 0.4s ease-in-out';
        pieceEl.style.transform = `translate(${dx}px, ${dy}px)`;

        setTimeout(() => {
            onComplete();
        }, 400);
    }

    function handleSquareClick(row, col) {
        if (!selectedPiece) return;

        const turn = api.getTurn();
        if (gameMode === '1vscpu' && turn === 1) return;

        // Only valid to click on empty dark squares
        const targetType = getPieceAt(gameState, row, col);
        if (targetType !== 'e' || (row + col) % 2 === 0) return;

        // Try to make a move via Wasm API
        const startInner = getInnerCoord(selectedPiece.row, selectedPiece.col);
        const endInner = getInnerCoord(row, col);

        if (!startInner || !endInner) return;

        const success = api.makeMove(startInner.x, startInner.y, endInner.x, endInner.y);

        if (success === 1) {
            const sq = boardEl.querySelector(`[data-row="${selectedPiece.row}"][data-col="${selectedPiece.col}"]`);
            if (sq && sq.firstChild) sq.firstChild.classList.remove('selected');
            selectedPiece = null;
            validMoves = [];

            const newState = api.getBoardState();

            animateMove(gameState, newState, () => {
                gameState = newState;
                render();

                // If it's now AI's turn, trigger the AI
                if (gameMode === '1vscpu' && api.getTurn() === 1 && !api.isGameOver()) {
                    turnIndicator.textContent = "AI is thinking (Red)...";
                    turnIndicator.style.color = "#f87171";
                    loader.classList.add('active');

                    // Allow UI to update before blocking AI computation
                    setTimeout(() => {
                        const stateBeforeAi = api.getBoardState();
                        api.computeAiMove();
                        const stateAfterAi = api.getBoardState();

                        animateMove(stateBeforeAi, stateAfterAi, () => {
                            gameState = stateAfterAi;
                            render();
                        });
                    }, 50);
                }
            });
        } else {
            // Invalid move or requires multiple jump handling (simplified here)
            console.log("Invalid move or must complete jump sequence.");
            selectedPiece = null;
            render();
        }
    }

    function updateBoard() {
        gameState = api.getBoardState();
        render();
    }
});
