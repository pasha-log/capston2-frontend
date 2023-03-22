import { useForm } from 'react-hook-form';
import { Container } from 'reactstrap';
// import { Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Alert from './Alert.js';
import InstagramApi from './Api';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const FileUploadForm = () => {
	const { register, handleSubmit } = useForm();
	const { currentUser } = useContext(CurrentUserContext);

	const navigate = useNavigate();
	// const [ response, setResponse ] = useState(false);
	// const { register, control, handleSubmit, reset } = useForm({
	// 	defaultValues: {
	// 		username: `${currentUser.username}`,
	// 		caption: '',
	// 		watermark: null,
	// 		watermarkFont: null,
	// 		filter: null
	// 	}
	// });

	const upload = async (data) => {
		console.log(data);
		let response = await InstagramApi.uploadPost(data);
		if (response) {
			console.log(response);
			return true;
		} else {
			return response;
		}
	};

	const onSubmit = async (data) => {
		// console.log(data.postURL[0]);
		console.log(data.file[0]);
		const success = await upload(data.file[0]);
		if (success === true) {
			navigate(`/${currentUser.username}`);
		}
		// } else {
		// 	setResponse(success);
		// 	// reset();
		// }
	};

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
				<input type="file" {...register('file', { required: true })} />
				<button>Submit</button>
			</form>
		</Container>
	);
};

export default FileUploadForm;
