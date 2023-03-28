import { useForm } from 'react-hook-form';
import { Form, FormGroup, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import InstapostApi from './Api';
import './FileUploadForm.css';

const FileUploadForm = () => {
	// const { showModal } = useContext(CurrentUserContext);
	// if (!showModal) {
	// 	return null;
	// }
	const { register } = useForm();

	const navigate = useNavigate();

	const upload = async (data) => {
		console.log(data);
		let response = await InstapostApi.uploadPost(data);
		return response;
	};

	const handleSelectedInput = async (event) => {
		console.log(event.target.files[0]);
		const response = await upload(event.target.files[0]);
		navigate('/caption', { state: { imageUrl: response.result.Location } });
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
					{/* {showModal ? ( */}
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
					{/* ) : null} */}
				</Col>
			</FormGroup>
		</div>
	);
};

export default FileUploadForm;
