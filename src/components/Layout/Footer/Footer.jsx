import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import {Footer as FooterMain} from './Footer.css'
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { RiTelegramLine } from 'react-icons/ri';
import axios from '../../../api/axios'

let socialMedia = [
  {elem: <BsFacebook/>, name: 'facebook', to: 'https://www.instagram.com/', color: '#4867AA'},
  {elem: <BsInstagram/>, name: 'instagram', to: 'https://ru-ru.facebook.com/', color: '#A73AA6'},
  {elem: <RiTelegramLine/>, name: 'telegram', to: 'https://web.telegram.org/', colro: '#28A8E9'},
]

let adress = [
  'Asia Mall 2 этаж 2 блок',
  'Дордой плаза 4 этаж 1 блок',
  'Типография "Вечерний Бишкек"'
]

function Footer() {
  const [contact, setContact] = useState({})

  useEffect(async () => {
    let res = await axios.get('/api/contact?populate=*');
    setContact(res.data.data.attributes);
  }, [])

  return (
    <FooterMain>
      <div className='p-3 pt-0 pb-0 footer-block'>
        <h3 className="footer__title">
          Навигация по сайту
        </h3>
        <div className="footer__links footer__nav d-flex flex-column">
          <div><NavLink className='ms-2 me-2' to='/'>Главная</NavLink></div>
          <div><NavLink className='ms-2 me-2' to='/about'>О нас</NavLink></div>
          <div><NavLink className='ms-2 me-2' to='/contacts'>Контакты</NavLink></div>
          <div><NavLink className='ms-2 me-2' to='/news-list'>Новости</NavLink></div>
        </div>
      </div>

      <div className="footer__sec footer-block p-3 pt-0 pb-0">
        <h3 className="footer__title">
          Социальные сети
        </h3>
        <div className="footer__icons">
          {socialMedia.map(item => {
            return <div key={item.name} className={`me-2 ${item.name}`}><a href={item.to}>{item.elem}</a></div>
          })}
        </div>
      </div>

      <div className="footer__third footer-block p-3 pt-0 pb-0">
        <h3 className="footer__title">
          Контактная информация
        </h3>
        <div className="footer__contacts">
          Адреса: 
          <ul className='footer__adress'>
            {adress.map((item, index) => {
              return <li key={index} >{item}</li>
            })}
          </ul>
          Номера:
          <ul className="footer__numbers">
            {adress.map((item, index) => {
              return  <li key={index} className='contact'>0{contact[`contact${index+1}`]}</li>
            })}
          </ul>
          Почта: blogs@gmail.kg.com
        </div>
      </div>
    </FooterMain>
  )
}

export default Footer