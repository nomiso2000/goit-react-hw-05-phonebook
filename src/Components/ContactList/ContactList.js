import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./ContactList.module.css";

const ContactList = ({ items, onDelete }) => {
  return (
    items.length > 0 && (
      <TransitionGroup component="ul" className={styles.list} >
        {items.map(({ name, id, number }) => {
          return (
            <CSSTransition key={id}  classNames={styles} timeout={250}    > 
          <li  className={styles.item}>
            <span>
              {name} {number}
            </span>
            <button
              className={styles.button}
              type="button"
              onClick={() => onDelete(id)}
  
            >
              Delete
            </button>
          </li></CSSTransition>

          );
        })}
      </TransitionGroup>
    )
  );
};
ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ContactList;
