import {User,Token} from 'prisma'

export{}

declare global{
    namespace Express{
        interface Request{
            User?:User,
            Token?:Token
        }
    }
}