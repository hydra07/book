import { useState } from 'react';
const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const handleOpenSearch = () => {
    setShowSearch(true);
  };
  const handleCloseSearch = () => {
    setShowSearch(false);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(searchValue);
    console.log('submit');
  };
  return (
    <>
      {showSearch ? (
        <div role="dialog">
          <div
            className="fixed inset-0 top-16  "
            aria-hidden="true"
            onClick={handleCloseSearch}
          ></div>
          <form
            onSubmit={handleSubmit}
            className="flex"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              className="bg-transparent outline-none text-white border-b border-white w-80"
              type="text"
              required
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button className="ml-3" type="submit">
              <img src="/svg/search.svg" className="fill-white w-6 h-6" />
            </button>
          </form>
        </div>
      ) : (
        <button className="" onClick={handleOpenSearch}>
          <img src="/svg/search.svg" className="fill-white w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default Search;
