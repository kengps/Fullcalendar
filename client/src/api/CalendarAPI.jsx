import axios from "axios";


export const createEvent = async (value) => 
 await axios.post(`${import.meta.env.VITE_REACT_APP_API}/event`, value);


 
export const listEvent = async () =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/list-event`);


  
export const handleCurrentMonth = async (value) =>
  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/current-month`, value);


export const handleFileUpdateImg = async (value) =>
  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/update-image`, value);

