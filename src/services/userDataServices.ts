import axios from "axios";

interface chatResponse {
  botResponse: string;
}

export async function fetchUserData(): Promise<[]> {
  return await axios.get("https://jsonplaceholder.typicode.com/users");
}

export async function fetchChatData(question: string): Promise<chatResponse> {
  return await axios.post("https://fd79-45-37-234-182.ngrok-free.app/ask", {question: question});
}