import { Input, Button, Form, FormGroup, Col } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import '../assets/EditProfileForm.css';
import { useContext, useState } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../../../components/form/Alert';
import Footer from '../../../layouts/Footer';

const EditProfileForm = () => {
	const [ response, setResponse ] = useState(false);
    const navigate = useNavigate();
	const { currentUser, editProfileInfo, nprogress, toggleUploadModal } = useContext(CurrentUserContext);
	nprogress.done();
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
		nprogress.start();
		let success = await editProfileInfo(data);
        console.log(success);
		if (success === true) {
			setResponse(true);
			navigate(`/${data.username}`);
			nprogress.done();
		} else {
			setResponse(success);
			nprogress.done();
		}
	};

	return (
		<div className='EditProfilePage'>
			<div className="EditProfileDiv">
				<h1 style={{marginTop: "2rem"}}>Edit Profile</h1>
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
											<div className="EditImage">
												<img src={currentUser?.profileImageURL} alt="" />
											</div>
										</div>
									</div>
									<h3>
										{currentUser?.username}
										<br />
										{/* <Link className="ChangeProfilePhoto" to={"/editProfileImage"} state={{ prevPath: "/edit" }}> */}
										<Link className="ChangeProfilePhoto" onClick={() => toggleUploadModal()} state={{ prevPath: "/edit" }}>
											Change profile photo
										</Link>
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
								{response !== false && response !== true && typeof response === 'object' ? (
									response.map((r) => <Alert formType={'edit'} type="danger" message={r} />)
								) : response !== false && response !== true && typeof response === 'string' ? (
									<Alert formType={'edit'} type="danger" message={response} />
								) : null}
								<Button className="EditProfileButton" type="submit" size="md">
									Submit
								</Button>
							</div>
						</Col>
					</FormGroup>
				</Form>
			</div>
			<Footer isEditProfile={true} />
		</div>
	);
};

export default EditProfileForm;
