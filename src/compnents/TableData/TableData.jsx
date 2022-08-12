import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalComponent from '../ModalComponent';

export default function TableData({ listUser, titleData }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [idSelected, setIdSelected] = useState(null);

	const renderTitleData = () => {
		return titleData.map(title => <th key={title.name}>{title.field}</th>);
	};

	const renderDataUser = () => {
		return listUser.map(user => (
			<tbody key={user.id}>
				<tr>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td>{user.phone}</td>
					<td>{user.email}</td>
					<td>{user.type ? 'Admin' : 'User'}</td>
					<td className='col-lg-3'>
						<Button
							variant='success'
							style={{ marginRight: '4px' }}>
							<Link
								to={`/edit/${user.id}`}
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
								setIdSelected(user.id);
								handleShow();
							}}
							variant='danger'
							style={{ marginLeft: '4px' }}>
							Xóa
						</Button>
						<ModalComponent
							idUser={idSelected}
							title={'Thông báo'}
							text={'Bạn chắc chắn muốn xoá trường này'}
							action={'Xoá'}
							show={show}
							handleClose={handleClose}
						/>
					</td>
				</tr>
			</tbody>
		));
	};

	return (
		<div className='panel-body'>
			<Table striped bordered hover>
				<thead>
					<tr>{renderTitleData()}</tr>
				</thead>
				{renderDataUser()}
				<tfoot>
					<tr>{renderTitleData()}</tr>
				</tfoot>
			</Table>
		</div>
	);
}
