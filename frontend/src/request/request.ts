import axios from "axios"
import { User } from "../pages/Login/type";


const API_URL = 'http://localhost:4000';

export type Prop = {
    message: string,
    token: string
}

const getHeader = () => {
    return {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    };
}

export const doLogin = (data: User) => {
    return axios.post(`${API_URL}/user/login`, data);
}

export const getCase = () => {
    return axios.get(`${API_URL}/cases?number=1&isReviewed=false`, getHeader());
}

export const getConditions = () => {
    return axios.get(`${API_URL}/conditions`, getHeader());
}

export const updateCase = (caseId: string, conditionId: string, userId: string) => {
    const body = {
        conditionId,
        userId
    }
    return axios.patch(`${API_URL}/cases/${caseId}`, body, getHeader());
}
