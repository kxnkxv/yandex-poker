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
        _count: {
          select: {
            comment: true,
          },
        },
      },
    })
    return topics
  }
  async getTopic(topicId: string) {
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
    })
    return topic
  }
  async createMessage({
    text,
    authorId,
    topicId,
  }: {
    text: string
    authorId: string
    topicId: string
  }) {
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
