import { Input, Button, Form, FormGroup, Col } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './assets/SignupForm.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert.js';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';

const SignupForm = ({ setTokenAfterRegister }) => {
	const { nprogress } = useContext(CurrentUserContext);
	const navigate = useNavigate();
	document.body.style = 'background: #eee;';
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
		nprogress.start();
		let success = await setTokenAfterRegister(data, data.username);
		if (success === true) {
			navigate(`/${data.username}`);
			nprogress.done();
		} else {
			setResponse(success);
			reset();
			nprogress.done();
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
									render={({ field }) => (
										<Input
											className="EmailInput"
											autoComplete="on"
											type="email"
											placeholder="Email"
											{...field}
										/>
									)}
								/>
							</div>
							<div className="Fullname">
								<Controller
									name="fullName"
									control={control}
									render={({ field }) => (
										<Input
											className="FullnameInput"
											autoComplete="on"
											placeholder="Firstname"
											{...field}
										/>
									)}
								/>
							</div>
							<div className="Username">
								<Controller
									name="username"
									control={control}
									render={({ field }) => (
										<Input
											className="UsernameInput"
											autoComplete="on"
											placeholder="Username"
											{...field}
										/>
									)}
								/>
							</div>
							<div className="Password">
								<Controller
									name="password"
									control={control}
									render={({ field }) => (
										<Input
											className="PasswordInput"
											autoComplete="on"
											type="password"
											placeholder="Password"
											{...field}
										/>
									)}
								/>
							</div>
							<Button className="SignupButton" type="submit" size="lg">
								Sign up
							</Button>
							{response !== false && typeof response === 'object' ? (
								response.map((r) => <Alert formType={'auth'} type="danger" message={r} />)
							) : response !== false && typeof response === 'string' ? (
								<Alert formType={'auth'} type="danger" message={response} />
							) : null}
						</div>
					</Col>
				</FormGroup>
				<div>
					<p className="Login">
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
