import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';

export default function EditUser() {
	const schema = yup
		.object()
		.shape({
			name: yup.string().required().min(5),
			phone: yup.string().required(),
			email: yup.string().required(),
			role: yup.string().required(),
		})
		.required();

	const { id } = useParams();
	const listUser = useSelector(state => state.user.listUser);
	const filterUser = listUser.filter(user => user.id === id);

	const [value, setValue] = useState({
		name: filterUser[0]?.name,
		phone: filterUser[0]?.id,
		email: filterUser[0]?.email,
		type: filterUser[0]?.type,
	});
	const {
		register,
		control,
		handleSubmit,
		reset,
		trigger,
		setError,
		formState: { errors },
	} = useForm({
		// defaultValues: {}; you can populate the fields by this attribute
		resolver: yupResolver(schema),
	});
	const onSubmit = data => {
		console.log('first', data);
	};
	return (
		<Container>
			<Row>
				<form className='mt-20'>
					<p className='form-group'>
						<label>User Name</label>
						<input
							name='name'
							className='form-control max-width'
							type='text'
							value={value.name}
							{...register('name')}
						/>
					</p>
					{errors?.name?.type === 'required' && (
						<p className='valid-form__message'>
							* Trường này bắt buộc, vui lòng nhập
						</p>
					)}
					{errors?.name?.type === 'min' && (
						<p className='valid-form__message'>
							* Tên phải dài hơn 5 ký tự
						</p>
					)}

					<p className='form-group'>
						<label>Phone</label>
						<input
							name='phone'
							className='form-control max-width'
							type='text'
							{...register('phone')}
						/>
					</p>
					{errors?.phone?.type === 'required' && (
						<p className='valid-form__message'>
							* Trường này bắt buộc, vui lòng nhập
						</p>
					)}

					<p className='form-group'>
						<label>Email</label>
						<input
							name='email'
							className='form-control max-width'
							type='text'
							{...register('email')}
						/>
					</p>
					{errors?.email?.type === 'required' && (
						<p className='valid-form__message'>
							* Trường này bắt buộc, vui lòng nhập
						</p>
					)}

					<p className='form-group'>
						<label>Role User</label>
						<input
							name='role'
							className='form-control max-width'
							type='text'
							{...register('role')}
						/>
					</p>
					{errors?.role?.type === 'required' && (
						<p className='valid-form__message'>
							* Trường này bắt buộc, vui lòng nhập
						</p>
					)}
				</form>
			</Row>
			<Button variant='secondary' className='mr-5'>
				<Link to='/categories'>Trở Lại</Link>
			</Button>
			<Button
				onClick={handleSubmit(onSubmit)}
				variant='primary'
				className='ml-5'>
				Thêm Loại Sản Phẩm
			</Button>

			{/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thêm sản phẩm thành công!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal> */}
		</Container>
	);
}
