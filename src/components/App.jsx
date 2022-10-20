import React, { useState } from 'react';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      try {
        setContacts(() => JSON.parse(localStorage.getItem('contacts')));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  // useEffect(
  //   prevState => {
  //     if (contacts !== prevState) {
  //       localStorage.setItem('contacts', JSON.stringify(contacts));
  //     }
  //   },
  //   [contacts]
  // );

  const onAddContact = (name, phone) => {
    const id = nanoid();
    const newContact = {
      name,
      id,
      phone,
    };
    if (
      contacts.some(item => {
        return item.name.toLowerCase() === name.toLowerCase();
      })
    ) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const onDelete = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
    console.log(contacts);
  };

  const onFilteredArray = () => {
    let filteredArray = [];
    if (filter === '') {
      console.log(contacts);
      filteredArray = [...contacts];
    } else if (filter !== '') {
      return contacts.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return filteredArray;
  };

  return (
    <>
      <h2 className={css.header}>Phonebook</h2>
      <Phonebook onAddContact={onAddContact} />
      <h2 className={css.header}>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange}></Filter>
      <Contacts filteredArray={onFilteredArray} onDelete={onDelete} />
    </>
  );
};
