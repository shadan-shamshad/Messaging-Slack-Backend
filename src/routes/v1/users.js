import express from 'express';

import { signUp } from '../../controllers/userController.js';
import { validate } from '../../validation/zodValidator.js';
import { userSignupSchema } from '../../validation/userSchema.js';
const router = express.Router();

// router.get('/', (req, res)=>{
//     return res.status(200).json({
//         message: 'GET /users'
//     });
// } );

router.post('/signup',validate(userSignupSchema), signUp);

export default router;