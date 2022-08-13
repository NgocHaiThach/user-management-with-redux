import axios from 'axios';

const URL = 'https://62f4a6e3535c0c50e75f8938.mockapi.io/api/v1';

const publicRequest = axios.create({
	baseURL: URL,
});

const userRequest = axios.create({
	baseURL: URL,
	headers: ``,
});

export const getUser = () =>
	publicRequest.get('/users', {
		params: {
			sortBy: 'createdAt',
			order: 'desc',
		},
	});
export const deleteUser = id => publicRequest.delete(`/users/${id}`);
export const addUser = data => publicRequest.post(`/users`, data);
