import { Input, Button, Form, FormGroup, Col, Row } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './assets/CaptionForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import InstapostApi from './Api';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const CaptionForm = () => {
	const navigate = useNavigate();
	const { currentUser, newPost, setNewPost, nprogress } = useContext(CurrentUserContext);
	const { state } = useLocation();
	const { imageUrl } = state;
	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: currentUser.username,
			postURL: imageUrl,
			caption: '',
			watermark: null,
			watermarkFont: null,
			filter: null
		}
	});

	const onSubmit = async (data) => {
		nprogress.start();
		await InstapostApi.createPost(data);
		setNewPost(newPost + 1);
		navigate(`/${currentUser.username}`);
		nprogress.done();
	};

	return (
		<div className="CaptionFormDiv">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					<Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					>
						<div className="CaptionFormContainer">
							<div className="ShareControls">
								<Row>
									<Col>
										<Button className="GoBack" onClick={() => navigate(-1)}>
											<span id="GoBack" className="material-symbols-outlined">
												arrow_back
											</span>
										</Button>
									</Col>
									<Col>
										<h1 className="NewCaptionPostLabel">Create New Post</h1>
									</Col>
									<Col>
										<Button className="PostButton" type="submit" size="sm">
											Share
										</Button>
									</Col>
								</Row>
							</div>
							<img className="PostImage" src={imageUrl} alt="" />
							<div>
								<img className="CaptionProfileImage" src={currentUser.profileImageURL} alt="" />
								<span className="CaptionUsername">{currentUser.username}</span>
							</div>
							<div className="Caption">
								<Controller
									name="caption"
									control={control}
									render={({ field }) => (
										<Input
											className="Caption"
											type="textarea"
											placeholder="Write a caption..."
											{...field}
										/>
									)}
								/>
							</div>
						</div>
					</Col>
				</FormGroup>
			</Form>
		</div>
	);
};

export default CaptionForm;
