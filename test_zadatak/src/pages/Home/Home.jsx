import React from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-configure';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItem from '../../components/PostItem';
import { Cookies } from 'react-cookie';
import { isEmpty } from '../../helpers';

const componentName = 'Home';

const Home = ({ message }) => {
	console.log(`${message} ${componentName}`);
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [posts, setPosts] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [more, setMore] = useState(15);
	const cookies = new Cookies();

	const getPosts = async () => {
		setLoading(true);
		try {
			const data = await axios.get('/posts');
			const userInfo = await axios.get('/users');

			let improvedPostsArray = data.data.map((item) => {
				let name = userInfo.data.find((u) => {
					if (u.id === item.userId) {
						return u.name;
					}
				}).name;
				return { ...item, name };
			});

			setPosts(improvedPostsArray);
			setError(false);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isEmpty(cookies.cookies)) {
			navigate('/');
		} else {
			getPosts();
		}
	}, []);

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			searchPostsByUser();
		}
	};

	const searchPostsByUser = async () => {
		if (searchValue === '') {
			getPosts();
			return;
		}

		let newArray = posts.filter((post) => {
			let name = post.name.toLowerCase();
			return name.search(searchValue.toLowerCase()) > -1;
		});

		setPosts(newArray);
	};

	const handleViewPost = (id) => {
		navigate(`/post/${id}`);
	};

	if (error) {
		return (
			<div className=' text-martian-red text-xl text-center py-12 flex justify-center flex-col align-middle gap-4 mx-auto w-2/12 '>
				<p className='text-md'>Error loading data.</p>
				<button
					className=' bg-martian-red text-martian-lightgray rounded-lg py-2 hover:bg-martian-gray'
					onClick={getPosts}
				>
					Try again
				</button>
			</div>
		);
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className=''>
			<p className='text-center py-4 text-4xl flex justify-center align-middle'>
				Posts
			</p>
			<div className='flex justify-end align-middle'>
				<div className='relative w-3/12 mr-4'>
					<div
						className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'
						onClick={() => {}}
					>
						<svg
							className='w-4 h-4 text-martian-red'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 20 20'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
							/>
						</svg>
					</div>
					<input
						onKeyDown={handleKeyDown}
						type='search'
						id='default-search'
						className='bg-martian-gray w-full p-4 pl-10 text-sm text-martian-dark border border-martian-lightgray rounded-lg focus:outline:none hover:outline-none'
						placeholder='Search'
						required
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
			</div>
			<div className=' items-center justify-center flex flex-col cursor-pointer w-full'>
				{posts &&
					posts.map((item, i) => {
						if (i >= more) {
							return null;
						} else {
							return (
								<PostItem
									message={message}
									key={item.id}
									id={item.id}
									title={item.title}
									body={item.body}
									user={item.name}
									callBackFunc={(item) => {
										handleViewPost(item);
									}}
								/>
							);
						}
					})}
				{posts && posts.length - 10 > 0 && (
					<div
						className='px-4 py-2 text-center bg-martian-darkgray text-martian-lightgray mb-10 rounded-lg'
						onClick={() => setMore((prev) => prev + 10)}
					>
						Load More
					</div>
				)}
			</div>
		</div>
	);
};

Home.propTypes = {
	message: PropTypes.string,
};

export default Home;
