import { PrismaClient } from '@prisma/client';
import  argon2  from "argon2"
import { UserDto } from '../dtos/user-dto';
import{ tokenService} from'./token-service'
import { ApiError } from '../exceptions/api-error';
const prisma = new PrismaClient()
class UserService {
async registration(username:string,password:string,email:string){
    const candidate = await prisma.user.findUnique({
        where:{
            username:username,
        }
    })
    if(candidate){
        throw  ApiError.BadRequest('User already exists')
    }
    const hashedPassword = await argon2.hash(password)
    const user  = await prisma.user.create({
        data:{
            username:username,
            password:hashedPassword,
            email:email
           
            
        }
    })
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id,tokens.refreshToken);

    return {...tokens,user:userDto}
}
async login(username:string,password:string){
const user = await prisma.user.findUnique({
    where:{
        username:username
    }
})

if(!user){
    throw ApiError.BadRequest('User not found')
}
const isPassEquals = await argon2.verify(user.password,password);
if(!isPassEquals){
    throw ApiError.BadRequest('Invalid password')
}
const userDto = new UserDto(user);

const tokens = await tokenService.generateTokens({...userDto})
await tokenService.saveToken(userDto.id,tokens.refreshToken);

    return {...tokens,user:userDto}
}
async logout(refreshToken:string){
    const token = await tokenService.removeToken(refreshToken)
    return token
}
async refresh(refreshToken:string){
if(!refreshToken){
    throw ApiError.UnauthorizedError()
}
const userData:any = tokenService.validateRefreshToken(refreshToken);
const tokenFromDb = await tokenService.findToken(refreshToken)
if(!userData || !tokenFromDb){
    throw ApiError.UnauthorizedError()
}
const user = await prisma.user.findUnique({
    where:{
        id:userData.id 
    }
})
if(!user){
    throw ApiError.BadRequest('Error update token')
}
const userDto = new UserDto(user);
const tokens = await tokenService.generateTokens({...userDto})
await tokenService.saveToken(userDto.id,tokens.refreshToken);
return {...tokens,user:userDto}
}

async getAllUsers(){
    const users = await prisma.user.findMany({})
    return users
}

}

export const userService =  new UserService()