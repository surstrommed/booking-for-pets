import { JsonModel, UserModel } from "./api-models";
import axios from "axios";
import { links } from "../../helpers/consts";

const uploadImage = (url: string) => async (file: File) => {
  const payload = new FormData();
  payload.append("image", file);
  const obj = await axios.post(url, payload).catch(() => {
    throw new Error("Failed to connect to the server, please try again later.");
  });
  return obj?.data?.data?.image?.url;
};

export const getImageLink = uploadImage(links.uploadImage);
