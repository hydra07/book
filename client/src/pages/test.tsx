import '@/app/globals.css';
const data = [
  {
    id: 70,
    lft: 1,
    rgt: 10,
    parent_id: null,
    content: 'comment 1',
    book_id: 2,
    user_id: 4,
    created_at: '2024-04-04 15:43:37.496000',
  },
  {
    id: 71,
    lft: 11,
    rgt: 14,
    parent_id: null,
    content: 'comment 2',
    book_id: 2,
    user_id: 4,
    created_at: '2024-04-04 15:43:41.389000',
  },
  {
    id: 72,
    lft: 2,
    rgt: 9,
    parent_id: 70,
    content: 'rep comment 1',
    book_id: 2,
    user_id: 4,
    created_at: '2024-04-04 15:43:50.715000',
  },
  {
    id: 73,
    lft: 3,
    rgt: 6,
    parent_id: 72,
    content: 'rep comment 2',
    book_id: 2,
    user_id: 4,
    created_at: '2024-04-04 15:44:13.719000',
  },
  {
    id: 74,
    lft: 7,
    rgt: 8,
    parent_id: 72,
    content: 'rep comment 3',
    book_id: 2,
    user_id: 4,
    created_at: '2024-04-04 15:45:38.140000',
  },
  {
    id: 75,
    lft: 12,
    rgt: 13,
    parent_id: 71,
    content: 'rep comment 3',
    book_id: 2,
    user_id: 4,
    created_at: '2024-04-04 15:46:06.371000',
  },
  {
    id: 76,
    lft: 4,
    rgt: 5,
    parent_id: 73,
    content: 'rep comment 3',
    book_id: 2,
    user_id: 4,
    created_at: '2024-04-04 15:46:28.396000',
  },
];
export default () => {
  // Phân loại comment
  const rootComments = data.filter((comment) => comment.parent_id === null);
  const replies = data.filter((comment) => comment.parent_id !== null);
  const sortedReplies = replies.sort((a, b) => {
    // Sắp xếp theo rgt - lft tăng dần
    const diff = a.rgt - a.lft - (b.rgt - b.lft);
    if (diff !== 0) {
      return diff;
    }

    // Nếu rgt - lft bằng nhau, sắp xếp theo id giảm dần
    return b.id - a.id;
  });
  // Render comment
  return (
    <div>
      {rootComments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <div style={{ marginLeft: '20px' }}>
            {sortedReplies
              .filter(
                (reply) => reply.lft >= comment.lft && reply.rgt <= comment.rgt,
              )
              .map((reply) => (
                <p key={reply.rgt - reply.lft}>
                  {reply.content}: {reply.lft} -{reply.rgt}
                </p>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

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
