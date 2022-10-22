import { User } from '@prisma/client'

export class UserDto {
  email: string
  id: string
  login: string
  first_name: string
  second_name: string
  phone: string
  img_link: string | null

  constructor(model: User) {
    this.email = model.email
    this.id = model.id
    this.login = model.login
    this.first_name = model.first_name
    this.second_name = model.second_name
    this.phone = model.phone
    //this.img_link = model.img_link
  }
}
