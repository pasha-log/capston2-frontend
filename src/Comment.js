import InstapostApi from "./Api"
import { useEffect, useState } from "react";
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Comment.css';
import { Link } from "react-router-dom";
import CommentHeart from "./CommentHeart";

const Comment = ({comment}) => {
    const [ user, setUser ] = useState(null);
    const { currentUser } = useContext(CurrentUserContext);

    useEffect(
		() => {
            const getUserInfo = async (username) => {
                const user = await InstapostApi.getUser(username);
                setUser(user);
            }
            (comment?.username === currentUser?.username) ? setUser(null) : getUserInfo(comment?.username);
    }, []);

    var date = new Date(comment?.createdAt)
	var dt = date.toDateString();

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
                    <CommentHeart id={comment?.commentId} likeType={'comment'} />
                </div>
            </div>
            <div className="PostCommentActions FlexRow">
                <span className="CommentAction">{dt}</span>
                <span className="CommentAction">Likes</span>
                <span style={{cursor: "pointer"}}>Reply</span>
            </div>
        </div>
    )
}

export default Comment;