import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const CommentHeart = ({ id, likeType }) => {
	const { currentUser, like, unlike } = useContext(CurrentUserContext);

	return (
		<>
			{(currentUser?.commentLikes.find((c) => c.commentId === id) ? (
				<IconButton key={id} onClick={() => unlike(currentUser?.username, id, likeType)}>
					<Favorite style={{ color: 'red', fontSize: '3rem' }} />
				</IconButton>
			) : (
				<IconButton key={id} onClick={() => like(currentUser?.username, id, likeType)}>
					<FavoriteBorder style={{ color: 'white', fontSize: '3rem' }} />
				</IconButton>
			))}
		</>
	);
};

export default CommentHeart;
