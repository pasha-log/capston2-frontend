import { useForm } from 'react-hook-form';
import { Form, FormGroup, Col } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/FileUploadForm.css';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
// import { Modal, ModalBody } from 'reactstrap';
// import ReactDOM from 'react-dom';

const FileUploadForm = () => {
	// const {toggleUploadModal, uploadModal, toggleCropModal, nprogress, upload, currentUser, editProfileInfo, setInnerCommentHTML } = useContext(CurrentUserContext);
	const { nprogress, upload, currentUser, editProfileInfo, setInnerCommentHTML, setFileUpload, setFileUploadPhase, setImageCropPhase } = useContext(CurrentUserContext);

	setInnerCommentHTML();
	
	nprogress.done();

	const { register } = useForm();

	const navigate = useNavigate();

	const { state } = useLocation();

	const handleSelectedInput = async (event) => {
		nprogress.start();
		if (state?.prevPath) {
			const response = await upload(event.target.files[0])
			let defaultValues = {
				profileImageURL: response.result.Location,
				fullName: currentUser?.fullName,
				username: currentUser?.username,
				bio: currentUser?.bio,
				email: currentUser?.email
			}
			await editProfileInfo(defaultValues);
			navigate(`/${currentUser?.username}`);
			nprogress.done();
		} else {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener('load', () => {
				// navigate('/crop', { state: { imageUrl: reader.result, id: event.target.files[0].name } });
				setFileUpload({ imageUrl: reader.result, id: event.target.files[0].name })
				setFileUploadPhase(false);
				setImageCropPhase(true);
				nprogress.done();
			});
		}
	};

	return (
		<div className="UploadFormDiv">
			{/* <Modal isOpen={uploadModal} toggle={toggleUploadModal} centered={true} size={'md'}>
				<ModalBody className="ModalBody "> */}

			{/* <FormGroup row>
				<Col
					md={{
						offset: 3,
						size: 6
					}}
					sm="12"
					> */}
					<div className="UploadFormContainer">
						<h1 className="NewPostLabel">Create New Post</h1>
						<div className="GalleryIcon">
							<span id="GalleryIcon" className="material-symbols-outlined">
								gallery_thumbnail
							</span>
							<p>Upload Photos Here</p>
						</div>
						<Form className="FileUpload" onChange={handleSelectedInput} encType="multipart/form-data">
							<label htmlFor="File" className="CustomFileUpload">
								Select from computer
							</label>
							<input id="File" className="File" type="file" {...register('file', { required: true })} />
						</Form>
					</div>
				{/* </Col>
			</FormGroup> */}
					{/* </ModalBody>
			</Modal> */}
		</div>
	);
};

export default FileUploadForm;
