// pages/books.tsx
import { GetServerSideProps } from "next";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
  published: string;
  publisher: string;
}

interface BooksProps {
  books: Book[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Pad single digit day and month with leading zero
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

const BooksPage: React.FC<BooksProps> = ({ books }) => {
  return (
    <div>
      <h1>List of Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/book/${book.id}?title=${encodeURIComponent(
                book.title
              )}&author=${encodeURIComponent(
                book.author
              )}&genre=${encodeURIComponent(
                book.genre
              )}&description=${encodeURIComponent(
                book.description
              )}&isbn=${encodeURIComponent(
                book.isbn
              )}&published=${encodeURIComponent(
                formatDate(book.published)
              )}&publisher=${encodeURIComponent(book.publisher)}`}
            >
              <a>
                <h2>{book.title}</h2>
              </a>
            </Link>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Published Date: {formatDate(book.published)}</p>
            <p>Publisher: {book.publisher}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BooksProps> = async () => {
  const res = await fetch("https://fakerapi.it/api/v1/books");
  const data = await res.json();

  // Check if the response contains a 'data' property with an array of books
  if (!data || !data.data || !Array.isArray(data.data)) {
    return {
      notFound: true, // Return a 404 page
    };
  }

  const books: Book[] = data.data;

  return {
    props: {
      books,
    },
  };
};

export default BooksPage;
