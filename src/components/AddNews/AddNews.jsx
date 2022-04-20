import React, { useEffect, useState } from 'react'
import { catFetch, newsPost } from '../../store/reducers/news'
import Form from '../../UI/Form/Form'
import Loader from '../../UI/Loader/Loader'
import styles from './AddNews.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Navigate} from 'react-router-dom'
import axios from '../../api/axios'
import thumb from '../../assets/placeholder.png'

let initialState = {
  title: '',
  describe: '',
  description: '',
  categor: ''
}

function AddNews() {

  const [form, setForm] = useState({...initialState})
  const [file, setFile] = useState('')
  const [image, setImage] = useState(thumb);
  const [secLoad, setSecLoad] = useState('');

  const cats = useSelector(state => state.news.categories)
  const {loading} = useSelector(state => state.news)
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setSecLoad(loading)
    console.log(loading);
  }, [loading])

  useEffect(async () => {
    await dispatch(catFetch());
  }, [])

  const changeHandler = (e) => {
    if (e.target.name === 'category') {
      setForm({...form, category: parseInt(e.target.value)})
    }
    setForm({...form, [e.target.name]: e.target.value})
  }

  const fileHandler = e => {
    let file = e.target.files[0];
    setFile(file);

    let reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = () => {
      setImage(reader.result)
    }
  }

  const submit = async e => {
    e.preventDefault()

    let data = {...form}

    let formData = new FormData()
    formData.append('files', file)

    setSecLoad('loading');

    axios.post('/api/upload', formData, {headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}`}}).then(res => {
      setSecLoad('success');
      data.thumbnail = res.data[0]
      dispatch(newsPost(data))
      console.log(res.data[0]);
    }).finally(() => {
        setTimeout(() => {
        navigate('/news-list');
      }, 200)
    })


  }

  if (!user) return <Navigate to={'/login'}/>

  return (
    <div className={styles.form + ' m-auto mb-5'}>
      <Loader active={secLoad === 'loading'}/>
      <Form img={image} handler={changeHandler} cats={cats} {...form} submit={submit} fileHandler={fileHandler} >Добавить новость</Form>
    </div>
  )
}

export default AddNews