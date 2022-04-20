import React, {useEffect, useState} from 'react';
import style from 'styled-components';

import axios from '../../api/axios';

import contact1 from '../../assets/contact-1.jpg';
import contact2 from '../../assets/contact-2.jpg';
import contact3 from '../../assets/contact-3.jpg';

import {RiTelegramLine} from 'react-icons/ri';
import {BsInstagram, BsFacebook} from 'react-icons/bs';


    // @media screen and (max-width: 750px) {
      // grid-template-columns: repeact(2, 1fr)
    // }

let ContactsBlock = style.div`
  max-width: 900px;


  .title {
    color: var(--main-color);
  }

  .contact__filial {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    @media screen and (max-width: 750px) {
      grid-template-columns: repeat(2, 1fr)
    }
    @media screen and (max-width: 530px) {
      grid-template-columns: repeat(1, 1fr)
    }
  }

  .image__wrap {
    height: 300px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover
  }

  ul {
    padding: 0
  }

  .text {
    color: var(--text-color);
    font-size: 1.1rem
  }

  .contacts {
    padding-left: 20px;
    font-size: 20px
  }

  .contacts li{
    list-style: inside
  }

  .block {
    margin-bottom: 20px
  }

  .social {
    font-size: 4rem;
    cursor: pointer;
  }

  .telegram svg {
    fill: #28A8E9
  }
  .facebook svg {
    fill: #4867AA
  }
  .instagram svg {
    fill: #A73AA6
  }

  .image__wrap {
    transform: translateY(50px);
    transition: .3s;
  }

  .contact__item:hover .image__wrap {
    transform: translateY(0px);
  }

  .contact__content {
    opacity: 0;
    transition: .3s;
    a {
      pointer-events: none
    }
  }

  .contact__item:hover .contact__content {
    opacity: 1;
    a {
      pointer-events: auto
    }
  }
`

let empty = [
  0, 0, 0
]

let socialMedia = [
  {elem: <BsFacebook/>, name: 'facebook', to: 'https://www.instagram.com/'},
  {elem: <BsInstagram/>, name: 'instagram', to: 'https://ru-ru.facebook.com/'},
  {elem: <RiTelegramLine/>, name: 'telegram', to: 'https://web.telegram.org/'},
]

let filials = [
  {title: 'Asia Mall', floor: '2 этаж 2 блок', coordinate: ("https://g.page/asiamall?share")},
  {title: 'Дордой плаза', floor: '4 этаж 1 блок', coordinate: ("https://goo.gl/maps/SP4oYMDg5Uii7hXa8")},
  {title: 'Типография "Вечерний Бишкек"', coordinate: ("https://goo.gl/maps/84xf7mFZ7PECyiKN6")}
]
 
export default function Contacts() {
  const [contact, setContact] = useState({});
  const [images, setImages] = useState([]);
  
  useEffect(async () => {
    if (images.length > 3) return;
    let res = await axios.get('/api/contact?populate=*');
    setContact(res.data.data.attributes);
    for (let i = 0; i < 3; i++) {
      let img = getImage(res.data.data.attributes[`filial${i+1}`]);
      setImages(image =>{
        let array = [...image];
        array.push(img);
        return array;
      });
    }
  }, [])
  
  const getImage = (image)  => {
    let img = image.data.attributes;
    return img.url;
  }

  return (
    <ContactsBlock className='m-auto p-2 pt-0 pb-0'>
      <div className="block">
        <h1 className='h1 title'>
          Наши филиалы
        </h1>
        <ul className='contact__filial'>
          {images.map((item, index) => {
            return (
            <li className='contact__item' key={index}>
              <div className="image__wrap">
                <img src={item} alt="" />
              </div>
              <div className="contact__content text">
                {filials[index] ? filials[index].title : ''} 
                <div className="">
                  {filials[index] ? filials[index].floor : ''}
                </div>
                <a href={filials[index] ? filials[index].coordinate: ''} className="link">Посмотреть на карте</a>
              </div>
            </li>
            )
          })}
        </ul>
      </div>
      <div className="block">
        <h1 className='h1 title'>
          Контакты
        </h1>
        <ul className="contacts">
          {empty.map((item, index) => {
            return <li key={index} className='contact'>0{contact[`contact${index+1}`]}</li>
          })}
        </ul>
      </div>
      <div className="block">
        <h1 className='h1 title'>
          Почта
        </h1>
        <ul className="contacts">
          {contact.email}
        </ul>
      </div>
      <div className="block">
        <h1 className='h1 title'>
          Социальные сети
        </h1>
        <div className="social-main d-flex justify-content-between">
          {socialMedia.map((item, index) => {
            return <a href={item.to} className={`social ${item.name}`} key={index}  >{item.elem}</a>
          })}
        </div>
      </div>

      {/* <iframe id='map' src={map} width="100%" height="600" style={{border:'0px'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}

    </ContactsBlock>
  )
}
