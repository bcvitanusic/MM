import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const componentName = 'Login';

const Login = ({ message }) => {
	console.log(`${message} ${componentName}`);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cookies, setCookie] = useCookies(['user']);
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		setCookie('email', email, { path: '/' });
		setCookie('password', password, { path: '/' });
		navigate('/app');
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<a
					href='#'
					className='flex items-center mb-6 text-2xl font-semibold text-martian-red dark:text-white'
				>
					M&M
				</a>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Sign in to your account
						</h1>

						<form
							className='space-y-4 md:space-y-6'
							action='#'
							onSubmit={(e) => onSubmit(e)}
						>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
									required
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Password
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required
									minLength={8}
									onChange={(e) => setPassword(e.target.value)}
									value={password}
								/>
							</div>

							<button
								type='submit'
								className='w-full text-martian-lightgray bg-martian-red hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

Login.propTypes = {
	message: PropTypes.string,
};

export default Login;
