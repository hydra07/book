import { MatchSearches } from '@/types/reader';
import { Drawer, IconButton, List, ListItem } from '@material-tailwind/react';
import {
  ChangeEventHandler,
  Fragment,
  KeyboardEventHandler,
  useContext,
  useState,
} from 'react';
import { readerContext } from './Reader';

export default function SearchDrawer() {
  const context = useContext(readerContext);
  if (!context) return null;
  const { rendition, searchBookContents, setCurretChapter } = context;
  const [searchText, setSearchText] = useState('');
  const [matchSearches, setMatches] = useState<MatchSearches>([]);

  const { isSearchDrawer, toggleSearchDrawer } = context;

  const onSearchBookContents = async () => {
    const matches = searchBookContents(searchText);
    // console.log(matches);
    setMatches(matches);
  };

  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    console.log(value);
    // console.log(matchSearches);
    setSearchText(value);
  };

  const onListItemClick = async (href: string, paragraph: string) => {
    await rendition.current?.display(href);

    const win = document.querySelector('iframe')?.contentWindow;
    if (win) {
      const body = win.document.documentElement.querySelector('body');
      if (body) {
        const regExp = new RegExp(
          `(<[\w\d]+>)?.*(${searchText}).*<\/?[\w\d]+>`,
          'ig',
        );
        body.innerHTML = body.innerHTML.replace(regExp, (match, sub1, sub2) => {
          return match.replace(sub2, `<mark>${sub2}</mark>`);
        });

        // const regExp = new RegExp(searchText, 'ig')
        // body.innerHTML = body.innerHTML.replace(paragraph, `<span class="highlight">${paragraph}</span>`)
        // body.innerHTML = body.innerHTML.replace(regExp, (match) => {
        //   return `<mark>${match}</mark>`
        // })
      }
    }

    setCurretChapter(href);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const key = e.key;
    if (key === 'Enter') {
      onSearchBookContents();
    }
  };

  return (
    <Fragment>
      <Drawer
        placement="right"
        open={isSearchDrawer}
        onClose={toggleSearchDrawer}
        placeholder={null}
        className=" bg-blue-gray-900 rounded-sm overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center justify-between pl-4 pb-2 w-full">
            <h1 className="text-white text-xl">Search</h1>
            <div className="">
              <IconButton placeholder={null} onClick={toggleSearchDrawer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
          <div>
            <button onClick={toggleSearchDrawer} className="text-white">
              {/* <CloseIcon /> */}
            </button>
          </div>
        </div>
        <div className="p-4">
          <input
            type="text"
            value={searchText}
            onChange={onSearchTextChange}
            onKeyPress={handleKeyPress}
            placeholder="Search"
            className="w-full p-2 bg-blue-gray-800 text-white"
          />
          <button
            onClick={onSearchBookContents}
            className="w-full p-2 mt-2 bg-blue-gray-800 text-white"
          >
            Search
          </button>
          <List placeholder={null}>
            {matchSearches.map((item, index) => (
              <ListItem
                className="text-white"
                key={index}
                onClick={() => onListItemClick(item!.href, item!.paragraph)}
                color="black"
                placeholder={null}
              >
                {item!.paragraph}
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
}
