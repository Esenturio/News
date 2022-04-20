import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "../../assets/news1.jpg";
import s1 from "../../assets/news2.jpg";
import s2 from "../../assets/news3.jpg";
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import "./Home.css";
import 'swiper/css/bundle'
import axios from '../../api/axios'
import { getArray } from "../../helpers/asyncThunk";
import Cart from './../Cart/Cart';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import {motion} from 'framer-motion'
import getImage from './../../helpers/getImage';

SwiperCore.use([Navigation, Pagination, Autoplay]);

let swiperSlides = [
  s, s2, s1
]

let newsBlockVariant = {
  init: {
    y: -50
  },
  visible: {
    y: 0,
    transition: {
      when: 'afterChildren',
      delayChildren: .3,
      duration: .3,
      delay: .5
    },
    staggerChildren: 0.3
  }
}

let newsVariant = {
  init: {
    x: -100
  },
  visible: {
    transition: {
      duration: .3   
    },
    x: 0
  }
}

function Home() {
  const [news, setNews] = useState([])
  const [slides, setSlides] = useState([])
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  useEffect(async () => {
    let res = await axios.get('/api/news?populate=thumbnail&sort[0]=createdAt%3Adesc&pagination[limit]=3');
    res = getArray(res.data.data);
    setNews(res)

    if (slides.length > 3) return

    res = await axios.get('/api/home?populate=*');
    res = res.data.data.attributes;
    for (let i=0; i<3; i++) {
      setSlides(slide => {
        let newS = [...slide]
        newS.push(getImage(res[`slide${i+1}`], true))
        return newS
      })
    }
    console.log(slides);
  }, [])

  const more = (id) => {
    navigate('/news-list/'+id);
  }

  const subscribe =async () => {
    try {
      let data = await axios.get('/api/subscibers');
      let subscribers = data.data.data
      subscribers = subscribers.filter(item => {
        return item.attributes.email === email
      })
      if (subscribers.length > 0) throw new Error ('Вы уже подписаны');
      axios.post('/api/subscibers', {data: {email}});
    } catch (error) {
      alert('Не удалось подписаться\n'+error);
      return;
    }
    alert('Вы успешно подписались на новости');
  }

  return (
    <div className="home">
      <Swiper
        tag="div"
        wrapperTag="ul"
        spaceBetween={50}
        loop={true}
        navigation
        mousewheel={true}
        autoplay={{delay: 3000}}
      >
        {slides.map((item, index) => {
          return (<SwiperSlide key={index} tag="li" className="home__slide">
                    <img src={item} alt={"slider item "+index} />
                  </SwiperSlide>)
        })} 
      </Swiper>
        <h3 className="posts__title h3 mt-4" style={{textAlign: 'center'}}>
          Последние новости
        </h3>
      <motion.div className="home__posts p-4" variants={newsBlockVariant} initial={'init'} whileInView={'visible'} viewport={{amount: .3, once: true}}>
        {news.map(item => {
          return <Cart variants={newsVariant} key={item.id} title={item.title} describe={item.describe} thumb={item.thumbnail} more={() => more(item.id)} />
        })}
      </motion.div>
      <div className="home__all align-center d-flex mb-4">
        <button className="btn btn-primary m-auto" onClick={() => navigate('/news-list')}>Посмотреть все новости</button>
      </div>
      <div className="home__sub border border-1 border-start-none border-end-none">
        <div className="input-group home__subscribe mb-3 p-5">
          <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Твой email" aria-label="Username" aria-describedby="basic-addon1"/>
          <button className="btn btn-primary input-group-text" id="basic-addon1" onClick={subscribe}>Подписаться</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
