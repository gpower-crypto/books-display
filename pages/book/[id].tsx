// pages/book/[id].tsx
import { useRouter } from "next/router";

const BookPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { title, author, genre, description, isbn, publishedDate, publisher } =
    router.query;

  if (
    !id ||
    !title ||
    !author ||
    !genre ||
    !description ||
    !isbn ||
    !publishedDate ||
    !publisher
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>Author: {author}</p>
      <p>Genre: {genre}</p>
      <p>Description: {description}</p>
      <p>ISBN: {isbn}</p>
      <p>Published Date: {publishedDate}</p>
      <p>Publisher: {publisher}</p>
    </div>
  );
};

export default BookPage;
