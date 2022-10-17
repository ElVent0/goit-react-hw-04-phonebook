import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ filter, handleChange }) => {
  return (
    <>
      <p className={css.paragraph}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
      />
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func,
};
