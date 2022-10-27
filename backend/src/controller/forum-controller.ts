import { Topic, User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { forumService } from '../service/forum-service'
class ForumController {
  //Создаем темы для форума
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.userTokens
      const { name, description } = req.body
      const data = await forumService.createTopic(name, description, id)
      return res.status(200).json({ ...data, commentCount: 0 })
    } catch (error) {
      next(error)
    }
  }
  //Возвращаем темы форума
  async getTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await forumService.getTopics()
      const topics = data.map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        createDate: d.createDate,
        commentCount: d._count.comment,
      }))
      return res.status(200).json(topics)
    } catch (error) {
      next(error)
    }
  }
  //Возвращаем тему форума
  async getTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId } = req.params
      const topic = await forumService.getTopic(topicId)
      return res.status(200).json(topic)
    } catch (error) {
      next(error)
    }
  }
  //Добовляем новое сообщение к выбранной теме
  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.userTokens
      const { text } = req.body
      const { topicId } = req.params
      const data = await forumService.createMessage({ text, authorId: id, topicId })
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
