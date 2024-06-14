import { API } from "../config";
import axios from 'axios';
import { get, put } from "./base-api";

export const allHomeData = async () => {
    return get(`/homeData`);
  };