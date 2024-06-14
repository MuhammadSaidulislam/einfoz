import { API } from "../config";
import axios from 'axios';
import { get, put } from "./base-api";
// add profile
export const addService = async (body = {}) => {
  try {
    const response = await axios.post(`${API}/addService`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// postList list
export const serviceList = async () => {
  return get(`/serviceList`);
};

// profile active
export const serviceActive = async (id, body = {}) => {
  return put(`/serviceActive/${id}`, body);
};

export const userServiceList = async (id) => {
  return get(`/userServiceList/${id}`);
};

export const getService = async (id) => {
  return get(`/viewService/${id}`);
};