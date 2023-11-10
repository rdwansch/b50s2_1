import { Request, Response } from 'express';
import Book from '../databases/models/book';

export default new (class BookService {
  async findAll(): Promise<Book[]> {
    const books = await Book.findAll();
    return books;
  }

  async findById(id: number): Promise<Book | null> {
    const book = await Book.findByPk(id);
    return book;
  }

  async createBook(book: Book): Promise<Book> {
    const newBook = await Book.create(book);
    return newBook;
  }

  async updateBook(book: Book, id: number): Promise<[affectedCount: number]> {
    const newBook = await Book.update(book, {
      where: {
        id,
      },
    });
    return newBook;
  }

  async deleteBook(id: number) {
    const affectedRow = await Book.destroy({
      where: {
        id,
      },
    });

    return affectedRow;
  }
})();
