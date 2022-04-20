import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import AddNews from './components/AddNews/AddNews';
import FullInfo from './components/FullInfo/FullInfo';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import MainTable from './components/MainTable/MainTable';
import Contacts from './components/Contacts/Contacts';
import { CookiesProvider } from 'react-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCookie } from './store/reducers/auth';
import Edit from './components/Edit/Edit';
import Profile from './components/Profile/Profile';
import Test from './components/Test/Test';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(addCookie())
    }, 200);
  }, [])

  return (
    <CookiesProvider>
      <Layout>
        <Routes>  
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/add' element={<AddNews/>}/>
          <Route path='/news-list' element={<MainTable/>}/>
          <Route path='/news-list/:id' element={<FullInfo/>} />
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contacts' element={<Contacts/>}></Route>
          <Route path='/edit/:id' element={<Edit/>}></Route>
          <Route path='/profile' element={<Profile></Profile>} />
          <Route path='/test' element={<Test></Test>} />
        </Routes>
      </Layout>
    </CookiesProvider>
  );
}

export default App;
