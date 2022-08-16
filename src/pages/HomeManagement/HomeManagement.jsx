import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import TableData from '../../components/TableData/TableData';
import { deleteMultipleUserThunk, fetchOneUser, fetchUsers, fetchUsersPagination } from '../../redux/userSlice';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from 'react-router-dom';
import ModalComponent from '../../components/ModalComponent';

export default function HomeManagement() {
	const { listUser, oneuser, count } = useSelector(state => state.user);
	const [searchForm, setSearchForm] = useState('');
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [idSelected, setIdSelected] = useState(null);

	const [fieldSelected, setFieldSelected] = useState([]);
	const [isSelect, setIsSelect] = useState(false);

	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);

	const filteredUser = listUser.filter(x =>
		Object.values(x).some(value =>
			String(value).toLowerCase().includes(searchForm.toLowerCase()),
		),
	);

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


	useEffect(() => {
		// dispatch(fetchUsers());
		dispatch(fetchUsersPagination({ limit, page }));
	}, []);

	const columns = [
		{
			dataField: "id",
			text: "User ID",
			sort: true
		},
		{
			dataField: "name",
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


	return (
		<Container style={{ paddingTop: '140px' }}>
			<Navbar setSearchForm={setSearchForm} searchForm={searchForm} />
			<h3>User Mangement</h3>
			<Button
				onClick={() => {
					dispatch(deleteMultipleUserThunk(fieldSelected))
					setFieldSelected([])

				}}
				variant='danger'
				style={{ marginLeft: '4px', display: isSelect ? "block" : 'none' }}>
				Xóa
			</Button>
			{/* <TableData
				listUser={searchForm ? filteredUser : listUser}
				titleData={titleData}
			/> */}

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
