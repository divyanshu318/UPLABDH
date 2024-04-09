import express from 'express'
import { getRoomController } from '../controllers/getRoomController.js';

const router = express.Router();

router.get('/getRooms',getRoomController);

export default router;