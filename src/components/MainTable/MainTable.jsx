import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { catFetch, getItemsByCat, newsFetch } from '../../store/reducers/news'
import NewsItem from '../NewsItem/NewsItem'
import './MainTable.css'
import PaginationItem from './../PaginaionItem/PaginationItem';
import noPosts from '../../assets/noPosts.jpg'

let pagination = [];

function MainTable() {
  const [filter, setFilter] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {data ,meta} = useSelector(state => state.news);

  useEffect(() => {
    dispatch(newsFetch(1));
  }, []);

  useEffect(() => {
    if (pagination.length !== 0) return;
    if (meta && meta.pagination && meta.pagination.total) {
      console.log(meta.pagination.total);
      for (let i = 0; i < Math.ceil(meta.pagination.total / 10); i++) {
        pagination.push(i);
      }
    }
  }, [meta]);

  const more = (id) => {
    navigate('/news-list/'+id);
  };

  const filterCat = () => {
    dispatch(catFetch(filter));
  };

  return (
    <div className='news-table m-auto mb-5 p-3'>
      <div className="input-group filter mb-3 p-5">
        <input type="text" className="form-control" placeholder="Категория поста" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setFilter(e.target.value)}/>
        <button className="btn btn-primary input-group-text" id="basic-addon1" onClick={filterCat}>Фильтр</button>
      </div>
      {data.length < 1 ? <img className='d-flex post_img' src={noPosts} /> : null}
      {data.map((item, index) => {
        return <NewsItem key={index} title={item.title} describe={item.describe} author={item.author.username} thumb={item.thumbnail} more={() => more(item.id)} />
      })}
      <div className="pagination d-flex justify-center">
        {pagination.map((item) => {
          return <PaginationItem to={() => dispatch(newsFetch(item+1))} num={item+1} />
        })}
      </div>
    </div>
  )
}

export default MainTable