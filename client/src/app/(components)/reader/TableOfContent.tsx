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
        className="bg-gray-900 overflow-y-auto fixed"
        placement="left"
        open={isToggle}
        onClose={onToggle}
        placeholder={null}
      >
        <div className="flex flex-col space-y-4 p-4 text-gray-300">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Table Of Content</h1>
            <IconButton
              className="hover:bg-gray-700 p-2 rounded-md"
              onClick={onToggle}
              placeholder={null}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div className="w-full">
            <span className="text-xl font-medium text-center block text-white">
              {book.title}
            </span>
            <div className="p-3">
              <img
                src={`${book.coverURL}`}
                alt="bookcover"
                className="rounded-md shadow-lg w-full"
              />
            </div>
          </div>
          <div className="w-full flex-col space-y-2">
            {bookToc.map((toc: Toc, index: number) => (
              <button
                className="w-full p-2 text-left hover:bg-gray-700 rounded-md text-gray-300"
                key={index}
                onClick={() => onClickItem(toc.href)}
              >
                <span className="text-md">{toc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};
