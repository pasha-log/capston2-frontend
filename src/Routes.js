import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
// import SignupForm from './SignupForm';
import RequireAuth from './RequireAuth';

const InstagramRoutes = ({ setTokenAfterLogin, setTokenAfterRegister }) => {
	return (
		<Routes>
			<Route exact path="/login" element={<LoginForm setTokenAfterLogin={setTokenAfterLogin} />} />
			{/* <Route exact path="/signup" element={<SignupForm setTokenAfterRegister={setTokenAfterRegister} />} /> */}
			<Route
				exact
				path="/:username"
				element={
					<RequireAuth>
						<Profile />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};

export default InstagramRoutes;
