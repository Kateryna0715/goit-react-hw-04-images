import CSS from './index.module.css';
const Searchbar = ({ submit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.query.value) {
      submit(e.target.query.value);
    }
    e.target.reset();
  };
  return (
    <header>
      <form onSubmit={handleSubmit} className={CSS.searchbar}>
        <label htmlFor="searchInput"></label>
        <input
          name="query"
          type="text"
          id="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Searchbar;
