import { API } from "../config";
import axios from 'axios';
// signup
export const registerUser = async (body = {}) => {
  try {
    const response = await axios.post(`${API}/registration`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// login
export const loginUser = async (mobile, password) => {
  try {
    const response = await axios.post(`${API}/userLogin`, {
      mobile: mobile,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// mobile otp
export const mobileOtp = async (mobile, otp) => {
  const url = "https://api.sms.net.bd/sendsms";

  const data = new FormData();
  data.append("api_key", "QRa72z0YlJt58U7gxw7WgAXNdyYw0PpeCTrsnT0l");
  data.append("msg", `Your verification code is ${otp} "Area phonebook"`);
  data.append("to", mobile);

  axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
// number check
export const numberCheck = async (mobile) => {
  try {
    const response = await axios.post(`${API}/mobileNumberCheck`, {
      mobileNumber: mobile,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// user password update
export const passwordUpdate = async (mobile,newPassword) => {
  try {
    const response = await axios.put(`${API}/userPassword/${mobile}`, {
      newPassword: newPassword
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
