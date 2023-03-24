import { Input, Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './LoginForm.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert.js';

const LoginForm = ({ setTokenAfterLogin, setShowNav }) => {
	setShowNav(false);
	document.body.style = 'background: white;';
	const navigate = useNavigate();
	const [ response, setResponse ] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			username: 'pashathecoder',
			password: 'password'
		}
	});

	const onSubmit = async (data) => {
		const success = await setTokenAfterLogin(data, data.username);
		if (success === true) {
			navigate(`/${data.username}`);
		} else {
			setResponse(success);
			reset();
		}
	};
	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					<Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					>
						<div className="LoginFormContainer">
							<h1 className="LoginLogo">Instapost</h1>
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
							{response !== false ? <Alert type="danger" message={response} /> : null}
							<Button className="LoginButton" type="submit" size="lg">
								Log in
							</Button>
						</div>
					</Col>
				</FormGroup>
			</Form>
			<div>
				<p className="Register">
					Don't have an account?{' '}
					<Link className="RegisterLink" to={'/signup'}>
						Sign up
					</Link>
				</p>
			</div>
			<div className="AuthorNoteDivLogin">
				<span className="AuthorNoteSpan">
					<span className="material-symbols-outlined">copyright </span>
					2023 Instapost From{' '}
					<Link className="Github" to={'https://github.com/pasha-log'}>
						Pasha Loguinov
					</Link>
				</span>
			</div>
		</Container>
	);
};

export default LoginForm;
