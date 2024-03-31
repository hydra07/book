import { RootState } from '@/lib/store';
import { Page } from '@/types/ebook';
import { isNotNullOrUndefined } from '@/utils/common.utils';
import { useSelector } from 'react-redux';

/**
 * @name Footer
 * @description EbookViewer Footer
 * @param {string} title - current chapter name
 * @param {number} currentPage - current page number
 * @param {number} totalPage - total page number
 * @param {function} onPageMove - move to prev or next page
 * @param {number} height - footer height
 */
type FooterProps = {
  // title: string;
  // currentPage: number;
  // totalPage: number;
  onPageMove: (type: 'prev' | 'next') => void;
  height: number | null;
};

/**
 * @name Footer
 * @description EbookViewer Footer
 * @param title - current chapter name
 * @param currentPage - current page number
 * @param totalPage - total page number
 * @param onPageMove - move to prev or next page
 * @param height - footer height
 */
export default function Footer({ onPageMove, height }: FooterProps) {
  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );
  // useEffect(() => {
  //   console.log('currentLocation', currentLocation);
  // }, [currentLocation]);
  return (
    <div
      className="w-screen bg-gray-900 flex justify-between border-t border-gray-700 p-4 overflow-hidden"
      style={{ height: `${isNotNullOrUndefined(height) ? height : 40}px` }}
    >
      <div className="flex items-center justify-start">
        <button className="h-full" onClick={() => onPageMove('prev')}>
          <img className="w-8 h-8" src="/svg/left-white.svg" />
        </button>
      </div>
      <div className="flex w-2/3 items-center justify-center">
        <div className="text-center text-white">
          {currentLocation.chapterName && (
            <span className="text-xl">{currentLocation.chapterName}</span>
          )}
        </div>
      </div>
      <div className="flex w-1/5 items-center justify-center">
        {currentLocation.currentPage !== undefined &&
          currentLocation.totalPage !== undefined && (
            <div className="text-center text-white">
              <span className="text-md">
                {currentLocation.currentPage} / {currentLocation.totalPage}
              </span>
            </div>
          )}
      </div>
      <div className="flex items-center justify-end">
        <button className="h-full" onClick={() => onPageMove('next')}>
          <img className="w-8 h-8" src="/svg/right-white.svg" />
        </button>
      </div>
    </div>
  );
}
