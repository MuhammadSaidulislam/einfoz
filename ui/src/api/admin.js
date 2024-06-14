import { API } from "../config";
import axios from 'axios';
// admin login
export const loginAdmin = async (body = {}) => {
    try {
        const response = await axios.post(`${API}/adminLogin`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const isAuthenticate = () => {
    if (typeof window == undefined) {
        return false;
    }
    if (localStorage.getItem("niomit")) {
        return JSON.parse(localStorage.getItem("niomit") || '{}');
    } else {
        return false;
    }
};
export const isAdminAuthenticate = () => {
    if (typeof window == undefined) {
        return false;
    }
    if (localStorage.getItem("niomadmin")) {
        return JSON.parse(localStorage.getItem("niomadmin") || '{}');
    } else {
        return false;
    }
};
// logout
export const logout = async () => {
    localStorage.removeItem("niomit");
};

// category add
export const addCategory = async (body = {}) => {
    try {
        const response = await axios.post(`${API}/addCategory`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// sub-category add
export const addSubCategory = async (body = {}) => {
    try {
        const response = await axios.post(`${API}/addSubCategory`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
// category list
export const getCategoryList = async () => {
    try {
        const response = await axios.get(`${API}/getCategory`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// sub-category list
export const getSubCategoryList = async () => {
    try {
        const response = await axios.get(`${API}/getSubCategory`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};