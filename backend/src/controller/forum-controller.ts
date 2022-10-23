import { Topic } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { forumService } from '../service/forum-service'

class ForumController {
  //Создаем темы для форума
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, authorId } = req.body
      const data = await forumService.createTopic(name, description, authorId)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  //Возвращаем темы форума
  async getTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await forumService.getTopics()
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  //Добовляем новое сообщение к выбранной теме
  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message = { ...req.body, ...req.params }
      const data = await forumService.createMessage(message)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  // Возвращает сообщения, относящиеся к выбранной теме
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId } = req.params
      const data = await forumService.getMessages(topicId)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params
      const data = await forumService.deleteMessage(messageId)
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

export const forumController = new ForumController()
