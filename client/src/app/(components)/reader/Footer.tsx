import { isNotNullOrUndefined } from '@/utils/common.utils';

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
  title: string;
  currentPage: number;
  totalPage: number;
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
export default function Footer({
  title,
  currentPage,
  totalPage,
  onPageMove,
  height,
}: FooterProps) {
  return (
    <div
      className={`w-screen  bg-blue-gray-800 flex justify-between border-t`}
      style={{ height: `${isNotNullOrUndefined(height) ? height : 40}px` }}
    >
      <div className="justify-start">
        <button className="h-full" onClick={() => onPageMove('prev')}>
          <img className="w-8 h-8" src="/svg/left-white.svg" />
        </button>
      </div>
      <div className="flex w-2/3">
        <div className="text-center text-white justify-center self-center">
          {title && <span className="text-xl">{title}</span>}
        </div>
      </div>
      <div className="flex w-1/5">
        {currentPage !== undefined && totalPage !== undefined && (
          <div className=" text-center text-white justify-center self-center">
            <span className="text-md">
              {currentPage} / {totalPage}6
            </span>
          </div>
        )}
      </div>
      <div className="justify-end">
        <button className="h-full" onClick={() => onPageMove('next')}>
          <img className="w-8 h-8" src="/svg/right-white.svg" />
        </button>
      </div>
    </div>
  );
}
