import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './profileManagement/login';
import * as mdb from 'mdb-ui-kit'; // lib
import Registration from './profileManagement/register';
import Profile from './profileManagement/Profile';
import SignUpForm from './profileManagement/signupform';
import ErrorPage from './error';
import FindBuddy from './findbuddy';
import MyProfile from './profileManagement/myProfile';
import GymListings from './gyms/gymListings';
import GymDetails from './gyms/gymDetails';
import GymRegister from './gyms/gymRegister';

function App() {
  return (
    <div className="App">
      	<BrowserRouter>
			<Routes>
				<Route path="/" element = {<Home />} />
				<Route path="/register" element = {<Registration />} />
				<Route path="/profile/:id" element = {<Profile />} />
				<Route path="/myProfile" element = {<MyProfile />} />
				<Route path="/login" element = {<Login />} />
				<Route path="*" element= {<SignUpForm />}/>
				<Route path="/error" element= {<ErrorPage/>}/>
				<Route path="/findbuddy" element = {<FindBuddy/>}/>
				<Route path="/gymlistings" element = {<GymListings/>}/>
				<Route path="/gymdetails/:gym" element = {<GymDetails/>}/>
				<Route path="/gymRegister" element = {<GymRegister/>}/>
			</Routes>
		</BrowserRouter>   
    </div>
  );
}

export default App;
