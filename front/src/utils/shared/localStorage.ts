/* eslint-disable @typescript-eslint/no-explicit-any */
export const setLocalStorage = (data: any): void => {
  localStorage.setItem("userDetail", JSON.stringify(data.token));
};

export const getLocalStorage = () => {
  const userDetails = localStorage.getItem("userDetail");
  if (userDetails) {
    return JSON.parse(userDetails);
  }
  return "";
};

export const cleanLocalStorage = (): void => {
  localStorage.removeItem("userDetail");
};
