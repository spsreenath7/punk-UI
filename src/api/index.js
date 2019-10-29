import axios from 'axios';

export const getAll = async (url) => {
    const resp = await axios.get(url);
    return resp.data;
  };