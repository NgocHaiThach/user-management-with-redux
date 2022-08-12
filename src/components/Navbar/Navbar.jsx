import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

const Navbar = ({ setSearchForm, searchForm }) => {

      return (
            <div className='nav'>
                  <div className="nav__container">
                        <div className="nav__container__left">
                              <Link to="/" className='nav__link'>
                                    <h1>Home</h1>
                              </Link>
                        </div>
                        <div className="nav__container__right">
                              <div className="right__search">
                                    <input type="text"
                                          value={searchForm}
                                          onChange={(e) => setSearchForm(e.target.value)}
                                    />
                                    <SearchOutlined className='right__search__icon' />
                              </div>

                              <div className="right__add">
                                    <Link to="/add" className="nav__link">
                                          <span>Add User</span>
                                    </Link>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Navbar