import express from 'express';
import Controller from './Controller';
import container from './container';

const router = express.Router();
const controller = container.resolve(Controller);

router.get('/', (req, res) => controller.statusCheck(req, res));
router.post('/token', (req, res) => controller.postToken(req, res));

export default router;