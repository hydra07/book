import { Drawer, IconButton, List, ListItem } from '@material-tailwind/react';
import { Fragment, useContext, useEffect } from 'react';
import { readerContext } from './Reader';

export default function BookmarkDrawer() {
  const context = useContext(readerContext);
  if (!context) return null;

  const { rendition, bookmarks } = context;
  const { isBookmarkDrawer, toggleBookmarkDrawer } = context;

  const goToBookmark = (cfi: string) => {
    rendition.current?.display(cfi);
  };
  useEffect(() => {
    console.log(bookmarks);
  }, [bookmarks]);
  return (
    <Fragment>
      <Drawer
        placement="right"
        open={isBookmarkDrawer}
        onClose={toggleBookmarkDrawer}
        placeholder={null}
        className=" bg-blue-gray-900 rounded-sm overflow-y-auto"
      >
        <div className="flex items-center justify-between pl-4 pb-2 w-full">
          <h1 className="text-white text-xl">BookMark</h1>
          <div className="">
            <IconButton placeholder={null} onClick={toggleBookmarkDrawer}>
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
          <List placeholder={null}>
            {bookmarks.map((bookmark) => (
              <ListItem
                className="text-white flex flex-col justify-between p-2"
                // key={index}
                onClick={() => goToBookmark(bookmark.cfi)}
                color="black"
                placeholder={null}
              >
                <div>{bookmark.name}</div>
                <div>{'Ngày tạo: ' + bookmark.time}</div>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
}
