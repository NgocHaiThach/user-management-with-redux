import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalComponent from '../../components/ModalComponent';
import Navbar from '../../components/Navbar/Navbar';
import TableData from '../../components/TableData/TableData';
import { deleteMultipleUserThunk, fetchOneUser, fetchUsers, fetchUsersPagination } from '../../redux/userSlice';

export default function HomeManagement() {
	const { listUser, oneuser, count } = useSelector(state => state.user);
	const [searchForm, setSearchForm] = useState('');
	const dispatch = useDispatch();

	const filteredUser = listUser.filter(item => Object.values(item).some(value => String(value).toLowerCase().includes(searchForm.toLowerCase())));

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [idSelected, setIdSelected] = useState(null);

	const [fieldSelected, setFieldSelected] = useState([]);
	const [isSelect, setIsSelect] = useState(false);
	const [activeDelete, setActiveDelete] = useState(false);

	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);

	function actionFormatter(cell, row) {
		return (
			<>
				<Button
					variant='success'
					style={{ marginRight: '4px' }}>
					<Link
						to={`/edit/${row.id}`}
						style={{
							marginRight: '4px',
							textDecoration: 'none',
							color: 'white',
						}}>
						Cập nhật
					</Link>
				</Button>
				<Button
					onClick={() => {
						setIdSelected(row.id);
						handleShow();
						console.log("Xoa")
					}}
					variant='danger'
					style={{ marginLeft: '4px' }}>
					Xóa
				</Button>
			</>
		);
	}
	function typeFormatter(cell, row) {
		return (
			<>
				<span>{row.type ? "Admin" : "User"}</span>
			</>
		);
	}


	const columns = [
		{
			dataField: "id",
			text: "User ID",
			sort: true
		},
		{
			dataField: "name",
			text: "Name",
			sort: true
		},
		{
			dataField: "userName",
			text: "User Name",
			sort: true
		},
		{
			dataField: "email",
			text: "Email",
			sort: true
		},
		{
			dataField: "phone",
			text: "Phone Number",
			sort: true
		},
		{
			dataField: "type",
			text: "Role",
			formatter: typeFormatter
		},
		{
			dataField: 'actions',
			text: 'Actions',
			formatter: actionFormatter
		}
	];



	const options = {
		onSizePerPageChange: (sizePerPage, page) => {
			console.log(sizePerPage, page)
			setPage(page);
			setLimit(sizePerPage);
			dispatch(fetchUsersPagination({ limit: sizePerPage, page }));
			console.log("change", sizePerPage)
		},
		onPageChange: (page, sizePerPage) => {
			setPage(page);
			// setLimit(sizePerPage);
			dispatch(fetchUsersPagination({ limit: sizePerPage, page }));
		},
		sizePerPage: limit,
		totalSize: count,
	};


	useEffect(() => {
		dispatch(fetchUsersPagination({ limit, page }));
	}, []);

	useEffect(() => {
		console.log('Count render')
		if (activeDelete) {
			if (fieldSelected.length === limit)
				dispatch(fetchUsersPagination({ limit, page: page + 1 }));
		}
		return () => {
			setActiveDelete(false);
		}
	}, [activeDelete]);

	return (
		<Container style={{ paddingTop: '140px' }}>
			<Navbar setSearchForm={setSearchForm} searchForm={searchForm} />
			<h3>User Mangement</h3>
			<Button
				onClick={() => {
					dispatch(deleteMultipleUserThunk(fieldSelected))
					setFieldSelected([])
					setActiveDelete(true)
				}}
				variant='danger'
				style={{ marginLeft: '4px', display: isSelect ? "block" : 'none' }}>
				Xóa
			</Button>
			{count && <BootstrapTable
				remote
				bootstrap4
				keyField="id"
				data={searchForm ? filteredUser : listUser}
				loading={true}
				columns={columns}
				pagination={paginationFactory(options)}
				onTableChange={() => null}
				selectRow={{
					mode: 'checkbox',
					onSelectAll: (isSelect, row, e) => {
						setFieldSelected(fieldSelected.concat([...row.map(item => item.id)]))
						setIsSelect(isSelect ? true : false)
					},
					onSelect: (row, isSelect, rowIndex, e) => {
						if (isSelect) {
							setIsSelect(true)
							fieldSelected.push(row.id)
						}
						else {
							// let index = fieldSelected.findIndex(item => item === row.id)
							// fieldSelected.splice(index, 1)
							setFieldSelected(fieldSelected.filter(item => item !== row.id))


						}
						console.log("fieldSelected", fieldSelected)
						if (fieldSelected.length > 0) {
							setIsSelect(true)
						}
						else {
							setIsSelect(false);
						}
					}
				}}
			/>}
			<ModalComponent
				idUser={idSelected}
				title={'Thông báo'}
				text={'Bạn chắc chắn muốn xoá trường này'}
				action={'Xoá'}
				show={show}
				handleClose={handleClose}
			/>
		</Container>
	);
}
