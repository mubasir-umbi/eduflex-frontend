import axios from "axios";
import { TUTOR_URL } from "../constants/tutorConstants";
import { ADMIN_URL } from "../constants/adminConstans";
import { CHAT_URL, USERS_URL } from "../constants/usersConstants";


axios.defaults.withCredentials = true

export const tutorApi = axios.create({
    baseURL: TUTOR_URL,
})

export const adminApi = axios.create({
    baseURL: ADMIN_URL,
})

export const userApi = axios.create({
    baseURL: USERS_URL,
})

export const chatApi = axios.create({
    baseURL: CHAT_URL,
})