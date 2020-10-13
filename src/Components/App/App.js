import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import ContactList from "../ContactList/ContactList";
import ContactForm from "../ContactForm/ContactForm";
import Header from "./header";
import Filter from "../Filter/Filter";
import Notification from '../Notification/Notification'
import stylesNotification from '../Notification/Notification.module.css'

import styles from "./App.module.css";

class App extends Component {
  state = {
    contacts: [],

    filter: "",
    isVisible: false,
  };
  componentDidMount() {
    const persistedTasks = localStorage.getItem("contacts");
    if (persistedTasks) {
      this.setState({
        contacts: JSON.parse(persistedTasks),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  setFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  addItem = (item) => {
    if (
      this.state.contacts.every(
        (contact) =>
          contact.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase()
      )
    ) {
      const itemToAdd = { ...item, id: uuidv4() };
      this.setState((state) => ({
        contacts: [...state.contacts, itemToAdd],
      }));
    } else {
      this.setState({isVisible: true})
    }
  };

  deleteItem = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const filtratedContacts = this.filterContacts();
    return (
      <div className={styles.container}>
        <CSSTransition
          in={true}
          classNames={styles}
          timeout={500}
          appear={true}
        >
          <Header />
        </CSSTransition>
        <CSSTransition in={this.state.isVisible} 
        timeout={1000} 
        classNames={stylesNotification}
        unmountOnExit   
        onEntered={() => this.setState({ isVisible: false })}>
          <Notification/>
        </CSSTransition>


        <ContactForm onAddItem={this.addItem} />
        {this.state.contacts.length > 1 &&      
        <> 
          <h2>Contacts</h2>
        <Filter onSetFilter={this.setFilter} /> 
        </>
        }

        <ContactList items={filtratedContacts} onDelete={this.deleteItem} />
      </div>
    );
  }
}

export default App;
