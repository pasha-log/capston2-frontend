import InstapostApi from "./Api"
import { useEffect, useState } from "react";
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './Comment.css';

const Comment = ({comment}) => {
    const [user, setUser] = useState(null);
    const { currentUser } = useContext(CurrentUserContext);
    const [isActive, setActive] = useState("false");

    useEffect(
		() => {
            const getUserInfo = async (username) => {
                const user = await InstapostApi.getUser(username);
                setUser(user);
            }
            (comment?.username === currentUser?.username) ? setUser(null) : getUserInfo(comment?.username);
    }, []);

    const likeComment = () => {
        setActive(!isActive);
    }
    return (
        <div className="PostCommentItem">
            <div className="PostCommentRow FlexRow">
                {/* <div>
                    <img className="CommentProfilePhoto" src={'https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/46499ef0-8acb-4511-ba9e-a0cd13f233f0-20220812_195736.jpg'} alt="" />
                </div> */}
                <div>
                    <img className="CommentProfilePhoto" src={user ? user?.profileImageURL : currentUser?.profileImageURL} alt="" />
                </div>

                <span className="CommentUsername"><p><strong className="UsernameInComment">{comment?.username}</strong>{comment?.message}</p></span>
                <div className="CommentHeart">
                    <div className={isActive ? "heart is-active" : "heart"} onClick={likeComment}></div>
                </div>
            </div>
            <div className="PostCommentActions FlexRow">
                <span>Time</span>
                <span>Likes</span>
                <span style={{cursor: "pointer"}}>Reply</span>
            </div>
        </div>
    )
}

export default Comment;