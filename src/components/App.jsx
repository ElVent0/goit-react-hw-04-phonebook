import React, { Component } from 'react';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      try {
        this.setState(() => ({
          contacts: JSON.parse(localStorage.getItem('contacts')),
        }));
      } catch (e) {
        console.log(e);
      }
      console.log(JSON.parse(localStorage.getItem('contacts')));
    } else {
      localStorage.setItem('contacts', []);
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = (name, phone) => e => {
    const id = nanoid();
    const newContact = {
      name,
      id,
      phone,
    };
    console.log(this.state);
    if (
      this.state.contacts.some(item => {
        return item.name.toLowerCase() === name.toLowerCase();
      })
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleChange = e => {
    this.setState(() => ({
      filter: e.target.value,
    }));
  };

  onDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  onFilteredArray = () => {
    let filteredArray = [];
    console.log(this.state.contacts);
    if (this.state.filter === '') {
      filteredArray = [...this.state.contacts];
      console.log(filteredArray);
    } else if (this.state.filter !== '') {
      this.state.contacts.map(item => {
        if (item.name.toLowerCase().includes(this.state.filter.toLowerCase())) {
          filteredArray.push(item);
        }
        return item;
      });
    }
    return filteredArray;
  };

  render() {
    return (
      <>
        <h2 className={css.header}>Phonebook</h2>
        <Phonebook onAddContact={this.onAddContact} />
        <h2 className={css.header}>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handleChange={this.handleChange}
        ></Filter>
        <Contacts
          filteredArray={this.onFilteredArray}
          onDelete={this.onDelete}
        />
      </>
    );
  }
}
