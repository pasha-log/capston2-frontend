import Comment from './Comment';
// import { useContext } from 'react';
// import CurrentUserContext from './CurrentUserContext';

const CommentReply = ({ comment, focus, postId, forceUpdate }) => {
	const dateFormatter = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'medium',
		timeStyle: 'short'
	});
	var date = dateFormatter.format(Date.parse(comment.created_at));
	return (
		<div>
			<Comment
				postId={postId}
				focus={focus}
				forceUpdate={forceUpdate}
				comment={comment}
				key={comment.commentId}
				date={date}
			/>
		</div>
	);
};

export default CommentReply;

/**
 * @current_bugs
 * - Reply comment like count isn't updating
 * - Timestamps should reflect how many weeks ago it's been since posted
 * - Number of likes need to be under the heart 
 * - Font of action buttons should be bolder
 * - Should have option of hiding and showing replies
 */
