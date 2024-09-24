import styles from "./Footer.module.css"
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <div className={styles.footer}>
            <p className={styles.footerYear}>2024</p>
            <Link to="https://github.com/alima987"><p className={styles.footerGithub}>alima987</p></Link>
        </div>
    )
}
export default Footer