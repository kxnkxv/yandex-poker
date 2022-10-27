export type TTopic = {
  authorId?: string
  commentCount: number
  author: { login: string; img_link: number }
  createDate: string
  description: string | null
  id: string
  name: string
}
