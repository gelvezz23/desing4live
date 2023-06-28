import { getLocalStorage } from "../shared/localStorage";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchData = async (method: string, url: string, data: any) => {
  const baseUrl = `${import.meta.env.VITE_URL_API}:4000/api`;
  const options = {
    method: method,
    headers: {
      "x-access-token": getLocalStorage(),
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };
  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    return response.json();
  } catch (error) {
    return error;
  }
};
