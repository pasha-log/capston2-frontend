import { useParams, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './PostDetail.css';
import { useEffect, useState } from 'react';
import InstapostApi from './Api';
import Comment from './Comment';
import CommentForm from './CommentForm';

const PostDetail = () => {
	const { postId } = useParams();
	const { currentUser } = useContext(CurrentUserContext);
	const { state } = useLocation();

	const { imageURL, caption } = state;

    const [postComments, setPostComments] = useState();
    const [newComment, setNewComment] = useState(0);

    useEffect(
		() => {
			const getPostComments = async (id) => {
				let response = await InstapostApi.getPostComments(id);
				setPostComments(response);
                console.log(response)
                console.log(postComments)
			};

			getPostComments(postId);
		},
		[ newComment, postId ]
	);

	return (
        // https://www.geeksforgeeks.org/instagram-clone-using-html-css/
		<main>
			<div className="PostDetailContainer">
				<div className="col-9">
					<div className="card">
						<div className="top">
							<div className="userDetails">
								<div className="profilepic">
									<div className="profile_img">
										<div className="image">
											<img
												src="https://instagram-clone-photo.s3.us-west-1.amazonaws.com/uploads/46499ef0-8acb-4511-ba9e-a0cd13f233f0-20220812_195736.jpg"
												alt="img8"
											/>
										</div>
									</div>
								</div>
								<h3>
									<span>{currentUser?.username}</span>
								</h3>
							</div>
							<div>
								<span className="dot">
									<i className="fas fa-ellipsis-h" />
								</span>
							</div>
						</div>
						<div className="imgBx">
							<img
								src={imageURL}
								alt={postId}
								className="cover"
							/>
						</div>
						<div className="bottom">
							<div className="actionBtns">
								<div className="left">
									<span className="heart">
										<span>
											<svg
												aria-label="Like"
												color="#FFFFFF"
												fill="#FFFFFF"
												height="24"
												role="img"
												viewBox="0 0 48 48"
												width="24"
											>
												<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 
                                                11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 
                                                41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 
                                                11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 
                                                1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 
                                                1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 
                                                1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 
                                                0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 
                                                1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 
                                                1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 
                                                7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 
                                                48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
											</svg>
										</span>
									</span>
									<svg
										aria-label="Comment"
										className="_8-yf5 "
										color="#FFFFFF"
										fill="#FFFFFF"
										height="24"
										role="img"
										viewBox="0 0 48 48"
										width="24"
									>
										<path
											clipRule="evenodd"
											d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 
                                        11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 
                                        7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 
                                        4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 
                                        8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 
                                        2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 
                                        44.5 12.7 44.5 24z"
											fillRule="evenodd"
										/>
									</svg>
								</div>
								<div className="right">
									<svg
										aria-label="Save"
										className="_8-yf5 "
										color="#FFFFFF"
										fill="#FFFFFF"
										height="24"
										role="img"
										viewBox="0 0 48 48"
										width="24"
									>
										<path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 
                                        47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 
                                        3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 
                                        1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 
                                        0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 
                                        1.4-.9 2.2-.9z" />
									</svg>
								</div>
							</div>
                            <div>
								<p className="likes">Liked by 203 others</p>
                            </div>
                            <div>
								<p className="message">
									<b>{currentUser?.username}</b>
                                    {caption}
								</p>
                            </div>
                            {!postComments ? null : postComments?.map((comment) => (<Comment comment={comment} />))}
							<div className="addComments">
								<div className="reaction">
									<h3>
										<i className="far fa-smile" />
									</h3>
								</div>
                                <CommentForm postId={postId} newComment={newComment} setNewComment={setNewComment} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
        // https://www.geeksforgeeks.org/instagram-clone-using-html-css/
	);
};

export default PostDetail;
