import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableData from '../../compnents/TableData/TableData';
import { fetchUsers } from '../../redux/userSlice';

export default function HomeManagement() {
	const dispatch = useDispatch();

	const titleData = [
		{ name: 'id', field: 'User ID', sortable: 'none' },
		{ name: 'name', field: 'User Name', sortable: 'none' },
		{ name: 'phone', field: 'Phone Number', sortable: 'none' },
		{ name: 'email', field: 'User Email', sortable: 'none' },
		{ name: 'type', field: 'Role', sortable: 'none' },
	];

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	const { listUser } = useSelector(state => state.user);

	return (
		<Container>
			<h3>User Mangement</h3>
			<TableData listUser={listUser} titleData={titleData} />
		</Container>
	);
}
