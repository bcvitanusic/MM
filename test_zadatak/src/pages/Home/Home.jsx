import React from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-configure';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItem from '../Post/PostItem';
import { Cookies } from 'react-cookie';
import { isEmpty } from '../../helpers';

const componentName = 'Home';

const Home = ({ message }) => {
	// console.log(`${message} ${componentName}`);
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const cookies = new Cookies();

	const getPosts = async () => {
		try {
			const data = await axios.get('/posts');
			const userInfo = await axios.get('/users');
			setUsers(userInfo.data);
			setPosts(data.data);
		} catch (error) {
			setError(true);
		} finally {
			setError(false);
		}
	};

	useEffect(() => {
		if (isEmpty(cookies.cookies)) {
			navigate('/');
		} else {
			getPosts();
		}
	}, []);

	const handleViewPost = (id) => {
		navigate(`/post/${id}`);
	};

	if (error) {
		return (
			<div className='bg-martian-gray text-martian-red text-xl'>
				Error loading data.
			</div>
		);
	}

	return (
		<div className=''>
			<p className='text-center py-4 text-4xl flex justify-center align-middle'>
				Posts
			</p>
			<div className=' items-center justify-center flex flex-col cursor-pointer'>
				{posts.map((item) => {
					let user = users.find((x) => x.id === item.userId);
					return (
						<PostItem
							key={item.id}
							id={item.id}
							title={item.title}
							body={item.body}
							user={user}
							callBackFunc={(item) => {
								handleViewPost(item);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

Home.propTypes = {
	message: PropTypes.string,
};

export default Home;
