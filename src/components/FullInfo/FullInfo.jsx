import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import './FullInfo.css'
import {BsFillArrowDownSquareFill} from 'react-icons/bs'
import {RiDeleteBin5Fill, RiEditBoxFill} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../store/reducers/news'
import Loader from './../../UI/Loader/Loader';
import ProtectedComponent from './../ProtectedComponent/ProtectedComponent';
import {IoMdResize} from 'react-icons/io'

function FullInfo() {
  const [item, setItem] = useState({title: "", describe: "", description: "", thumbnail: "", categor: "", author: {username: '', job: ''}});
  const param = useParams();

  const [up, setUp] = useState(true);
  const [full, setFull] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, loading} = useSelector(state => state.auth)

  useEffect(async () => {
    let {data} = (await axios.get('/api/news/'+param.id + '?populate=*'));
    let res = data.data;
    let id = res.id;

     console.log(user,res);

    if (res.attributes.author.data) {
      let thumbData = await axios.get('api/profiles/'+res.attributes.author.data.id+'?populate=avatar&populate=news');
      let avatar = thumbData.data.data.attributes.avatar.data ? thumbData.data.data.attributes.avatar.data.attributes.formats.thumbnail.url : 'https://res.cloudinary.com/recipesrestourant/image/upload/v1650301593/thumbnail_avatar_963c587251.jpg'
      res = {
        id,
        ...res.attributes,
        thumbnail: res.attributes.thumbnail.data ? res.attributes.thumbnail.data.attributes.url : 'https://res.cloudinary.com/recipesrestourant/image/upload/v1649399729/thumbnail_Bez_nazvaniya_cc9e0227cf.jpg',
        category: res.attributes.categor,
        author: {
          username: res.attributes.author && res.attributes.author.data ? res.attributes.author.data.attributes.profileName : 'Не известен',
          job: res.attributes.author && res.attributes.author.data ? res.attributes.author.data.attributes.job : 'Нет',
          avatar,
          id: res.attributes.author ? res.attributes.author.data.id : 0
        },
        count: thumbData.data.data.attributes.news.data.length,
      }
      if (res.category === null) {
        res.category = 'Нет категории'
      }
    } else {
      res = {
        id,
        ...res.attributes,
        thumbnail: res.attributes.thumbnail.data ? res.attributes.thumbnail.data.attributes.url : 'https://res.cloudinary.com/recipesrestourant/image/upload/v1649399729/thumbnail_Bez_nazvaniya_cc9e0227cf.jpg',
        category: res.attributes.categor,
        author: {
          username: 'Не известен',
          job: 'Нет',
          avatar: 'https://res.cloudinary.com/recipesrestourant/image/upload/v1650301593/thumbnail_avatar_963c587251.jpg'
        },
        count: 0,
      }
    }
    setItem(res);
  }, []);

  let removeElem = () => {
    dispatch(remove(param.id));
    setTimeout(() => {
      navigate('/news-list');
    }, 300)
  };

  return (
    <div className='full__infoMain'>
      <Loader active={loading === 'loading'} />

      <div className={`full_thumb ${full ? 'full__thumb2' : ''}`}>
        <div className="btn-resize" onClick={() => setFull(!full)}>
          <IoMdResize/>
        </div>
        <div className={`full__person p-5 text-center ${!up ? 'bottom' : 'hover'}`}>
          <div className="person__avatar text-center">
            <img src={item.author.avatar} alt="avatar" />
          </div> 
          <h3 className='h2'>{item.author.username}</h3>
          Хобби: {item.author.job}
          <div className="person__count">
            Количество постов: {item.count}
          </div>
          <div className="person-btns mt-2">
            <ProtectedComponent elseComponent={<div/>} auth={user ? user.id === item.author.id : false} >
              <RiDeleteBin5Fill className='svg2' onClick={removeElem}/>
              <RiEditBoxFill className='svg3' onClick={() => navigate('/edit/'+param.id)} />
            </ProtectedComponent>
          </div>
        </div>
        <img src={item.thumbnail} alt="news thumbnail" className="full__img" />
      </div>

      <div className={`full__info`}>
        <div className={`${up? 'full__left hover' : 'full__grid row'} p-5`}>
          <div className={`full__item  col ${up ? '' : 'col-8'}`}>
            <div className={`${up ? '' : 'full__title'} h1 full__green`}>
              {item.title}
            </div>
            <div className="item__cat mb-1">
              Категория: {item.categor}
            </div>
            <div className="item__describe mb-2">
              Краткое описание: {item.describe}
            </div>
            <div className="item__description">
              Полное описание: {item.description}
            </div>
            <BsFillArrowDownSquareFill className='svg1' onClick={() => setUp(!up)}/>
          </div>
          <div className={`person__block ${up ? '' : 'p-md-5 col col-md-4'}`}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullInfo