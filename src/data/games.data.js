/**
 * Source unique de vérité du catalogue.
 *
 * Ce fichier ne contient QUE des données : aucun import d'image, aucun code React.
 * Il est donc lisible à la fois par le navigateur (via src/data/games.js) et par
 * Node (scripts/prerender.mjs, génération du sitemap et du JSON-LD).
 * Ajouter un jeu = ajouter un objet dans le tableau `games`.
 *
 * Champs par jeu :
 *   id               identifiant numérique historique, conservé pour rediriger les anciennes URL
 *   slug             identifiant d'URL, définitif : /play/<slug>
 *   title            titre affiché
 *   category         slug d'une des catégories ci-dessous
 *   tags             mots-clés utilisés par la recherche
 *   image            vignette servie depuis public/thumbs/ (URL stable, indispensable pour Open Graph)
 *   gamePath         chemin de l'iframe dans public/games/
 *   isNew / featured badge « nouveau » et sélection du carrousel d'accueil
 *   shortDescription une phrase, affichée sur les cartes et le hero
 *   longDescription  texte de la page de jeu, c'est ce contenu qui fait ranker la page
 *   controls         comment on joue
 *   license / credit provenance du jeu — à compléter au fur et à mesure des vérifications
 *   trademarkRisk    risque de marque déposée identifié, pour filtrage éventuel
 *   formerTitle      ancien titre, quand le jeu a été renommé pour raison de marque
 */

export const categories = [
  { slug: 'arcade', name: 'Arcade', description: "Les classiques de l'arcade, jouables sans téléchargement." },
  { slug: 'puzzle', name: 'Puzzle', description: 'Jeux de logique et de réflexion, directement dans le navigateur.' },
  { slug: 'plateau', name: 'Plateau', description: 'Échecs, dames et jeux de stratégie à deux.' },
  { slug: 'action', name: 'Action', description: 'Jeux nerveux qui demandent des réflexes.' },
];

