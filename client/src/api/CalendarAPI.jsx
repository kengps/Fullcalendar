import axios from "axios";


export const createEvent = async (value) => 
 await axios.post(`${import.meta.env.VITE_REACT_APP_API}/event`, value);


 
export const listEvent = async () =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/list-event`);
