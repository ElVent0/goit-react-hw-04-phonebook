import css from './Contacts.module.css';
import PropTypes from 'prop-types';

const Contacts = ({ filteredArray, onDelete }) => {
  return (
    <>
      <ul className={css.list}>
        {filteredArray().map(item => {
          return (
            <li className={css.item} key={item.id}>
              {item.name}: {item.phone}
              <button
                className={css.button}
                name={item.name}
                onClick={() => {
                  onDelete(item.id);
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
};

export default Contacts;

Contacts.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.array,
  onDelete: PropTypes.func,
};
