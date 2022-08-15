import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import TableData from '../../components/TableData/TableData';
import { fetchUsers } from '../../redux/userSlice';

export default function HomeManagement() {
	const { listUser, oneuser } = useSelector(state => state.user);
	const [searchForm, setSearchForm] = useState('');
	const dispatch = useDispatch();

	const filteredUser = listUser.filter(x =>
		Object.values(x).some(value => {
			console.log(value);
			return value
				.toString()
				.toLowerCase()
				.includes(searchForm.toLowerCase());
		}),
	);

	const titleData = [
		{ name: 'id', field: 'User ID', sortable: 'none' },
		{ name: 'name', field: 'Name', sortable: 'none' },
		{ name: 'userName', field: 'User Name', sortable: 'none' },
		{ name: 'phone', field: 'Phone Number', sortable: 'none' },
		{ name: 'email', field: 'User Email', sortable: 'none' },
		{ name: 'type', field: 'Role', sortable: 'none' },
	];

	useEffect(() => {
		console.log('listUser');
		dispatch(fetchUsers());
	}, []);

	return (
		<Container style={{ paddingTop: '140px' }}>
			<Navbar setSearchForm={setSearchForm} searchForm={searchForm} />
			<h3>User Mangement</h3>
			<TableData
				listUser={searchForm ? filteredUser : listUser}
				titleData={titleData}
			/>
		</Container>
	);
}
