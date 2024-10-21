import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controller';

const router: Router = Router();

// // POST route to submit the contact form
// router.post('/contact', submitContactForm);

// // GET route to fetch all messages (admin route)
// router.get('/messages', getAllMessages);

export default router;
