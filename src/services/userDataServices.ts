import axios from "axios";

interface chatResponse {
  botResponse: string;
}

export async function fetchUserData(): Promise<[]> {
  return await axios.get("https://jsonplaceholder.typicode.com/users");
}

export async function fetchChatData(question: string): Promise<chatResponse> {
  return await axios.post("http://127.0.0.1:5000/ask", {question: question});
}