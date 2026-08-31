import styles from './AffiliateDisclosure.module.css';

/**
 * Mention d'affiliation — obligation légale en France, dans l'UE et aux
 * États-Unis (FTC). Elle doit être VISIBLE AVANT les liens concernés,
 * pas reléguée en pied de page.
 *
 * Et sur chaque lien affilié, sans exception :
 *   <a href={url} rel="sponsored nofollow noopener" target="_blank">…</a>
 * Sans rel="sponsored", Google peut considérer que le site vend des liens.
 */
export default function AffiliateDisclosure() {
    return (
        <p className={styles.disclosure}>
            Cette page contient des liens affiliés. Si tu achètes via ces liens, Game Wave
            peut percevoir une commission, sans surcoût pour toi. Cela n&apos;influence pas
            notre sélection.
        </p>
    );
}
