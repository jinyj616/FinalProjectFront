import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});

export const login = async ({ userId, password }) => {
    const data = { userId, password };
    console.log(data)
    const response = await AuthApi.post(`/api/auth/login`, data);
    console.log(response.data);
    return response.data;
}

export const signUp = async ({ userId,email,password,nickName,name,birthDate }) => {
    const data = { userId,email,password,nickName,name,birthDate };
    console.log(data)
    const response = await AuthApi.post(`/api/auth/signup`, data);
    return response.data;
}