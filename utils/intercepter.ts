import axios from "axios";
import { api } from "./api";

export const setupAxiosInterceptors = (): void => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        error.response.data &&
        (error.response.data.message === "Token inválido ou expirado" ||
          error.response.data.message === "Token inválido ou sessão expirada")
      ) {
        console.log('sessão expirada')
        throw new Error('sessão expirada');
      }
      return Promise.reject(error); 
    }
  );
};
