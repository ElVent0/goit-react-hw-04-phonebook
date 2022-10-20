import css from './Phonebook.module.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Phonebook = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeForm = e => {
    if (e.target.name === 'name') {
      setName(() => e.target.value);
    } else if (e.target.name === 'number') {
      setNumber(() => e.target.value);
    }
  };

  const onAddContactReset = e => {
    e.preventDefault();
    onAddContact(name, number);
    setName('');
    setNumber('');
    e.currentTarget.reset();
  };

  return (
    <>
      <form onSubmit={onAddContactReset} className={css.form}>
        <label>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChangeForm}
            value={name}
          />
        </label>
        <label>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChangeForm}
            value={number}
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </>
  );
};

export default Phonebook;

Phonebook.propTypes = {
  onAddContact: PropTypes.func,
};
