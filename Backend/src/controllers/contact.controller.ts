import { NextFunction, Request, Response } from 'express';
import Contact from '../models/contact.model';
import { sendEmailToAdmin } from '../utils/emailService';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, message } = req.body;

  try {
    // Save message to database
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Send email to admin
    await sendEmailToAdmin(name, email, message);

    res.status(200).json({ message: 'Message saved and email sent!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving message or sending email' });
  }
};

// @desc    Fetch all contact messages
// @route   GET /api/messages
// @access  Private (Admin only)
export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const messages = await Contact.find({});
    console.log('🚀 ~ messages:', messages);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const updateStarredImportant = async (req: Request, res: Response) => {
  const { isStarred, isImportant } = req.body;
  try {
    const updatedEmail = await Contact.findByIdAndUpdate(
      req.params.id,
      { isStarred, isImportant },
      { new: true }
    );

    if (!updatedEmail) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.json(updatedEmail);
  } catch (error) {
    res.status(500).json({ error: 'Error updating email' });
  }
};
