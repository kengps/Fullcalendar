import axios from "axios";


export const createEvent = async (value) => 
 await axios.post(`${import.meta.env.VITE_REACT_APP_API}/event`, value);


 
export const listEvent = async () =>
  await axios.get(`${import.meta.env.VITE_REACT_APP_API}/list-event`);


  
export const handleCurrentMonth = async (value) =>
  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/current-month`, value);


export const handleFileUpdateImg = async (value) =>
  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/upload-image`, value);


  export const UpdateEventChange = async (value) =>
    await axios.put(
      `${import.meta.env.VITE_REACT_APP_API}/update-event`,
      value
    );

  export const removeEvent = async (value) =>
    await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API}/delete-event/${value}`
    );

