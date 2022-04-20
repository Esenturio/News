import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom'
import ProtectedComponent from '../../ProtectedComponent/ProtectedComponent'
import './Topbar.css'
import {CgProfile} from 'react-icons/cg'
import image from '../../../assets/blog-logo.gif'
import {logout} from '../../../store/reducers/auth'
import Hamburger from 'hamburger-react' 

function Topbar() {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)

  return (
    <div className='topbar d-flex justify-content-center align-items-center p-3 border pt-4 pb-4'>
      <div className="topbar__logo me-auto">
        <img src={image} alt="logo" className='topbar__img'/>
      </div>
      <div className={`topbar__nav ${isOpen ? 'active' : ''}`}>
        <NavLink className='ms-2 me-2' to='/'>Главная</NavLink>
        <NavLink className='ms-2 me-2' to='/about'>О нас</NavLink>
        <NavLink className='ms-2 me-2' to='/contacts'>Контакты</NavLink>
        <NavLink className='ms-2 me-2' to='/news-list'>Новости</NavLink>
      </div>
      <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
      <div className="topbar__left ms-auto">
        <ProtectedComponent auth={user} elseComponent={<NavLink className='login-btn' to={'/login'}>Войти</NavLink>}>
          <div className="topbar__profile">
              <div className="dropdown">
                <div className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <CgProfile/>
                </div>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><div className="dropdown-item" onClick={() => navigate('/profile')}><NavLink to='/profile'>Профиль</NavLink></div></li>
                  <li><div className="dropdown-item" onClick={() => navigate('/add')}><NavLink to='/add'>Добавить новость</NavLink></div></li>
                  <li><div className="dropdown-item" onClick={() => navigate('/')}><NavLink to='/' onClick={() => dispatch(logout())}>Выйти</NavLink></div></li>
                </ul>
              </div>
          </div>
        </ProtectedComponent>
      </div>
    </div>
  )
}

export default Topbar