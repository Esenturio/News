import React, { useEffect, useState } from 'react'
import { catFetch, newsPost } from '../../store/reducers/news'
import Form from '../../UI/Form/Form'
import styles from './AddNews.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Navigate} from 'react-router-dom'
import axios from '../../api/axios'

let initialState = {
  title: '',
  describe: '',
  description: '',
  category: ''
}

function AddNews() {

  const [form, setForm] = useState({...initialState})
  const [file, setFile] = useState('')

  const cats = useSelector(state => state.news.categories)
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(async () => {
    await dispatch(catFetch());
  }, [])

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const fileHandler = e => {
    setFile(e.target.files[0])
  }

  const submit = async e => {
    e.preventDefault()

    let data = {...form}

    let formData = new FormData()
    formData.append('files', file)

    axios.post('/api/upload', formData, {headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}`}}).then(res => {
      data.thumbnail = res.data[0]
      dispatch(newsPost(data))
    })

  }

  
  if (!user) <Navigate to={'/login'}/>
  return (
    <div className={styles.form + ' m-auto'}>
      <Form handler={changeHandler} cats={cats} {...form} submit={submit} fileHandler={fileHandler} >Добавить новость</Form>
    </div>
  )
}

export default AddNews