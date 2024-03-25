type Author = {
  id: number;
  name: string;
};
type Type = {
  id: number;
  name: string;
};
enum Status {
  ONGOING,
  FINISHED,
}
type Book = {
  id: number;
  title: string;
  author: Author;
  description: string | null;
  types: Type[] | null;
  views: number | null;
  price: number | null;
  createdAt: Date;
  lastUpdateAt: Date;
  rating: number | null;
  reviews: number | null;
  imageUrl: string | null;
  url: string;
  status: Status;
  comment: null; // TODO: don't have idea!!!, add this later!
};

export default Book;
export { Status };
export type { Author, Type };
