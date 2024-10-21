import express from 'express';
import {
  getAllPublicTemplates,
  getCourseTemplateById,
  getProductById
} from '../controllers/public.controller';
import { submitContactForm } from '../controllers/contact.controller';

const publicRouter = express.Router();

publicRouter.get('/courseTemplates', getAllPublicTemplates);
publicRouter.get('/courseTemplates/:tid', getCourseTemplateById);

publicRouter.get('/products/:pid', getProductById);

// POST route to submit the contact form
publicRouter.post('/contact', submitContactForm);

export default publicRouter;
