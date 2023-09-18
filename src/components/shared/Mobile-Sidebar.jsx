import styles from './Mobile-Sidebar.module.css'
import { Link } from 'react-router-dom';

function MobileSideBar({isActive}){
  const asideClasses = isActive ? `${styles["mobile-sidebar"]} ${styles["active"]}` : `${styles["mobile-sidebar"]} ${styles["hidden"]}`
  const linkClasses = isActive ? `${styles["link"]} ${styles["active"]}` : `${styles["link"]} ${styles["hidden"]}`

  return (
    <aside className = {asideClasses}>
      <ul className = {styles["sidebar-links"]}>
          <li className = {linkClasses}><Link to = "/category/all">Shop All</Link></li>
          <li className = {linkClasses}><Link to = '/category/games'>Games</Link></li>
          <li className = {linkClasses}><Link to = '/category/plushies'>Plushies</Link></li>
          <li className = {linkClasses}><Link to = "/category/keychains">Keychains</Link></li>
      </ul>
    </aside>
  )
}

export default MobileSideBar;
