import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative w-full
        bg-white/80 backdrop-blur-md
        border border-white/20
        rounded-full
        shadow-lg
        focus-within:ring-2 focus-within:ring-blue-400/60
        transition
      "
    >

      <input
        type="text"
        placeholder="Wpisz nazwę miasta (np. Berlin)"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="
          w-full
          bg-transparent
          text-indigo-950 placeholder-indigo-950/60
          pl-4 pr-28 py-4
          rounded-full
          focus:outline-none
        "
      />

      <button
        type="submit"
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          px-5 py-2.5
          rounded-full
          bg-linear-to-r from-blue-500 to-indigo-600
          text-white font-medium
          hover:from-blue-600 hover:to-indigo-700
          transition-all duration-300
          shadow-md
        "
      >
        Szukaj
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;