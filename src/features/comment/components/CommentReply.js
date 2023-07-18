import Comment from './Comment';
import timeSincePosted from '../../../utils/timeSincePosted';

const CommentReply = ({ comment, focus, postId }) => {
	var date = timeSincePosted(comment.created_at);
	return (
		<div>
			<Comment postId={postId} focus={focus} comment={comment} key={comment.commentId} date={date} />
		</div>
	);
};

export default CommentReply;

/**
 * @current_bugs
 * - Number of likes need to be under the heart 
 * - Font of action buttons should be bolder
 * - Should have option of hiding and showing replies
 */
