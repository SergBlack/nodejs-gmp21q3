import { Router } from 'express';

import { authPostSchema, authValidator } from '@api/middlewares/authValidator';
import { auth } from '@models/auth/auth.controller';

const router = Router();

router.route('/').post(authValidator.body(authPostSchema), auth);

export default router;
