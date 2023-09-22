import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Post from './pages/Post/Post';
import NotFound from './pages/NotFound/NotFound';
import { Cookies, useCookies } from 'react-cookie';

function App() {
	const message = 'Hello ';
	const cookies = new Cookies();
	const [cookie, setCookie, removeCookie] = useCookies();
	const navigate = useNavigate();

	const Logout = () => {
		removeCookie('email', { path: '/' });
		removeCookie('password', { path: '/' });
		navigate('/');
	};

	return (
		<div className=' h-screen'>
			<div className='w-full flex justify-between align-middle  px-2 '>
				{cookies.cookies.email && (
					<p className='mt-2 bg-martian-darkgray text-center px-4 py-2 rounded-lg text-martian-lightgray'>
						{cookies.cookies.email}
					</p>
				)}
				{cookies.cookies.email && cookies.cookies.password && (
					<p
						className='px-4 py-2 mt-2 bg-martian-red rounded-lg text-martian-lightgray cursor-pointer hover:bg-martian-darkgray'
						onClick={Logout}
					>
						Logout
					</p>
				)}
			</div>
			<Routes>
				<Route path='/' element={<Login message={message} />} />
				<Route path='app' element={<Home message={message} />} />
				<Route path='post/:id' element={<Post message={message} />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
