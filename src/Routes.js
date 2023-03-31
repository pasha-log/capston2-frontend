import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import RequireAuth from './RequireAuth';
import Profile from './Profile';
import FileUploadForm from './FileUploadForm';
import ImageCropForm from './ImageCropForm';
import CaptionForm from './CaptionForm.js';
import PostDetail from './PostDetail.js';
import HomePage from './HomePage.js';
import ExplorePage from './ExplorePage';
import EditProfileForm from './EditProfileForm';

const InstapostRoutes = ({ setTokenAfterLogin, setTokenAfterRegister, setShowNav }) => {
	return (
		<Routes>
			<Route
				exact
				path="/login"
				element={<LoginForm setTokenAfterLogin={setTokenAfterLogin} setShowNav={setShowNav} />}
			/>
			<Route
				exact
				path="/signup"
				element={<SignupForm setTokenAfterRegister={setTokenAfterRegister} setShowNav={setShowNav} />}
			/>
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
				path="/upload"
				element={
					<RequireAuth>
						<FileUploadForm />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/crop"
				element={
					<RequireAuth>
						<ImageCropForm />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/caption"
				element={
					<RequireAuth>
						<CaptionForm />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/posts/:postId"
				element={
					<RequireAuth>
						<PostDetail />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/"
				element={
					<RequireAuth>
						<HomePage />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/search"
				element={
					<RequireAuth>
						<ExplorePage />
					</RequireAuth>
				}
			/>
			<Route
				exact
				path="/edit"
				element={
					<RequireAuth>
						<EditProfileForm />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};

export default InstapostRoutes;
