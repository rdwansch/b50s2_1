import { Request, Response } from 'express';
import BookService from '../service/BookService';
import { createBookSchema } from '../util/validator/Book';

export default new (class BookController {
  async findAll(req: Request, res: Response) {
    try {
      const books = await BookService.findAll();
      return res.status(200).json({ message: 'Success', data: books });
    } catch (error: any) {
      console.log('Err BookController.findMany:', error.message);
      return res.status(500).send('Internal Server Error');
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return res.status(400).json({ message: 'id is required!' });
      }

      const book = await BookService.findById(id);
      return res.status(200).json({ message: 'Success', data: book });
    } catch (error: any) {
      console.log('Err BookController.findById:', error.message);
      return res.status(500).send('Internal Server Error');
    }
  }

  async createBook(req: Request, res: Response) {
    try {
      const { error, value } = createBookSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: 'Bad Request!', error });
      }

      const book = await BookService.createBook(value);
      return res.status(200).json({ message: 'Success', data: book });
    } catch (error: any) {
      console.log('Err BookController.createBook:', error.message);
      return res.status(500).send('Internal Server Error');
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { error, value } = createBookSchema.validate(req.body);
      if (error || !id) {
        return res.status(400).json({ message: 'Bad Request!', error, id });
      }

      const affectedRow = await BookService.updateBook(value, id);
      if (affectedRow[0] < 1) {
        return res.status(304).json({ message: 'Not Modified' });
      }

      return res.status(200).json({ message: 'Success', data: value });
    } catch (error: any) {
      console.log('Err BookController.createBook:', error.message);
      return res.status(500).send('Internal Server Error');
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const affectedRow = await BookService.deleteBook(id);

      if (affectedRow < 1) {
        return res.status(304).json({ message: 'Not Modified' });
      }

      return res.status(200).json({ message: 'Success' });
    } catch (error: any) {
      console.log('Err BookController.createBook:', error.message);
      return res.status(500).send('Internal Server Error');
    }
  }
})();
