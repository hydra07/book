import { RootState } from '@/lib/store';
import { Toc } from '@/types/ebook';
import { Drawer, IconButton } from '@material-tailwind/react';
import { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  isToggle: boolean;
  onToggle: () => void;
  onLocation: (loc: string) => void;
};
export default ({ isToggle, onToggle, onLocation }: Props, ref: any) => {
  const book = useSelector((state: RootState) => state.ebook.book);
  const bookToc = useSelector((state: RootState) => state.ebook.toc);

  const onClickItem = useCallback(
    (loc: string) => {
      onLocation(loc);
      onToggle();
    },
    [onLocation, onToggle],
  );
  return (
    <Fragment>
      <Drawer
        className="bg-white overflow-y-auto fixed"
        placement="left"
        open={isToggle}
        onClose={onToggle}
        placeholder={null}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between pt-3 px-3">
            <h1 className="text-black text-xl">Table Of Content</h1>
            <IconButton
              className="pr-5 hover:bg-blue-gray-300"
              onClick={onToggle}
              placeholder={null}
            >
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
          <div className="w-full p-3 ">
            <span className="text-black font-medium text-xl text-center">
              {book.title}
            </span>
            <div className="p-3">
              <img
                src={`${book.coverURL}`}
                alt="bookcover"
                className="rounded-md shadow"
              />
            </div>
          </div>
          <div className="w-full pt-3 px-4 flex-col space-y-2">
            {bookToc.map((toc: Toc, index: number) => (
              <button
                className="w-full p-2 text-left hover:ml-3 hover:rounded-sm hover:border hover:shadow-md"
                key={index}
                onClick={() => onClickItem(toc.href)}
              >
                <span className="text-black text-md">{toc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};
