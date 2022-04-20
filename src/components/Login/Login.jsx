import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userAuth } from '../../store/reducers/auth';
import './Login.css'
import Loader from './../../UI/Loader/Loader';
import { useCookies } from 'react-cookie';

function Login() {
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const {user} = useSelector(st => st.auth)

  const [cookie, setCookie] = useCookies(['user'])

  let block = <div></div>

  useEffect(() => {
    if (loading === 'error') {
      alert('Password or email are invalid')
    }else if (loading === 'success') {
      navigate('/')
    }
  }, [loading])

  useEffect(() => {
    if (!user) return;
    setCookie('user', JSON.stringify(user), {path: '/', maxAge: 36000, sameSite: true})
  }, [user])

  const changeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(userAuth(data))
  }

  return (
    <div className='login mt-3 mb-5'>
      {block}
      <Loader active={loading === 'loading'}/>
      <form className="form" onSubmit={submit}>
        <div className="form-wrap">
          <label className='form-label' htmlFor="form__email">Email:</label>
          <input className='form-control' onChange={changeHandler} type="email" name='identifier' id='form__email' placeholder='Введите email' />
        </div>
        <div className="form-wrap">
          <label className='form-label' htmlFor="form__pass">Пароль:</label>
          <input className='form-control' onChange={changeHandler} type="password" name='password' id='form__pass' placeholder='Введите пароль' />
        </div>
        <div className="form__submit mt-3">
          <button type='submit' className='btn btn-primary'>Отправить</button>
        </div>
      </form>
    </div>
  );
}

export default Login