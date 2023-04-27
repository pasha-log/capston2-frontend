import './assets/CommentForm.css';
import InstapostApi from './Api';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { Input, Button, Form, FormGroup } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

const CommentForm = ({ postId, newComment, setNewComment }) => {
	const { storedValue, innerCommentHTML } = useContext(CurrentUserContext);
	const { control, handleSubmit, reset, formState: {isDirty, isValid} } = useForm({
		mode: "onChange",
		defaultValues: {
			username: storedValue?.username,
			postId: postId,
			parentId: null,
			message: innerCommentHTML?.postId === postId ? innerCommentHTML?.username : ''
		}
	});

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
							<Button disabled={!isDirty || !isValid} className="PostComment">Post</Button>
						</div>
				</FormGroup>
			</Form>
		</div>
	);
};

export default CommentForm;
