import { HomeOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addUserThunk, fetchOneUser } from '../../redux/userSlice';
import { schema } from '../../yupGlobal';
import './form.css';

const Form = ({ data }) => {
	const [isEdit, setEdit] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { oneuser } = useSelector(state => state.user);

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
		// console.log('location', pathname)
		if (pathname === 'edit') {
			setEdit(true);
			// Set state input in here
			// dispatch(fetchOneUser(id));

		} else {
			setEdit(false);
			console.log("add")
			// Set state input in here
		}
	}, [location, id]);

	// console.log("first", oneuser)
	// setName(oneuser?.name);


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
							type='email'
							value={email}
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
