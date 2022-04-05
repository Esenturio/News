import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddNews from './components/AddNews/AddNews';
import FullInfo from './components/FullInfo/FullInfo';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import MainTable from './components/MainTable/MainTable';

function App() {
  return (
    <Layout>
      <Routes>  
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/add' element={<AddNews/>}/>
        <Route path='/news-list' element={<MainTable/>}/>
        <Route path='/news-list/:id' element={<FullInfo/>} />
      </Routes>
    </Layout>
  );
}

export default App;
