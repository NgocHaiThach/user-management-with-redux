import { HomeOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addUserThunk, fetchOneUser, updateUserThunk } from '../../redux/userSlice';
import { getOneUser } from '../../services/apiUsers';
import { schema } from '../../yupGlobal';
import './form.css';




const Form = () => {
	const [isEdit, setEdit] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname.split('/')[1];

	const { oneuser } = useSelector(state => state.user);


	// Input state
	const [name, setName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
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
		if (pathname === 'edit') {
			setEdit(true);
			// Set state input in here
			dispatch(fetchOneUser(id));
		} else {
			setEdit(false);
			// Set state input in here
		}
	}, [dispatch, location, id]);

	useEffect(() => {
		if (oneuser && pathname === 'edit') {
			setName(oneuser?.name);
			setUserName(oneuser?.userName);
			setEmail(oneuser?.email);
			setPhone(oneuser?.phone);
			setType(oneuser?.type === true ? 1 : 0);
		}
	}, [dispatch, oneuser]);

	const onSubmit = async (data) => {
		if (pathname === 'edit') {

			const updateUserValue = {
				...oneuser,
				name,
				userName,
				email,
				phone,
				type: type === 0 ? false : true
			}

			try {
				await dispatch(updateUserThunk(updateUserValue)).unwrap();
				navigate('/', { replace: true })
				console.log(data)
			}
			catch (err) {
				console.log('Error update form')
			}
		}
		else {
			try {
				await dispatch(addUserThunk(data)).unwrap();
				console.log(data)
				navigate('/', { replace: true });
			} catch (err) {
				console.log('Error on add form');
			}
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
							value={name}
							autoFocus
							onChange={e => setName(e.target.value)}
						/>
						<span>{errors.name?.message}</span>
					</div>
					<div className='form__item'>
						<input
							{...register('userName')}
							type='text'
							value={userName}
							placeholder='Username'
							onChange={e => setUserName(e.target.value)}
						/>
						<span>{errors.username?.message}</span>
					</div>
					<div className='form__item'>
						<input
							{...register('email')}
							value={email}
							type='email'
							placeholder='Email'
							onChange={e => setEmail(e.target.value)}
						/>
						<span>{errors.email?.message}</span>
					</div>
					<div className='form__item'>
						<input
							{...register('phone')}
							value={phone}
							type='text'
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
