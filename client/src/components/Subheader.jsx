import styles from "./Subheader.module.css";
import { Link } from "react-router-dom";

function SubHeader() {
  return (
    <nav className={styles.subheader}>
      <div className={styles.container}>
        <ul>
          <li>
            <Link to="/category/all">Shop All</Link>
          </li>
          <li>
            <Link to="/category/games">Games</Link>
          </li>
          <li>
            <Link to="/category/plushies">Plushies</Link>
          </li>
          <li>
            <Link to="/category/keychains">Keychains</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SubHeader;
