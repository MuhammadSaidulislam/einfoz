import { API } from "../config";
import axios from 'axios';
import { get, put } from "./base-api";
// add profile
export const addProfile = async (body = {}) => {
  try {
    const response = await axios.post(`${API}/addProfile`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// profile list
export const profileList = async () => {
  return get(`/profileList`);
};

// profile active
export const profileActive = async (id,body={}) => {
  return put(`/profileActive/${id}`,body);
};
// all profile data
export const userProfileList = async (id) => {
  return get(`/userProfileList/${id}`);
};
// single profile
export const getProfile = async (id) => {
  return get(`/viewProfile/${id}`);
};
