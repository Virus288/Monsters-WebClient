import { AxiosResponse } from "axios";
import clientApi from "../axios/axios";
import { EUserRace } from "../enums/races";

export const createGameProfile = async(race:EUserRace):Promise<AxiosResponse>=>{

const response = await clientApi.post("/profile",race)
return response;
}

export const sendMessage = async(message:string, reciver:string):Promise<AxiosResponse>=>{
const body = {message,reciver}
    const response = await clientApi.put("/message/send",body)
return response;
}

export const getMessages = async():Promise<AxiosResponse>=>{
const response = await clientApi.get("message?page=1")
return response;
}