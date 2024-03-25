import Loading from '@/app/(components)/Loading';
import '@/app/globals.css';
import ReactViewer from '@/lib/modules/ReactViewer/ReactViewer';
import { ViewerRef } from '@/types/ebook';
import { useRef } from 'react';



// export default () => {
//   const viewerRef = useRef<ViewerRef>(null);
//   const demoUrl: string = 'Kiếm Lai - Phong Hoả Hí Chư Hầu.epub';
//   // const theme: string = getTheme();
//   return (
//     <div>
//       <ReactViewer
//         url={demoUrl}
//         viewerStyleURL={theme}
//         ref={viewerRef}
//         loadingView={<Loading />}
//       />
//     </div>
//   );
// };
