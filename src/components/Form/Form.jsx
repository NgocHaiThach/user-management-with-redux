import { HomeOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation } from 'react-router-dom';
import { schema } from '../../yupGlobal';
import "./form.css"

const Form = () => {
      const [isEdit, setEdit] = useState(false);
      const location = useLocation();
      const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema)
      });

      useEffect(() => {
            const pathname = location.pathname.split("/")[1];
            if (pathname === "edit") {
                  setEdit(true)
            } else {
                  setEdit(false)
            }
      }, [location])

      const onSubmit = data => {
            console.log(data)
      }

      return (
            <div className='form'>
                  <div className="form__container">
                        <h1>{isEdit ? "Edit User" : "Register"}</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="form__item">
                                    <input {...register("name")} type="text" placeholder="Name" />
                                    <span>{errors.name?.message}</span>
                              </div>
                              <div className="form__item">
                                    <input {...register("username")} type="text" placeholder="Username" />
                                    <span>{errors.username?.message}</span>
                              </div>
                              <div className="form__item">
                                    <input {...register("email")} type="email" placeholder="Email" />
                                    <span>{errors.email?.message}</span>
                              </div>
                              <div className="form__item">
                                    <input {...register("phone")} type="number" placeholder="Phone number" />
                                    <span>{errors.phone?.message}</span>
                              </div>
                              <div className="form__item">
                                    <input {...register("role")} type="text" placeholder="Role" />
                                    <span>{errors.role?.message}</span>
                              </div>

                              <input type="submit" color="form__input" />
                        </form>
                        <Link to="/">
                              <div className="form__back">
                                    <span>Back to Home</span>
                                    <HomeOutlined />
                              </div>
                        </Link>
                  </div>
            </div>
      )
}

export default Form