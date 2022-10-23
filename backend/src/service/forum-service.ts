import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
class ForumService {
  async createTopic(name: string, description: string, authorId: string) {
    const topic = await prisma.topic.create({
      data: {
        authorId,
        name,
        description,
        createDate: new Date(),
      },
    })
    return topic
  }
  async getTopics() {
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createDate: true,
      },
    })
    const count = topics.length
    return { ...topics, countTopics: count }
  }
  async createMessage(message: any) {
    const { text, authorId, topicId } = message
    const createdMessage = await prisma.comment.create({
      data: {
        text,
        authorId,
        topicId,
        date: new Date(),
      },
    })
    return createdMessage
  }
  async getMessages(topicId: string) {
    const messages = await prisma.comment.findMany({
      where: {
        topicId,
      },
      include: {
        author: { select: { login: true, img_link: true } },
      },
    })
    return messages
  }
  async deleteMessage(messageId: string) {
    const deletedMessage = await prisma.comment.delete({
      where: {
        id: messageId,
      },
    })
    return deletedMessage
  }
}
export const forumService = new ForumService()
