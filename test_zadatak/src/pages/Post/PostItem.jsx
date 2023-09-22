import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-configure';
import Comment from './Comment';

const componentName = 'PostItem';

const PostItem = ({ id, title, body, callBackFunc, message, user }) => {
	console.log(`${message} ${componentName}`);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [comments, setComments] = useState([]);
	const [showCommentsUnderPost, setShowCommentsUnderPost] = useState(false);

	const showComments = async () => {
		setLoading(true);
		try {
			const data = await axios.get(`/posts/${id}/comments`);

			setComments(data.data);
			setError(false);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className=' mx-4 my-2 flex  items-center justify-center text-center flex-col border-martian-red gap-2'
			key={id}
		>
			{user && (
				<p className='text-sm italic text-left w-full font-bold'>{user}</p>
			)}
			<p className=' text-xl text-martian-dark'>{title}</p>
			<p
				onClick={() => callBackFunc(id)}
				className=' cursor-pointer shadow-lg shadow-martian-gray px-5 py-6 bg-martian-red rounded-lg text-martian-lightgray hover:bg-martian-darkgray'
			>
				{body}
			</p>
			{loading && (
				<p className='text-right w-full text-xs px-4 py-2 italic cursor-pointer'>
					loading...
				</p>
			)}
			<div
				className='text-right w-full text-xs px-4 py-2 italic cursor-pointer'
				onClick={showComments}
			>
				{showCommentsUnderPost ? (
					<p onClick={() => setShowCommentsUnderPost(false)}>Close comments</p>
				) : (
					<p onClick={() => setShowCommentsUnderPost(true)}>Show comments</p>
				)}
			</div>

			{error && (
				<div className=' w-11/12 rounded-lg px-12 pb-12 flex flex-col gap-4 italic'>
					Error loading comments.
				</div>
			)}

			{comments.length > 0 && showCommentsUnderPost && (
				<div className=' w-11/12 rounded-lg px-12 pb-12 flex flex-col gap-4 '>
					{comments.map((item) => {
						return (
							<Comment
								key={item.id}
								body={item.body}
								email={item.email}
								name={item.name}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

PostItem.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	callBackFunc: PropTypes.func,
	message: PropTypes.string,
};

export default PostItem;
