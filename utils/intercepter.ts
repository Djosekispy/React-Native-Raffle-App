import axios from "axios";
import { api } from "./api";
import { authService } from "@/model/service/auth";
/*
export const setupAxiosInterceptors = (): void => {
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (
        error.response &&
        error.response.data &&
        (error.response.data.message === "Token inválido ou expirado" ||
          error.response.data.message === "Token inválido ou sessão expirada")
      ) {
        console.log('sessão expirada')
       /// await authService.logout();
        //throw new Error('sessão expirada');
      }
      return Promise.reject(error); 
    }
  );
};
*/