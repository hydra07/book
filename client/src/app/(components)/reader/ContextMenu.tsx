// type ContextMenuProps = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   isReverse: boolean;
// };

import React from 'react';

// export default function ContextMenu({
//   x,
//   y,
//   width,
//   height,
//   isReverse,
// }: ContextMenuProps) {
//   const positionStyle = {
//     left:
//       window.innerWidth < x + width
//         ? `${window.innerWidth - width}px`
//         : `${x}px`,
//     top:
//       window.innerHeight < y + 40 ? `${window.innerHeight - 40}px` : `${y}px`,
//   };

//   return (
//     <div
//       className="absolute box-border p-4 border rounded bg-black bg-opacity-80 shadow-regular z-50"
//       style={{ width: `${width}px`, height: `${height}px`, ...positionStyle }}
//     >
//       <div className="h-full overflow-y-auto scrollbar-none">
//         {/* Your content goes here */}
//       </div>

//       {width > 0 && (
//         <div
//           className={`absolute border-transparent ${
//             isReverse ? 'bottom-[-16px]' : 'top-[-16px]'
//           } left-[80px] transform -translate-x-8`}
//           style={{
//             borderWidth: '8px',
//             borderTopColor: isReverse ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.8)',
//             borderBottomColor: isReverse ? 'rgba(0,0,0,.8)' : 'rgba(0,0,0,0)',
//           }}
//         />
//       )}
//     </div>
//   );
// }
const Wrapper = React.forwardRef(
  ({ title, show, onClose, children }: any, ref) => {
    return (
      <div
        className={`${
          show ? 'translate-x-0 scale-100' : 'translate-x-420 scale-90'
        } fixed flex flex-col w-340 max-w-95vw h-screen top-0 right-0 shadow-box-bg border-r-4 border-blue-gray-800 bg-white rounded-l-4 transform transition-transform overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
        // ref={ref}
      >
        <div className="w-full min-h-64 flex items-center justify-between pt-4">
          <span className="pl-24 text-xl font-semibold">{title}</span>
          {/* <CloseBtn onClick={onClose} /> */}
        </div>
        {children}
      </div>
    );
  },
);

export default Wrapper;
