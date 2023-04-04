import { useForm } from 'react-hook-form';
import { Form, FormGroup, Col } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import InstapostApi from './Api';
import './assets/FileUploadForm.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const FileUploadForm = () => {
	const { currentUser, editProfileInfo } = useContext(CurrentUserContext);

	const { register } = useForm();

	const navigate = useNavigate();

	const { state } = useLocation();

	const upload = async (data) => {
		console.log(data);
		let response = await InstapostApi.uploadPost(data);
		return response;
	};

	const handleSelectedInput = async (event) => {
		console.log(event.target.files[0]);
		const response = await upload(event.target.files[0]);
		console.log(response);
		if (state?.prevPath) { 
			let defaultValues = {
				profileImageURL: response.result.Location,				
				fullName: currentUser?.fullName,
				username: currentUser?.username,
				bio: currentUser?.bio,
				email: currentUser?.email
			}
			let success = await editProfileInfo(defaultValues);
			console.log(success);
			navigate(`/${currentUser?.username}`);
		} else {
			navigate('/caption', { state: { imageUrl: response.result.Location } }) 
		}
	};

	return (
		<div className="UploadFormDiv">
			<FormGroup row>
				<Col
					md={{
						offset: 3,
						size: 6
					}}
					sm="12"
				>
					<div className="UploadFormContainer">
						<h1 className="NewPostLabel">Create New Post</h1>
						<div className="Gallery">
							<span id="Gallery" className="material-symbols-outlined">
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
				</Col>
			</FormGroup>
		</div>
	);
};

export default FileUploadForm;
