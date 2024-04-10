import { useState } from 'react';

const SearchList = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(searchValue);
    console.log('submit');
  };

  const searchForm = (
    <div role="dialog" className="" aria-hidden="false" onClick={toggleSearch}>
      <form onSubmit={handleSubmit} className="flex" onClick={(event) => event.stopPropagation()}>
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
  );

  return (
    <>
      {showSearch ? searchForm : (
        <button className="" onClick={toggleSearch}>
          <img src="/svg/search.svg" className="fill-white w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default SearchList;
