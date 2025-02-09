import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../utils/ToastNotifications";

const BASE_URL = "http://localhost:8000/api/v1/user";

export const useApi = (endpoint, method = "GET", redirectUrl = null) => {
   const navigate = useNavigate();

   const [data, setData] = React.useState(null);
   const [loading, setLoading] = React.useState(false);
   const [error, setError] = React.useState(null);

   const execute = React.useCallback(async (body = null) => {
      setLoading(true);
      setError(null);
      try {
         const response = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data: body,
         });
         if (response.status === 200) {
            setData(response.data);
            if (response.data?.message) successToast(response.data.message);
            if (redirectUrl) navigate(redirectUrl, { replace: true });

            return response;
         }
      } catch (err) {
         const errorMessage = err.response?.data?.message || "An error occurred";
         errorToast(errorMessage);
         setError(errorMessage);

         return errorMessage;
      } finally { setLoading(false) }

   }, [endpoint, method, redirectUrl, navigate]);

   return { execute, data, loading, error };
};

