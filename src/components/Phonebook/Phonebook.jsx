import css from './Phonebook.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeForm = e => {
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
    console.log(this.state);
  };

  onAddContactReset = callback => e => {
    e.preventDefault();
    callback();
    this.setState(() => ({
      name: '',
      number: '',
    }));
    e.currentTarget.reset();
  };

  render() {
    return (
      <>
        <form
          onSubmit={this.onAddContactReset(
            this.props.onAddContact(this.state.name, this.state.number)
          )}
          className={css.form}
        >
          <label>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChangeForm}
              value={this.state.name}
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
              onChange={this.handleChangeForm}
              value={this.state.number}
            />
          </label>
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default Phonebook;

Phonebook.propTypes = {
  onAddContact: PropTypes.func,
};
