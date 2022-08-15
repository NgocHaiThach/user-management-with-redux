import { HomeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addUserThunk, fetchOneUser, updateUserThunk } from '../../redux/userSlice';
import Loading from '../Loading/Loading';
import './form.css';

const initialState = {
      name: "", userName: "", email: "", phone: "", type: false,
}

const Form = () => {
      const { oneuser, isFetching } = useSelector(state => state.user);
      const [form, setForm] = useState(initialState);
      const [isEdit, setIsEdit] = useState(false);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const location = useLocation();
      const pathname = location.pathname.split('/')[1];
      const { id } = useParams();
      console.log(oneuser, form);

      const handleChange = (e) => {
            const name = e.target.name;
            setForm({ ...form, [name]: e.target.value })
      }

      useEffect(() => {
            if (oneuser && pathname === 'edit') {
                  setForm({
                        name: oneuser?.name,
                        userName: oneuser?.userName,
                        email: oneuser?.email,
                        phone: oneuser?.phone,
                        type: oneuser?.type
                  })
            }
      }, [dispatch, oneuser]);

      useEffect(() => {
            if (pathname === 'edit') {
                  dispatch(fetchOneUser(id))
                  setIsEdit(true)
            } else if (pathname === 'add') {
                  setIsEdit(false)
            }
      }, [dispatch, id, pathname]);

      const onSubmit = (e) => {
            e.preventDefault();
            if (isEdit) {
                  dispatch(updateUserThunk({ ...form, id: oneuser.id }));
            }
            else {
                  dispatch(addUserThunk(form))
            }
            setForm(initialState)
            navigate("/")
      };

      if (isFetching) return <Loading />

      return (
            <div className='form'>
                  <div className='form__container'>
                        <h1>{isEdit ? 'Edit User' : 'Add User'}</h1>
                        <form onSubmit={onSubmit}>
                              <div className='form__item'>
                                    <input
                                          name="name"
                                          type='text'
                                          placeholder='Name'
                                          value={form.name || ""}
                                          onChange={handleChange}
                                    />
                              </div>
                              <div className='form__item'>
                                    <input
                                          name="userName"
                                          type='text'
                                          value={form.userName || ""}
                                          placeholder='Username'
                                          onChange={handleChange}
                                    />
                              </div>
                              <div className='form__item'>
                                    <input
                                          name="email"
                                          value={form.email || ""}
                                          type='email'
                                          placeholder='Email'
                                          onChange={handleChange}
                                    />
                              </div>
                              <div className='form__item'>
                                    <input
                                          name="phone"
                                          value={form.phone || ""}
                                          type='number'
                                          placeholder='Phone number'
                                          onChange={handleChange}
                                    />
                              </div>
                              <div className='form__item'>
                                    <select name="type" value={form.type} onChange={handleChange}
                                    >
                                          <option value={false}>USER</option>
                                          <option value={true}>VIP</option>
                                    </select>
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
