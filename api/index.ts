import axios from "axios";
import { Domain } from "../types";

const api = axios.create({
  baseURL: "https://api.tartunlp.ai/translation/v2",
});

api.interceptors.response.use((response) => response.data);

type Payload = { text: string; tgt: string; domain?: Domain };

export const translate = (payload: Payload): Promise<{ result: string }> => {
  return api.post("", payload);
};
