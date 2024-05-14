import './App.css';
import {Routes,Route} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Signup from "./components/Signup/Signup"
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Pay from './components/Pay/Pay';
import Admin from './components/Admin/Admin';
import Reception from './components/Reception/Reception';
import AddOffer from './components/AddOffer/AddOffer';
import EditOffer from './components/EditOffer/EditOffer';
import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { getAllOffers } from './Redux/actions/actionsOffer';
import { getCurrent } from './Redux/actions/actionsUser';
import PrivateRoute from './components/routes/PrivateRoutes';
import AdminRoutes from './components/routes/AdminRoutes';
import ReceptionRoutes from './components/routes/ReceptionRoutes';
import EditUser from './components/EditUser/EditUser';
import EditRoute from './components/routes/EditRoute';
import PayRoute from './components/routes/PayRoute';
import SignupRoute from './components/routes/SignupRoute';
import LoginRoute from './components/routes/LoginRoute';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
   
    dispatch(getAllOffers())
    dispatch(getCurrent())
  }, [])

  return (
    <div >
  <Routes>
<Route path={'/edituser/:id'} element={<EditRoute><EditUser/></EditRoute>}/>
<Route  path='/' element={<Home />}/>
<Route path='/signup' element={<SignupRoute><Signup/></SignupRoute>}/>
<Route path='/login' element={<LoginRoute><Login/></LoginRoute>}/>
<Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
<Route path='/pay' element={<PayRoute><Pay/></PayRoute>}/>
<Route path='/admin' element={<AdminRoutes><Admin/></AdminRoutes>}  />
<Route path='/add' element={<AddOffer/>}/>
<Route path={'/edit/:id'} element={<EditOffer/>}/>
<Route path='/reception' element={<ReceptionRoutes><Reception/></ReceptionRoutes>}/>
  </Routes>
</div>
  );
}

export default App;
