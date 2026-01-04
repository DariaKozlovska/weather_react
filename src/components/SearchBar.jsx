import './SearchBar.css';

const SearchBar = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Wpisz nazwę miasta (np. Berlin)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">Szukaj</button>
    </form>
  );
};

export default SearchBar;