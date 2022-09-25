import { NextFunction, Request, Response } from 'express';
import { userService } from '../service/user-service';
import {validationResult} from'express-validator';
import { ApiError } from '../exceptions/api-error';

class UserController {
// Todo: добавить типы не забыть
async registration(req:Request,res:Response,next:NextFunction):Promise<any>{
try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        next(ApiError.BadRequest('Validation error',errors.array()))
    }
    const {email,password,username} = req.body;
    const userData = await userService.registration(username,password,email)
    res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
    return res.json(userData)
} catch (error) {
    next(error)
}
}
async login(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
    const {username,password}= req.body;
    const userData = await userService.login(username,password);
    res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
    return res.json(userData)
    } catch (error) {
        next(error)
    } 
}
async logout(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
    const {refreshToken} = req.cookies;
    const token = await userService.logout(refreshToken)
    res.clearCookie('refreshToken')
    // Todo: вернуть статус 200
    return res.json(token)
    } catch (error) {
        next(error)
    }
}
async refresh(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
    const {refreshToken} =req.cookies;
    const userData = await userService.refresh(refreshToken);
    res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
    return res.json(userData)
    } catch (error) {
        next(error)
    }
}
async getUsers(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
        const users = await userService.getAllUsers()
   return res.json(users)
    } catch (error) {
        next(error)
    }
}
}
export const userController =  new UserController();