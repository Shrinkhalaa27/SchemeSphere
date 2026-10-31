import axios from "axios";
const API = axios.create({ baseURL: "/api", timeout: 15000 });
export const fetchSchemes = (params = {}) => API.get("/schemes", { params }).then(r => r.data);
export const fetchSuggestions = (q) => API.get("/schemes/suggestions", { params: { q } }).then(r => r.data);
export const fetchTrending = () => API.get("/schemes/trending").then(r => r.data);
export const fetchStats = () => API.get("/stats").then(r => r.data);
export const sendFeedback = (data) => API.post("/feedback", data).then(r => r.data);
export const sendChatMessage = (messages) => API.post("/chat", { messages }).then(r => r.data);