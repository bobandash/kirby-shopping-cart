import styles from './Subheader.module.css'
import { Link } from 'react-router-dom';

function SubHeader(){
  
  return (
    <nav className = {styles.subheader}>
      <div className = {styles.container}>
        <ul>
          <li><Link to = "/">Shop All</Link></li>
          <li><Link to = "/">Games</Link></li>
          <li><Link to = "/">Plushies</Link></li>
          <li><Link to = "/">Keychains</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default SubHeader;