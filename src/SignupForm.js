import { Input, Button, Form, FormGroup, Col } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './SignupForm.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert.js';

const SignupForm = ({ setTokenAfterRegister }) => {
	const navigate = useNavigate();
	const [ response, setResponse ] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			email: '',
			fullName: '',
			username: '',
			password: ''
		}
	});

	const onSubmit = async (data) => {
		let success = await setTokenAfterRegister(data, data.username);
		if (success === true) {
			navigate(`/${data.username}`);
		} else {
			setResponse(success);
			reset();
		}
	};
	return (
		<div className="SignupFormDiv">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					<Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					>
						<div className="SignupFormContainer">
							<h1 className="SignupLogo">Instapost</h1>
							<div className="Email">
								<Controller
									name="email"
									control={control}
									render={({ field }) => <Input type="email" placeholder="Email" {...field} />}
								/>
							</div>
							<div className="Fullname">
								<Controller
									name="fullName"
									control={control}
									render={({ field }) => <Input placeholder="Firstname" {...field} />}
								/>
							</div>
							<div className="Username">
								<Controller
									name="username"
									control={control}
									render={({ field }) => <Input placeholder="Username" {...field} />}
								/>
							</div>
							<div className="Password">
								<Controller
									name="password"
									control={control}
									render={({ field }) => <Input type="password" placeholder="Password" {...field} />}
								/>
							</div>
							<Button className="SignupButton" type="submit" size="lg">
								Sign up
							</Button>
							{response !== false ? <Alert type="danger" message={response[0]} /> : null}
						</div>
					</Col>
				</FormGroup>
				<div>
					<p>
						Have an account?{' '}
						<Link className="LoginLink" to={'/login'}>
							Log in
						</Link>
					</p>
				</div>
				<div className="AuthorNoteDivSignup">
					<span className="AuthorNoteSpan">
						<span className="material-symbols-outlined">copyright </span>
						2023 Instapost From{' '}
						<Link className="Github" to={'https://github.com/pasha-log'}>
							Pasha Loguinov
						</Link>
					</span>
				</div>
			</Form>
		</div>
	);
};

export default SignupForm;
