import { Router } from 'express'
import { userController } from '../controller/user-controller'
import { body } from 'express-validator'
import authMiddleware from '../middleware/auth-middleware'
export const router = Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration,
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/user/:id', authMiddleware, userController.getUserOne)
