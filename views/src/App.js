import React, { useEffect } from 'react';
import './App.css';
import Horses from './features/horses/Horses';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/root/Root';
import Homepage from './pages/homepage/Homepage';
import Horse from './features/horses/Horse';
import { useDispatch, useSelector } from 'react-redux';
import { loadHorses } from './features/horses/horsesSlice';
import ScrollTop from './components/scrollTop/ScrollTop';
import ErrorHandler from './components/error-handler/ErrorHandler';
import Login from './features/user/Login';
import { selectUser } from './features/user/userSlice';
import Admin from './pages/admin/Admin';

const Authenticater = ({children})=>{
    const user = useSelector(selectUser)
    if(user.role === 'admin'){
      return children
    }else{
      return <ErrorHandler message={"You are not supposed to be here!"}/>
    }
}
//Create Router
const router = createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<Root />} errorElement={<ErrorHandler message={"OH NO!"}/>}>
    <Route path="/" element={<Homepage />} />
    <Route path="/admin" element={<Authenticater><Admin/></Authenticater>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/horses" element={<Horses />} />
    <Route path='/horses/:horseName' element={<Horse />} errorElement={<ErrorHandler message="Horse Not Found"  />}/>   
    <Route path='/*' element={<ErrorHandler message="This Page is currently under construction"/>} />  
 </Route>


))
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadHorses())
  }, [dispatch])

  return (
    <ScrollTop>
      <RouterProvider router={router} />
    </ScrollTop>

  );
}

export default App;
