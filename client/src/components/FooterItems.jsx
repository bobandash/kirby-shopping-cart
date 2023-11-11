import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function FooterItems({
  dropdownNumber,
  activeDropdownNumber,
  footerName,
  footerNavItemsArray,
  handleClick
}) {
  //footerNavItemsObject contains object of nav item names as keys and router url as values

  if (activeDropdownNumber === dropdownNumber) {
    return (
      <div onClick={() => handleClick(dropdownNumber)} className={styles["col"]}>
        <h3>
          {footerName}
          <i className="fa-solid fa-caret-right"></i>
        </h3>
        {footerNavItemsArray.length > 0 && (
          <ul>
            {footerNavItemsArray.map((value) => (
              <li key={value.id}>
                <Link to={value.url}>{value.name}</Link>
              </li>
            ))}
          </ul>
        )}
        {footerName === "Site Info" && (
          <div className={styles["social-media-links"]}>
            <a href="" target="_blank">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="" target="_blank">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => handleClick(dropdownNumber)}
      className={`${styles["col"]} ${styles["mobile-collapsed"]} `}
    >
      <h3>
        {footerName}
        <i className="fa-solid fa-caret-down"></i>
      </h3>
      {footerNavItemsArray.length > 0 && (
        <ul>
          {footerNavItemsArray.map((value) => (
            <li key={value.id}>
              <Link to={value.url}>{value.name}</Link>
            </li>
          ))}
        </ul>
      )}
      {footerName === "Site Info" && (
        <div className={styles["social-media-links"]}>
          <a href="" target="_blank">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="" target="_blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="" target="_blank">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      )}
    </div>
  );
}

FooterItems.propTypes = {
  dropdownNumber: PropTypes.number,
  activeDropdownNumber: PropTypes.number,
  footerName: PropTypes.string,
  footerNavItemsArray: PropTypes.array,
  handleClick: PropTypes.func
};

export default FooterItems;
