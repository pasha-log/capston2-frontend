import InstapostApi from "./Api"
import { useEffect, useState } from "react";
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Comment.css';
import { Link } from "react-router-dom";
import CommentHeart from "./CommentHeart";

const Comment = ({comment, focus, postId, forceUpdate }) => {
    const [ user, setUser ] = useState(null);
    const { currentUser, setInnerCommentHTML } = useContext(CurrentUserContext);
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short"
	})

    useEffect(
		() => {
            const getUserInfo = async (username) => {
                const user = await InstapostApi.getUser(username);
                setUser(user);
            }
            (comment?.username === currentUser?.username) ? setUser(null) : getUserInfo(comment?.username);
    }, []);

    const handleCommentReplyClick = () => {
        setInnerCommentHTML({username: `@${comment?.username}`, postId: postId, parentId: comment?.commentId})
        forceUpdate();
        focus();
    }

    var dt = dateFormatter.format(Date.parse(comment?.createdAt))

    return (
        <div className="PostCommentItem">
            <div className="PostCommentRow FlexRow">
                <Link to={user ? `/${user?.username}` : `/${currentUser?.username}`}>
                    <div>
                        <img className="CommentProfilePhoto" src={user ? user?.profileImageURL : currentUser?.profileImageURL} alt="" />
                    </div>
                </Link>

                <span className="CommentUsername"><p><strong className="UsernameInComment">{comment?.username}</strong>{comment?.message}</p></span>
                <div className="CommentHeart">
                    <CommentHeart key={comment?.commentId} id={comment?.commentId} likeType={'comment'} />
                </div>
            </div>
            <div className="PostCommentActions FlexRow">
                <span className="CommentAction">{dt}</span>
                <span className="CommentAction">{comment?.numLikes === "1" ? '1 Like' : `${comment?.numLikes} Likes`}</span>
                <span onClick={handleCommentReplyClick} style={{cursor: "pointer"}}>Reply</span>
            </div>
        </div>
    )
}

export default Comment;