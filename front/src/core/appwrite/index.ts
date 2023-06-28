import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("649b31bdb91b3a3af8db");

export const storage = new Storage(client);
