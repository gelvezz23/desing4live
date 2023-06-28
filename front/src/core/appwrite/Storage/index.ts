import { storage } from "./../index";
import { ID } from "appwrite";

export const createImage = async (file: any) => {
  try {
    const upload = await storage.createFile(
      "6472ba73b2685d1a2a36",
      ID.unique(),
      file
    );
    return upload;
  } catch (error) {
    console.log(error);
  }
};

export const getOneImage = async (id: any) => {
  try {
    const response = await storage.getFilePreview("649c090c748c53f52cb2", id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (id: any) => {
  try {
    const response = await storage.deleteFile("6472ba73b2685d1a2a36", id);
    return response;
  } catch (error) {
    console.log(error);
  }
};
