import { useForm } from 'react-hook-form';
import { Container, Form, Button, FormGroup, Col } from 'reactstrap';
// import { Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Alert from './Alert.js';
import InstapostApi from './Api';
// import { useContext } from 'react';
// import CurrentUserContext from './CurrentUserContext';
import './FileUploadForm.css';

const FileUploadForm = () => {
	// const { showModal } = useContext(CurrentUserContext);
	// if (!showModal) {
	// 	return null;
	// }
	const { register, handleSubmit } = useForm();

	const navigate = useNavigate();

	const upload = async (data) => {
		console.log(data);
		let response = await InstapostApi.uploadPost(data);
		return response;
	};

	const onSubmit = async (data) => {
		console.log(data.file[0]);
		const response = await upload(data.file[0]);
		navigate('/caption', { state: { imageUrl: response.result.Location } });
	};

	return (
		<Container>
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
						<Form className="FileUpload" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
							<input className="File" type="file" {...register('file', { required: true })} />
							<br />
							<Button className="Submit">Next</Button>
						</Form>
					</div>
					{/* ) : null} */}
				</Col>
			</FormGroup>
		</Container>
	);
};

export default FileUploadForm;
