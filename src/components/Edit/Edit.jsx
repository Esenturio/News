import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {newsPut} from '../../store/reducers/news'
import axios from '../../api/axios'
import { getArray } from '../../helpers/asyncThunk';
import Form from '../../UI/Form/Form';
import { useState } from 'react';
import thumb from '../../assets/placeholder.png'
import {Edit as Edit2} from './Edit.styles.jsx';
import Loader from '../../UI/Loader/Loader';

let initialState = {
  title: '',
  describe: '',
  description: '',
  categor: ''
}

let staticImage = ''

function Edit() {

  const [form, setForm] = useState({...initialState})
  const [file, setFile] = useState('')
  const [image, setImage] = useState({});
  const [secLoad, setSecLoad] = useState('');
  
  const id = useParams().id
  const {loading} = useSelector(state => state.news)
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(async () => {
    let res = await axios.get('/api/news/'+id+'?populate=*');
    let form = getArray([res.data.data]);
    setForm({...form[0]});
    console.log(res);
  }, [])

  useEffect(() => {
    setSecLoad(loading);
  }, [loading])

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const fileHandler = e => {
    let file = e.target.files[0];
    setFile(file);

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    } 
  }

  const submit = async e => {
    e.preventDefault();

    let data = {...form};
    data.thumbnail = image

    setSecLoad('loading');

    dispatch(newsPut({id,data}));
    
    setTimeout(() => {
      navigate('/news-list/'+id)
      setSecLoad('success');
    }, 200) 
  }

  if (!user) return <Navigate to={'/login'}/>

  return (
    <Edit2 className=' m-auto mb-5'>
      <Loader active={secLoad === 'loading'}/>
      <Form none={true} handler={changeHandler} {...form} submit={submit} fileHandler={fileHandler} cat={form.categor} descrition={form.description}>Редактировать новость</Form>
    </Edit2>
  )
}

export default Edit