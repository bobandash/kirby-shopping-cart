import styles from './ErrorPage.module.css';
import Header1 from '../shared/Header';
import Footer from '../shared/Footer';
import { redirect } from 'react-router-dom';

function ErrorPage(){
  function navBackHome(){
    redirect("/");
  }

  return(
    <>
      <Header1 />
      <section className = {styles["error-page"]}>
        <div className = {styles.container}>
          <h1 className = {styles["error-message"]}>404 ERROR</h1>
          <button onClick = {navBackHome} className = {styles["back-home-redirect"]}>Back To Home <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ErrorPage;