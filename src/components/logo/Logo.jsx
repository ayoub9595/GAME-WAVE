import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

/**
 * Le SVG n'a plus de width/height en dur (400 x 120).
 * C'était la cause du header cassé sur mobile : le logo était plus large que
 * l'écran, donc il poussait le menu, le sélecteur de langue et le bouton de
 * thème hors du champ visible (masqués par overflow:hidden du header).
 * La taille est maintenant pilotée par la CSS, le viewBox fait le reste.
 */
export default function Logo() {
    const { t } = useTranslation();

    return (
        <Link to="/" className={styles['logo-link']} aria-label="Game Wave">
            <svg
                viewBox="0 0 350 90"
                className={styles.logo}
                role="img"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <g filter="url(#glow)">
                    <path
                        d="M40 25H70C80 25 85 30 85 40V50C85 60 80 65 70 65H40C30 65 25 60 25 50V40C25 30 30 25 40 25Z"
                        stroke="url(#neonGradient)"
                        strokeWidth="3"
                        fill="none"
                    />
                    <circle cx="35" cy="45" r="4" fill="#22d3ee" />
                    <circle cx="75" cy="45" r="2" fill="#a855f7" />
                </g>

                <text
                    x="95"
                    y="50"
                    fontFamily="Poppins, Arial, sans-serif"
                    fontWeight="900"
                    fontSize="28"
                    fill="url(#neonGradient)"
                    style={{ letterSpacing: '1px' }}
                >
                    GAMEWAVE
                </text>

                <text
                    x="95"
                    y="68"
                    className={styles['logo-slogan']}
                    fontFamily="Poppins, Arial, sans-serif"
                    fontWeight="bold"
                    fontSize="11"
                    style={{ letterSpacing: '1.5px' }}
                >
                    {t('logo_subtitle')}
                </text>
            </svg>
        </Link>
    );
}
