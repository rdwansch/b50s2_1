import { Router } from 'express';
import BookController from '../controller/BookController';

const router = Router();

router.get('/books', BookController.findAll);
router.get('/books/:id', BookController.findById);
router.post('/books', BookController.createBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

export default router;
