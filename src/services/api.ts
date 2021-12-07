import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_TMDB_API_BASE
});

export default api;
