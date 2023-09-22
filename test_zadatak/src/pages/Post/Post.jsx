import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios-configure';
import PostItem from './PostItem';
import { isEmpty } from '../../helpers';
import { Cookies } from 'react-cookie';

const componentName = 'Post';

const Post = ({ message }) => {
	console.log(`${message} ${componentName}`);
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const cookies = new Cookies();
	const navigate = useNavigate();
	let { id } = useParams();

	const getPost = async () => {
		setLoading(true);
		try {
			const data = await axios.get(`/posts/${id}`);
			const userInfo = await axios.get('/users');
			setPost(data.data);
			let users = userInfo.data;
			let commenter = users.find((x) => x.id === data.data.userId);
			setUser(commenter);
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
			getPost();
		}
	}, []);

	if (error) {
		return (
			<div className='bg-martian-gray text-martian-red text-xl'>
				Error loading data.
			</div>
		);
	}

	if (loading || post === null) {
		return <p className='flex items-center justify-center'>Loading...</p>;
	}

	return (
		<div className='mx-10'>
			<p
				className='my-4 py-2 px-4 bg-martian-gray text-center w-48 rounded-md hover:bg-martian-darkgray cursor-pointer'
				onClick={() => navigate('/app')}
			>
				Back to posts
			</p>
			<PostItem
				key={post.id}
				id={post.id}
				title={post.title}
				body={post.body}
				message={message}
				user={user.name}
				callBackFunc={() => {}}
			/>
		</div>
	);
};

Post.propTypes = { message: PropTypes.string };

export default Post;
