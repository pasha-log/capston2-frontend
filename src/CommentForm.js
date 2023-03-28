import './CommentForm.css';
import InstapostApi from './Api';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { Input, Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

const CommentForm = ({ postId, newComment, setNewComment }) => {
	const { storedValue} = useContext(CurrentUserContext);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			username: storedValue?.username,
			postId: postId,
			parentId: null,
			message: ''
		}
	});

	const onSubmit = async (data) => {
		console.log(data)
		const response = await InstapostApi.createComment(data);
        setNewComment(newComment + 1);
        reset();

	};

	return (
		<div className='CommentContainer'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					{/* <Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					> */}
						<div className="CommentFormContainer">
							<div className="Message">
								<Controller
									name="message"
									control={control}
									render={({ field }) => (
										<Input
											className="Message"
											type="text"
											placeholder="Add a comment..."
											{...field}
										/>
									)}
								/>
							</div>
							<Button className="PostComment">Post</Button>
						</div>
					{/* </Col> */}
				</FormGroup>
			</Form>
		</div>
	);
};

export default CommentForm;
