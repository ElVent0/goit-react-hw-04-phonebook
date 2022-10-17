import css from './Contacts.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contacts extends Component {
  render() {
    return (
      <>
        <ul className={css.list}>
          {this.props.filteredArray().map(item => {
            return (
              <li className={css.item} key={item.id}>
                {item.name}: {item.phone}
                <button
                  className={css.button}
                  name={item.name}
                  onClick={() => {
                    this.props.onDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Contacts;

Contacts.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.array,
  onDelete: PropTypes.func,
};
