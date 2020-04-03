import axios from "axios";
import { apiURL } from "./constants";

const axiosBase = axios.create({
  baseURL: apiURL
});

export default axiosBase;
