import { API } from "../config";
import axios from 'axios';
import { get, put } from "./base-api";
// add post
export const addPost = async (body = {}) => {
  try {
    const response = await axios.post(`${API}/addPost`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// postList list
export const postList = async () => {
  return get(`/postList`);
};

// profile active
export const postActive = async (id, body = {}) => {
  return put(`/postActive/${id}`, body);
};

export const userPostList = async (id) => {
  return get(`/userPostList/${id}`);
};

export const getPost = async (id) => {
  return get(`/viewPost/${id}`);
};