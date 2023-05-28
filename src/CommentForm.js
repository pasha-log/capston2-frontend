import './assets/CommentForm.css';
import InstapostApi from './Api';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { Input, Button, Form, FormGroup } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

const CommentForm = ({ postId, newComment, setNewComment }) => {
	const { storedValue, innerCommentHTML, newReply } = useContext(CurrentUserContext);
	const { control, handleSubmit, reset, formState: {isDirty, isValid}, setValue, watch } = useForm({
		mode: "onChange",
		defaultValues: {
			username: storedValue?.username,
			postId: postId,
			parentId: null,
			message: ''
		}
	});

	useEffect(
		() => {
            const setReplyValues = (innerCommentHTML) => {
				if (innerCommentHTML?.postId === postId) {
					setValue("message", innerCommentHTML?.username)
					setValue("parentId", innerCommentHTML?.parentId)
				}
            }
            setReplyValues(innerCommentHTML)
    }, [ newReply ]);

	const onSubmit = async (data) => {
		await InstapostApi.createComment(data);
        setNewComment(newComment + 1);
        reset();

	};

	return (
		<div className='CommentContainer'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
						<div className="CommentFormContainer">
							<div className="Message">
								<Controller
									name="message"
									control={control}
									render={({ field }) => (
										<Input	
											id={postId}																	
											className="Message"
											type="text"
											placeholder="Add a comment..."
											{...field}
										/>
									)}
								/>
							</div>
							<Button disabled={!isDirty || !isValid || watch("message") === ''} className="PostComment">Post</Button>
						</div>
				</FormGroup>
			</Form>
		</div>
	);
};

export default CommentForm;
