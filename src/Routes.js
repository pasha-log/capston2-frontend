import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import RequireAuth from './RequireAuth';
import Profile from './Profile';
import FileUploadForm from './FileUploadForm';

const InstapostRoutes = ({ setTokenAfterLogin, setTokenAfterRegister }) => {
	return (
		<Routes>
			<Route exact path="/login" element={<LoginForm setTokenAfterLogin={setTokenAfterLogin} />} />
			<Route exact path="/signup" element={<SignupForm setTokenAfterRegister={setTokenAfterRegister} />} />
			<Route
				exact
				path="/:username"
				element={
					<RequireAuth>
						<Profile />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/create"
				element={
					<RequireAuth>
						<FileUploadForm />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};

export default InstapostRoutes;
