import React from 'react';
import { Link } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import { isEmpty } from '../../helpers';

const NotFound = () => {
	const cookies = new Cookies();

	return (
		<div className='flex flex-col justify-center align-middle text-center py-6'>
			<h1>Oops! You seem to be lost.</h1>
			<p>Go back to:</p>
			{isEmpty(cookies.cookies) ? (
				<Link to='/' className='font-bold italic underline'>
					Login
				</Link>
			) : (
				<Link to='/app' className='font-bold italic underline'>
					Posts
				</Link>
			)}
		</div>
	);
};

export default NotFound;
