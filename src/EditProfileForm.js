import { Input, Button, Form, FormGroup, Col } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './EditProfileForm.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Alert from './Alert';

// profileImageURL, fullName, username, bio, email
const EditProfileForm = () => {
	// const [ response, setResponse ] = useState(false);
    const navigate = useNavigate();
	const { currentUser, editProfileInfo } = useContext(CurrentUserContext);
	const { control, handleSubmit } = useForm({
		defaultValues: {
			fullName: currentUser?.fullName,
			username: currentUser?.username,
			bio: currentUser?.bio,
			email: currentUser?.email
		}
	});

	const onSubmit = async (data) => {
        console.log(data)
		let success = await editProfileInfo(data);
        console.log(success);
        navigate(`/${currentUser?.username}`);
		// if (success === true) {
		// 	setResponse(true);
		// } else {
		// 	setResponse(success);
			// reset();
		// }
	};

	return (
		<div className="EditProfileDiv">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					<Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					>
						<div className="EditFormContainer">
							<div className="EditUserDetails">
								<div className="EditProfilePic">
									<div className="EditProfileImage">
										{/* <Link to={`/${user.username}`}> */}
										<div className="EditImage">
											<img src={currentUser?.profileImageURL} alt="" />
										</div>
										{/* </Link> */}
									</div>
								</div>
								<h3>
									{currentUser?.username}
									<br />
									<span className="EditUserCardFullName">{currentUser?.fullName}</span>
								</h3>
							</div>
							<div className="Fullname d-inline-flex align-items-center">
                                <aside>
                                    <label htmlFor='fullname'>Name</label>
                                </aside>
								<Controller
									name="fullName"
									control={control}
									render={({ field }) => <Input className='fullname' placeholder="fullname" {...field} />}
								/>
							</div>
                                <br/>
                                <div className='InputMessageParentParent'>
                                    <div className='InputMessageParent'>
                                        <div className='InputMessage'>
                                            Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                        </div>
                                    </div>
                                </div>
							<div className="Username d-inline-flex align-items-center">
                                <aside>
                                    <label htmlFor='username'>Username</label>
                                </aside>
								<Controller
									name="username"
									control={control}
									render={({ field }) => <Input className='username' placeholder="username" {...field} />}
								/>
							</div>
							<div className="Bio d-inline-flex align-items-center">
                                <aside>
                                    <label htmlFor='bio'>Bio</label>
                                </aside>
								<Controller
									name="bio"
									control={control}
									render={({ field }) => <Input className='bio' placeholder="bio" {...field} />}
								/>
							</div>
							<div className="Email d-inline-flex align-items-center">
                                <aside>
                                    <label htmlFor='email'>Email</label>
                                </aside>
								<Controller
									name="email"
									control={control}
									render={({ field }) => <Input className='email' type="email" placeholder="email" {...field} />}
								/>
							</div>
                            <br/>
                                <div className='InputMessageParentParent'>
                                    <div className='InputMessageParent'>
                                        <div className='InputMessage'>
                                            This email won't be shown to anyone except you.
                                        </div>
                                    </div>
                                </div>
							{/* {response === true ? <Alert type={'success'} message="Updated successfully." /> : null}
							{response !== false && response !== true ? (
								<Alert type="danger" message={response[0]} />
							) : null} */}
							<Button className="EditProfileButton" type="submit" size="md">
								Submit
							</Button>
						</div>
					</Col>
				</FormGroup>
			</Form>
		</div>
	);
};

export default EditProfileForm;
