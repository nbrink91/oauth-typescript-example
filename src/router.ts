import express from 'express';
import Controller from './Controller';
import container from './container';

const router = express.Router();
const controller = container.resolve(Controller);

router.get('/', controller.statusCheck);
router.post('/token', controller.postToken);

export default router;