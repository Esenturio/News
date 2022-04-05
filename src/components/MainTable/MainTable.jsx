import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { newsFetch } from '../../store/reducers/news'
import NewsItem from '../NewsItem/NewsItem'
import './MainTable.css'

function MainTable() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const news = useSelector(state => state.news.data)

  useEffect(() => {
    dispatch(newsFetch())
  }, [])

  const more = (id) => {
    navigate('/news-list/'+id)
  }

  return (
    <div className='news-table m-auto pt-5'>
      {news.map((item, index) => {
        return <NewsItem key={index} title={item.title} describe={item.describe} author={item.author} thumb={item.thumbnail} more={() => more(item.id)} />
      })}
    </div>
  )
}

export default MainTable