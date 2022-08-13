import { HomeOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addUserThunk } from '../../redux/userSlice';
import { schema } from '../../yupGlobal';
import './form.css';

const Form = () => {
	const [isEdit, setEdit] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// Input state
	const [name, setName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState(null);
	const [type, setType] = useState(0);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const pathname = location.pathname.split('/')[1];
		if (pathname === 'edit') {
			setEdit(true);
			// Set state input in here
		} else {
			setEdit(false);
			// Set state input in here
		}
	}, [location]);

	const onSubmit = async () => {
		const newUser = {
			// id: nanoid(),
			name,
			userName,
			email,
			phone,
			type: type === 0 ? false : true,
		};

		try {
			await dispatch(addUserThunk(newUser)).unwrap();
			reset({
				name: '',
				userName: '',
				email: '',
				phone: null,
				type: 0,
			});
			navigate('/', { replace: true });
		} catch (err) {
			console.log('Error on add form');
		}
	};

	const handleChangeType = e => {
		setType(e.target.value);
	};
	return (
		<div className='form'>
			<div className='form__container'>
				<h1>{isEdit ? 'Edit User' : 'Add User'}</h1>
				<form
					onSubmit={e => {
						handleSubmit(onSubmit)(e);
					}}>
					<div className='form__item'>
						<input
							{...register('name')}
							type='text'
							placeholder='Name'
							autoFocus
							onChange={e => setName(e.target.value)}
						/>
						<span>{errors.name?.message}</span>
					</div>
					<div className='form__item'>
						<input
							{...register('userName')}
							type='text'
							placeholder='Username'
							onChange={e => setUserName(e.target.value)}
						/>
						<span>{errors.username?.message}</span>
					</div>
					<div className='form__item'>
						<input
							{...register('email')}
							type='email'
							placeholder='Email'
							onChange={e => setEmail(e.target.value)}
						/>
						<span>{errors.email?.message}</span>
					</div>
					<div className='form__item'>
						<input
							{...register('phone')}
							type='number'
							placeholder='Phone number'
							onChange={e => setPhone(e.target.value)}
						/>
						<span>{errors.phone?.message}</span>
					</div>
					<div className='form__item'>
						{/* <input
							{...register('role')}
							type='text'
							placeholder='Role'
						/> */}
						<select value={type} onChange={handleChangeType}>
							<option value={0}>USER</option>
							<option value={1}>VIP</option>
						</select>
						{/* <span>{errors.role?.message}</span> */}
					</div>

					<input type='submit' color='form__input' />
				</form>
				<Link to='/'>
					<div className='form__back'>
						<span>Back to Home</span>
						<HomeOutlined />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Form;
