import axios from "axios";


export const createEvent = async (value) => 
 await axios.post(`${import.meta.env.VITE_REACT_APP_API}/event`, value);
