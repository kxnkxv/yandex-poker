import { User } from "@prisma/client"

export class UserDto{
    email:string
    id:string

    constructor(model:User){
        this.email = model.email;
        this.id = model.id;
    }
}