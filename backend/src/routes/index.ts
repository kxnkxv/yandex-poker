import { Router } from 'express'
import { userController } from '../controller/user-controller'
import { body } from 'express-validator'
import authMiddleware from '../middleware/auth-middleware'
import { forumController } from '../controller/forum-controller'
export const router = Router()

router.post(
  '/registration',
  body('email').trim().isEmail().normalizeEmail(),
  body('password')
    .trim()
    .custom((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/i.test(value))
    .withMessage(
      'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number',
    ),
  body('first_name').trim().isString(),
  body('second_name').trim().isString(),
  body('login').trim().isString(),
  body('phone').trim().notEmpty().withMessage('Phone number cannot be empty'),
  userController.registration,
)
router.post(
  '/login',
  body('login')
    .trim()
    .custom((value) => !/\s/.test(value))
    .isLength({ min: 3, max: 32 }),
  body('password')
    .trim()
    .isLength({ min: 8, max: 40 })
    .custom((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/i.test(value))
    .withMessage(
      'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number',
    ),
  userController.login,
)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.put('/user/profile', authMiddleware, userController.editUser)
router.get('/user', authMiddleware, userController.getUserOne)
router.get('/users', authMiddleware, userController.getUserAll)
router.post(
  '/topic',
  body('name').trim(),
  body('description').trim(),
  authMiddleware,
  forumController.createTopic,
)
router.get('/topics', authMiddleware, forumController.getTopics)
router.get('/topic/:topicId', authMiddleware, forumController.getTopic)
router.post('/topic/:topicId/message', body('text'), authMiddleware, forumController.createMessage)
router.get('/topic/:topicId/messages', authMiddleware, forumController.getMessages)
router.delete('/message/:messageId', authMiddleware, forumController.deleteMessage)
