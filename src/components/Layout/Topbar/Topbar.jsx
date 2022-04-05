import React from 'react'
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import ProtectedComponent from '../../ProtectedComponent/ProtectedComponent'
import './Topbar.css'
import {CgProfile} from 'react-icons/cg'

function Topbar() {
  const {user} = useSelector(state => state.auth)
  return (    
    <div className='topbar d-flex justify-content-center align-items-center p-3  border'>
      <div className="topbar__logo me-auto">
        <img src="img/news-logo.jpg" alt="logo" className='topbar__img' />
      </div>
      <div className="topbar__nav">
        <NavLink className='ms-2 me-2' to='/'>Главная</NavLink>
        <NavLink className='ms-2 me-2' to='/about'>О нас</NavLink>
        <NavLink className='ms-2 me-2' to='/contacts'>Контакты</NavLink>
        <NavLink className='ms-2 me-2' to='/news-list'>Новости</NavLink>
      </div>
      <div className="topbar__left ms-auto">
        <ProtectedComponent auth={user} elseComponent={<NavLink to={'/login'}>Log in</NavLink>}>
          <div className="topbar__profile">
              <div class="dropdown">
                <div class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <CgProfile/>
                </div>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><div className="dropdown-item"><NavLink to='/profile'>Profile</NavLink></div></li>
                  <li><div className="dropdown-item"><NavLink to='/add'>Add News</NavLink></div></li>
                  <li><div className="dropdown-item"><NavLink to='/'>Log out</NavLink></div></li>
                </ul>
              </div>
          </div>
        </ProtectedComponent>
      </div>
    </div>
  )
}

export default Topbar