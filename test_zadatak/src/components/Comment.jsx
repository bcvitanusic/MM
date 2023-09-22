import React from 'react';
import PropTypes from 'prop-types';

const componentName = 'Comment';

const Comment = ({ body, email, name, message }) => {
	console.log(`${message} ${componentName}`);

	return (
		<div className='px-12 w-full bg-martian-gray py-4 flex justify-center flex-col gap-1 rounded-lg shadow-martian-dark shadow-md'>
			<div className='text-left italic text-xs text-martian-red'>{email}</div>
			<div className=' font-bold text-sm'>{name}</div>
			<div className='bg-martian-lightgray px-4 py-2 rounded-lg text-martian-dark text-xs'>
				{body}
			</div>
		</div>
	);
};

Comment.propTypes = {
	body: PropTypes.string,
	email: PropTypes.string,
	name: PropTypes.string,
	message: PropTypes.string,
};

export default Comment;
