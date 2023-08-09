import { Input, Button, Form } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import '../assets/CaptionForm.css';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InstapostApi from '../../../Api';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';

const CaptionForm = () => {
	const navigate = useNavigate();
	const {
		currentUser,
		newPost,
		setNewPost,
		nprogress,
		s3Response,
		setCaptionPhase,
		setFileUploadPhase,
		setUploadModal,
		uploadModal,
		toggleDiscardModal
	} = useContext(CurrentUserContext);
	// const { state } = useLocation();
	// const { imageUrl, imageKey } = state;
	const { imageUrl, imageKey } = s3Response;
	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: currentUser.username,
			postURL: imageUrl,
			postKey: imageKey,
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
		setCaptionPhase(false);
		setFileUploadPhase(true);
		setUploadModal(!uploadModal);
		nprogress.done();
	};

	return (
		<div className="CaptionFormDiv">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className="CaptionFormContainer">
					<div className="ShareControls">
						<div className="CaptionFormHeader">
							<div className="GoBackButtonDiv">
								{/* <Button className="GoBack" onClick={() => navigate(-1)}> */}
								<Button className="GoBack" onClick={() => toggleDiscardModal()}>
									<span id="GoBack" className="material-symbols-outlined">
										arrow_back
									</span>
								</Button>
							</div>
							<div>
								<h2 className="NewCaptionPostLabel">Create New Post</h2>
							</div>
							<div className="PostButtonDiv">
								<Button className="PostButton" type="submit">
									Share
								</Button>
							</div>
						</div>
					</div>
					<div className="CaptionFormFlexContainer">
						<img className="PostImage" src={imageUrl} alt="" />
						<div className="CaptionWriteDiv">
							<div className="CaptionUserDetail">
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
					</div>
				</div>
			</Form>
		</div>
	);
};

export default CaptionForm;
