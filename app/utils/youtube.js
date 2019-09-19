import axios from 'axios';
const KEY = 'a8ff50b145b3742d52ef2fc9ce52264f';

export const baseParams = {
  api_key: KEY,
};

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});