export const games = [
  {
    id: 1,
    slug: 'whack-a-mole',
    title: 'Whack-a-Mole',
    category: 'arcade',
    tags: ['réflexes', 'solo', 'rapide'],
    image: '/thumbs/whack-a-mole.webp',
    gamePath: '/games/Whack-a-mole/index.html',
    isNew: true,
    featured: true,
    shortDescription: "Teste tes réflexes et tape les taupes dès qu'elles sortent.",
    longDescription:
      "Whack-a-Mole est un jeu de réflexes pur : des taupes surgissent au hasard dans une grille et tu dois les toucher avant qu'elles ne disparaissent. Le rythme s'accélère à mesure que ton score monte, jusqu'à ce que la fenêtre de réaction devienne inférieure à une demi-seconde. C'est là que le jeu devient intéressant : il ne suffit plus de viser, il faut anticiper les zones où les taupes apparaissent le plus souvent et garder le curseur en mouvement plutôt que de le laisser au centre. Chaque partie dure moins de deux minutes, ce qui en fait un excellent jeu de pause : tu peux relancer une manche autant de fois que tu veux pour battre ton propre record. Aucune installation, aucune inscription, aucun téléchargement : la partie démarre en un clic dans ton navigateur, sur ordinateur comme sur mobile, où l'écran tactile remplace la souris sans rien changer au principe.",
    controls: 'Souris ou doigt : touche les taupes qui apparaissent.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 2,
    slug: 'snake',
    title: 'Snake',
    category: 'arcade',
    tags: ['classique', 'solo', 'score'],
    image: '/thumbs/snake.webp',
    gamePath: '/games/Snake/index.html',
    featured: true,
    shortDescription: 'Le classique intemporel : mange pour grandir, évite les murs.',
    longDescription:
      "Snake est probablement le jeu le plus universellement connu de toute l'histoire du jeu mobile, et sa règle tient en une phrase : tu diriges un serpent qui avance sans jamais s'arrêter, tu manges les pastilles pour grandir, et tu perds si tu touches un mur ou ton propre corps. Toute la difficulté vient de cette croissance : plus tu réussis, plus tu deviens ton propre obstacle. Les bons joueurs ne foncent pas vers la nourriture, ils occupent l'espace en serpentant le long des bords pour garder un couloir de sortie ouvert en permanence. À partir d'une certaine longueur, chaque virage doit être planifié plusieurs cases à l'avance, et une seule hésitation suffit à t'enfermer dans ta propre queue. C'est ce qui explique la longévité du jeu : les règles s'apprennent en cinq secondes, la maîtrise prend des heures. Jouable au clavier sur ordinateur et au glissement de doigt sur mobile, sans téléchargement ni compte.",
    controls: 'Flèches directionnelles, ou glisser du doigt sur mobile.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 3,
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    category: 'plateau',
    tags: ['2 joueurs', 'rapide', 'stratégie'],
    image: '/thumbs/tic-tac-toe.webp',
    gamePath: '/games/TicTacToe/index.html',
    shortDescription: 'Le morpion : aligne trois symboles avant ton adversaire.',
    longDescription:
      "Le morpion, ou Tic-Tac-Toe, est le jeu de stratégie le plus court qui existe : une grille de trois cases sur trois, deux symboles, et le premier qui aligne trois croix ou trois ronds gagne. Sa simplicité cache une propriété mathématique amusante : le jeu est entièrement résolu. Deux joueurs qui connaissent la stratégie optimale finissent systématiquement sur une égalité, et la première règle à retenir est que le centre et les quatre coins valent bien plus que les cases latérales. Le vrai jeu consiste donc à repérer l'erreur de l'adversaire, puis à créer une double menace : deux alignements possibles en même temps, impossibles à bloquer tous les deux. C'est un excellent jeu à deux sur le même écran, idéal pour une partie de trente secondes, et une porte d'entrée classique vers la logique et l'anticipation pour les plus jeunes. Rien à installer : tu ouvres la page et tu joues.",
    controls: 'Clique sur une case libre.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 4,
    slug: 'tilt-maze',
    title: 'Tilt Maze',
    category: 'puzzle',
    tags: ['labyrinthe', 'solo', 'réflexion'],
    image: '/thumbs/tilt-maze.webp',
    gamePath: '/games/TiltMaze/index.html',
    shortDescription: "Guide la bille jusqu'à la sortie du labyrinthe.",
    longDescription:
      "Tilt Maze reprend l'idée du labyrinthe de poche que l'on inclinait dans tous les sens pour faire rouler une bille jusqu'à la sortie. Ici, ce sont les flèches du clavier qui donnent l'inclinaison, et la bille continue de rouler jusqu'à rencontrer un mur : tu ne contrôles donc pas la distance, seulement la direction. Cette contrainte change tout. Un labyrinthe qui paraît trivial devient un vrai casse-tête, parce que chaque mouvement t'envoie à l'autre bout du couloir et qu'il faut utiliser les murs comme des points d'arrêt. La bonne méthode consiste à lire le plan avant de bouger, à repérer les obstacles qui serviront de freins, puis à composer la séquence de directions dans le bon ordre. C'est un jeu calme, sans chronomètre qui stresse, où l'on progresse par tâtonnement puis par compréhension. Il se joue au clavier sur ordinateur, dans le navigateur, sans installation ni inscription.",
    controls: 'Flèches directionnelles.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 5,
    slug: 'pong',
    title: 'Pong',
    category: 'arcade',
    tags: ['classique', '2 joueurs', 'réflexes'],
    image: '/thumbs/pong.webp',
    gamePath: '/games/Pong/index.html',
    isNew: true,
    featured: true,
    shortDescription: "Le tout premier jeu vidéo de l'histoire : vitesse et réflexes.",
    longDescription:
      "Pong est le jeu qui a lancé l'industrie du jeu vidéo en 1972 : deux raquettes, une balle carrée, aucun décor, et pourtant un principe qui n'a jamais vieilli. Chaque joueur défend son côté de l'écran et doit renvoyer la balle ; le point est marqué quand l'adversaire la laisse passer. La subtilité, que beaucoup découvrent en jouant, c'est que la balle ne rebondit pas seulement selon l'angle d'arrivée : l'endroit de la raquette qui la touche modifie sa trajectoire. Frapper avec le bord change complètement l'angle, ce qui permet de placer des balles impossibles à rattraper. Et comme la vitesse augmente à chaque échange, les fins de manche se jouent au réflexe pur. C'est le jeu idéal à deux sur le même clavier : les parties sont courtes, tendues, et la revanche est toujours immédiate. Jouable directement dans le navigateur, sans téléchargement, sur ordinateur comme sur tablette.",
    controls: 'Flèches haut/bas. Deuxième joueur : W et S.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 6,
    slug: 'minesweeper',
    title: 'Minesweeper',
    category: 'puzzle',
    tags: ['logique', 'solo', 'classique'],
    image: '/thumbs/minesweeper.webp',
    gamePath: '/games/Minesweeper/index.html',
    shortDescription: 'Déminer la grille sans faire exploser une seule mine.',
    longDescription:
      "Le démineur est un jeu de déduction pure, et c'est ce qui le distingue de la plupart des jeux de réflexion : il n'y a rien à mémoriser, seulement à raisonner. Tu révèles des cases, chaque chiffre t'indique combien de mines se trouvent parmi les huit cases voisines, et tu dois en déduire lesquelles sont sûres. Les premiers clics relèvent de la chance, mais très vite le raisonnement prend le relais : un « 1 » qui touche une seule case inconnue désigne forcément une mine, deux chiffres voisins se recoupent pour éliminer des possibilités, et les configurations de bord se résolvent presque toujours de façon certaine. Poser des drapeaux sur les mines identifiées permet de garder la grille lisible et évite le clic fatal par distraction. Une partie se termine soit par une grille entièrement dégagée, soit par une explosion — et l'envie immédiate d'en relancer une. Jouable dans le navigateur, sans installation.",
    controls: 'Clic gauche pour révéler une case, clic droit pour poser un drapeau.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 7,
    slug: 'sweet-match',
    title: 'Sweet Match',
    formerTitle: 'Candy-Crash',
    category: 'puzzle',
    tags: ['match-3', 'solo', 'combos'],
    image: '/thumbs/sweet-match.webp',
    gamePath: '/games/Candycrash/index.html',
    isNew: true,
    shortDescription: 'Aligne trois bonbons identiques pour les faire exploser.',
    longDescription:
      "Sweet Match est un jeu d'alignement, ou « match-3 » : tu échanges deux bonbons voisins pour en aligner au moins trois de la même couleur, qui disparaissent alors et laissent tomber ceux du dessus. Le plaisir du genre ne vient pas des alignements simples, mais des réactions en chaîne : quand les bonbons retombent, ils forment parfois de nouveaux alignements tout seuls, et un seul bon coup peut vider un quart de la grille. Les joueurs expérimentés jouent donc en bas de plateau plutôt qu'en haut, parce que chaque explosion basse fait descendre toute la colonne et multiplie les chances de cascade. L'autre réflexe utile est de chercher les alignements de quatre ou cinq bonbons, plus rentables qu'un simple trois. C'est un jeu qui se joue aussi bien deux minutes qu'une demi-heure, à la souris sur ordinateur ou au doigt sur mobile, sans téléchargement ni création de compte.",
    controls: 'Glisse un bonbon vers une case adjacente pour échanger les deux.',
    license: 'à vérifier',
    credit: '',
    trademarkRisk:
      "Le titre d'origine, « Candy-Crash », était trop proche de Candy Crush (King). Renommé en Sweet Match. La page HTML du jeu contient encore l'ancien titre, à corriger.",
  },
  {
    id: 10,
    slug: '2048',
    title: '2048',
    category: 'puzzle',
    tags: ['logique', 'score', 'solo'],
    image: '/thumbs/2048.webp',
    gamePath: '/games/2048/index.html',
    featured: true,
    shortDescription: 'Fusionne les tuiles identiques pour atteindre 2048.',
    longDescription:
      "2048 se joue sur une grille de quatre cases sur quatre. Tu fais glisser toutes les tuiles dans une direction ; celles qui portent le même nombre fusionnent et doublent leur valeur, et une nouvelle tuile apparaît après chaque mouvement. L'objectif affiché est d'atteindre la tuile 2048, mais le vrai enjeu est de ne pas saturer la grille. La stratégie qui fonctionne est contre-intuitive pour un débutant : il ne faut pas fusionner dès que c'est possible, mais garder sa plus grosse tuile bloquée dans un coin et ne jamais utiliser la direction qui l'en ferait sortir. En pratique, cela veut dire jouer presque exclusivement sur trois directions, et construire une rangée décroissante le long d'un bord. Les parties perdues le sont presque toujours pour la même raison : un mouvement vertical de trop qui déplace la grosse tuile au milieu du plateau. Jouable au clavier ou au doigt, dans le navigateur.",
    controls: 'Flèches directionnelles, ou glisser du doigt.',
    license: 'MIT',
    credit: 'Gabriele Cirulli',
    creditUrl: 'https://github.com/gabrielecirulli/2048',
  },
  {
    id: 12,
    slug: 'flappy-wings',
    title: 'Flappy Wings',
    formerTitle: 'Flappy Bird',
    category: 'arcade',
    tags: ['réflexes', 'score', 'difficile'],
    image: '/thumbs/flappy-wings.webp',
    gamePath: '/games/floppybird/index.html',
    shortDescription: "Fais passer l'oiseau entre les tuyaux, un battement d'ailes à la fois.",
    longDescription:
      "Flappy Wings tient sur une seule commande : tu appuies, l'oiseau monte d'un coup, puis la gravité le fait redescendre. Il n'y a rien d'autre à apprendre, et c'est précisément ce qui rend le jeu si difficile. Chaque tuyau demande de trouver le bon rythme de battements, ni trop rapides — l'oiseau part au plafond — ni trop lents. La faute classique du débutant est de vouloir corriger sa trajectoire par de grands mouvements paniqués : les bons scores s'obtiennent au contraire avec de petits appuis réguliers, en visant le bas de l'ouverture plutôt que son centre, parce que la chute est toujours plus facile à rattraper qu'une remontée. Les parties durent quelques secondes au début, et le compteur devient rapidement une affaire personnelle : dépasser dix tuyaux est déjà une réussite. C'est le jeu de score par excellence, jouable d'un seul doigt sur mobile ou d'une seule touche au clavier, sans rien installer.",
    controls: "Clic, barre d'espace ou tap pour battre des ailes.",
    license: 'Apache 2.0 — voir public/games/floppybird/LICENSE',
    credit: '',
    trademarkRisk:
      "Le titre d'origine, « Flappy Bird », est une marque de Dong Nguyen. Renommé en Flappy Wings. Les visuels du jeu restent proches de l'original : à remplacer avant toute monétisation.",
  },
  {
    id: 14,
    slug: 'fruits',
    title: 'Fruits',
    category: 'action',
    tags: ['réflexes', 'score', 'rapide'],
    image: '/thumbs/fruits.webp',
    gamePath: '/games/fruits/index.html',
    shortDescription: 'Tranche les fruits qui volent et évite les bombes.',
    longDescription:
      "Fruits est un jeu de découpe au geste : des fruits sont lancés en l'air, tu traces un trait à travers eux pour les trancher, et tu marques d'autant plus de points que le mouvement en coupe plusieurs d'un coup. Des bombes se mêlent régulièrement aux fruits, et en toucher une termine la partie — ce qui transforme un jeu de vitesse en jeu de précision. Toute l'astuce consiste à ne pas balayer l'écran au hasard : les gestes longs et diagonaux rapportent des combos, mais ce sont aussi ceux qui traversent involontairement une bombe. Les meilleurs joueurs attendent une fraction de seconde que les fruits se regroupent au sommet de leur trajectoire, là où ils ralentissent, puis coupent en une seule ligne propre. Les parties sont courtes et nerveuses, parfaites sur écran tactile où le doigt remplace naturellement la lame. Jouable directement dans le navigateur, sans installation.",
    controls: 'Glisse la souris ou le doigt à travers les fruits.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 16,
    slug: 'dot-muncher',
    title: 'Dot Muncher',
    formerTitle: 'PacMan',
    category: 'arcade',
    tags: ['classique', 'labyrinthe', 'score'],
    image: '/thumbs/dot-muncher.webp',
    gamePath: '/games/Pacman/index.html',
    isNew: true,
    shortDescription: 'Avale toutes les pastilles du labyrinthe en évitant les fantômes.',
    longDescription:
      "Dot Muncher est un jeu de labyrinthe : tu parcours un plan fermé pour en avaler toutes les pastilles, poursuivi par des ennemis qui patrouillent les couloirs. Le niveau est terminé quand la dernière pastille disparaît. Ce qui fait la profondeur du genre, c'est que les poursuivants ne se déplacent pas au hasard : ils suivent des logiques de trajectoire, ce qui rend leurs mouvements prévisibles pour qui prend le temps de les observer. Un joueur débutant fuit en ligne droite et se retrouve coincé dans un cul-de-sac ; un joueur expérimenté tourne autour d'un bloc, utilise les couloirs de contournement et laisse volontairement des pastilles de côté pour garder une voie d'échappement. Les grosses pastilles inversent temporairement le rapport de force et sont à garder pour les moments critiques, pas à consommer dès le début du niveau. Jouable au clavier dans le navigateur, sans téléchargement ni inscription.",
    controls: 'Flèches directionnelles.',
    license: 'à vérifier',
    credit: '',
    trademarkRisk:
      "Le titre d'origine, « PacMan », est une marque déposée de Bandai Namco. Renommé en Dot Muncher, mais les personnages et le labyrinthe restent reconnaissables : risque élevé maintenu tant que les visuels ne sont pas remplacés.",
  },
  {
    id: 17,
    slug: 'chess',
    title: 'Échecs',
    category: 'plateau',
    tags: ['stratégie', '2 joueurs', 'classique'],
    image: '/thumbs/chess.webp',
    gamePath: '/games/Chess/chess.html',
    isNew: true,
    featured: true,
    shortDescription: 'Les échecs à deux sur le même écran, sans inscription.',
    longDescription:
      "Les échecs se jouent à deux sur un plateau de soixante-quatre cases, avec seize pièces par camp et un objectif unique : mettre le roi adverse en échec sans qu'il puisse s'échapper. C'est le jeu de stratégie le plus étudié au monde, et pourtant les principes qui font gagner les premières parties sont peu nombreux. Occuper le centre du plateau donne de la mobilité à tes pièces ; sortir les cavaliers et les fous avant de bouger deux fois la même pièce fait gagner du temps ; mettre le roi à l'abri par un roque précoce évite la moitié des défaites rapides. Ensuite viennent les échanges : toutes les pièces n'ont pas la même valeur, et accepter de perdre un pion pour ouvrir une colonne est souvent un excellent calcul. Cette version se joue à deux sur le même écran, ce qui en fait un bon support pour apprendre à quelqu'un ou pour rejouer une position tranquillement. Aucune installation, aucun compte.",
    controls: "Clique sur une pièce, puis sur sa case de destination.",
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 18,
    slug: 'block-stacker',
    title: 'Block Stacker',
    formerTitle: 'Tetris',
    category: 'puzzle',
    tags: ['classique', 'score', 'solo'],
    image: '/thumbs/block-stacker.webp',
    gamePath: '/games/tetris-game/index.html',
    isNew: true,
    shortDescription: 'Empile les pièces qui tombent et complète des lignes entières.',
    longDescription:
      "Block Stacker est le jeu d'empilement le plus connu du genre : des pièces de quatre blocs descendent une par une, tu les fais pivoter et glisser pour combler les trous, et chaque ligne complète disparaît en libérant de la place. La pile monte inexorablement, la vitesse augmente, et la partie s'arrête quand une pièce ne peut plus entrer. Toute la stratégie consiste à ne pas jouer au coup par coup. Les joueurs qui progressent gardent leur pile la plus plate possible, évitent les trous fermés — ceux qu'aucune pièce ne pourra combler avant d'avoir effacé la ligne du dessus — et réservent volontairement une colonne libre sur un bord pour y placer la pièce longue et effacer quatre lignes d'un coup. Savoir où poser une pièce avant même qu'elle n'arrive est ce qui sépare une partie de deux minutes d'une partie de vingt. Jouable au clavier dans le navigateur, sans installation.",
    controls: 'Flèches gauche/droite pour déplacer, haut pour pivoter, espace pour descendre.',
    license: 'MIT — voir public/games/tetris-game/LICENSE',
    credit: '',
    trademarkRisk:
      "Le titre d'origine, « Tetris », est une marque de Tetris Holding, très active en réclamations DMCA. Renommé en Block Stacker. La forme des pièces et les couleurs restent caractéristiques : risque résiduel réel.",
  },
  {
    id: 19,
    slug: 'checkers',
    title: 'Dames',
    category: 'plateau',
    tags: ['stratégie', '2 joueurs', 'classique'],
    image: '/thumbs/checkers.webp',
    gamePath: '/games/checkers/index.html',
    isNew: true,
    shortDescription: 'Le jeu de dames : capture les pions adverses et fais-toi couronner.',
    longDescription:
      "Le jeu de dames se joue sur les cases sombres d'un damier : les pions avancent en diagonale d'une case, capturent en sautant par-dessus une pièce adverse, et deviennent « dames » en atteignant la dernière rangée, ce qui leur permet ensuite de se déplacer dans les deux sens. Les règles s'expliquent en une minute, mais le jeu est bien plus tactique qu'il n'y paraît, parce que les captures sont souvent obligatoires et enchaînées : un sacrifice apparent peut déclencher une prise multiple qui retourne complètement la position. La conséquence pratique est qu'on ne joue pas les dames en avançant tout droit. Il faut garder ses pions liés pour qu'ils se protègent mutuellement, tenir sa dernière rangée le plus longtemps possible pour empêcher l'adversaire de se faire couronner, et compter les échanges deux coups à l'avance. Cette version se joue à deux sur le même écran, directement dans le navigateur, sans installation.",
    controls: 'Clique sur un pion, puis sur sa case de destination.',
    license: 'à vérifier',
    credit: '',
  },
  {
    id: 20,
    slug: 'ninja-vs-evilcorp',
    title: 'Ninja vs EVILCORP',
    category: 'action',
    tags: ['action', 'js13k', 'indé'],
    image: '/thumbs/ninja-vs-evilcorp.webp',
    gamePath: '/games/ninja-vs-evil-corp/index.html',
    isNew: true,
    shortDescription: 'Infiltre les locaux d’EVILCORP et neutralise tes ennemis en ninja.',
    longDescription:
      "Ninja vs EVILCORP est un jeu d'action indépendant issu de la compétition js13kGames, dont la règle est que le jeu entier doit tenir en treize kilooctets. Cette contrainte façonne complètement le résultat : pas de longue introduction, pas de tutoriel, un style graphique épuré et une boucle de jeu immédiatement lisible. Tu incarnes un ninja infiltré dans les locaux d'une entreprise hostile, et tu progresses en éliminant les gardes qui te barrent la route. Le jeu récompense le mouvement continu plutôt que la prudence : rester immobile te laisse exposé, alors qu'enchaîner les déplacements et les attaques permet de traverser une salle avant que les ennemis n'aient réagi. C'est une bonne illustration de ce que la scène du jeu indépendant produit dans des formats très courts, à des années-lumière des productions commerciales en termes de moyens, mais souvent plus inventive. Développé par remvst. Jouable dans le navigateur, sans installation.",
    controls: 'Clavier pour se déplacer, souris pour viser et attaquer.',
    license: "à confirmer avec l'auteur",
    credit: 'remvst (js13kGames)',
    creditUrl: 'https://github.com/remvst',
  },
  {
    id: 21,
    slug: 'choch',
    title: 'CHOCH',
    category: 'action',
    tags: ['expérimental', 'js13k', 'audio'],
    image: '/thumbs/choch.webp',
    gamePath: '/games/CHOCH/index.html',
    isNew: true,
    shortDescription: 'Une expérience audiovisuelle générative et hypnotique.',
    longDescription:
      "CHOCH n'est pas un jeu au sens classique du terme, et c'est ce qui le rend intéressant : c'est une expérience audiovisuelle où l'image et le son sont générés par le code plutôt que chargés depuis des fichiers. Comme les autres entrées js13kGames, l'ensemble tient dans quelques kilooctets, ce qui oblige l'auteur à tout produire par calcul — les formes, les couleurs, la musique. Le résultat est une pièce interactive courte, plus proche de l'art génératif que du jeu de score, où tes actions modifient ce que tu vois et ce que tu entends. Il vaut mieux l'aborder sans chercher un objectif : on y reste quelques minutes, on observe comment les motifs réagissent, et on comprend au passage à quel point peu de code suffit à produire quelque chose de dense. À jouer avec le son, qui fait la moitié du travail. Aucun téléchargement, tout s'exécute dans le navigateur.",
    controls: 'Clavier.',
    license: "à confirmer avec l'auteur",
    credit: '',
  },
  {
    id: 22,
    slug: 'edge-not-found',
    title: 'Edge Not Found',
    category: 'puzzle',
    tags: ['sokoban', 'js13k', 'indé'],
    image: '/thumbs/edge-not-found.webp',
    gamePath: '/games/Edge-Not-Found/index.html',
    shortDescription: "Un Sokoban sur une grille qui se répète à l'infini.",
    longDescription:
      "Edge Not Found est un jeu de poussée de caisses — un Sokoban — avec une idée qui change tout : la grille n'a pas de bord. Quand tu sors par la droite, tu réapparais à gauche ; quand tu sors par le haut, tu réapparais en bas. Le plateau est donc une surface enroulée sur elle-même, et un mur qui semble te bloquer peut se contourner en faisant le tour du niveau. Cette seule règle rend les énigmes déroutantes au début, parce que notre intuition spatiale suppose toujours des limites. Il faut réapprendre à lire un niveau : une caisse au bord droit est en réalité collée au bord gauche, et pousser vers l'avant peut revenir à pousser vers l'arrière. Comme dans tout Sokoban, une caisse mal poussée est définitivement bloquée, donc mieux vaut réfléchir avant de bouger. Une entrée js13kGames 2020 de Tom Hermans, jouable au clavier dans le navigateur.",
    controls: 'Flèches directionnelles.',
    license: "à confirmer avec l'auteur",
    credit: 'Tom Hermans (@Auroriax), js13kGames 2020',
  },
  {
    id: 23,
    slug: 'fourfold',
    title: 'Fourfold',
    category: 'puzzle',
    tags: ['logique', 'indé', 'réflexion'],
    image: '/thumbs/fourfold.webp',
    gamePath: '/games/fourfold/index.html',
    isNew: true,
    shortDescription: 'Un casse-tête de symétrie et de rotation.',
    longDescription:
      "Fourfold est un casse-tête construit autour d'une seule mécanique : la rotation. Tu fais pivoter des groupes de cases pour amener les éléments dans la bonne configuration, et comme chaque rotation déplace plusieurs pièces à la fois, un coup qui résout un côté du plateau défait presque toujours quelque chose de l'autre côté. C'est cette interdépendance qui fait la difficulté du jeu, pas la complexité des règles — il n'y en a qu'une. La méthode qui marche est celle des casse-têtes de type Rubik : ne pas chercher à tout placer d'un coup, mais identifier des séquences de rotations qui déplacent une pièce en remettant les autres à leur place. Les premiers niveaux se résolvent à l'intuition, les suivants demandent de vraiment planifier. C'est un jeu silencieux et sans chronomètre, du genre qu'on lance pour réfléchir cinq minutes. Jouable à la souris dans le navigateur, sans installation ni compte.",
    controls: 'Souris : clique pour faire pivoter un groupe de cases.',
    license: "à confirmer avec l'auteur",
    credit: '',
  },
];
