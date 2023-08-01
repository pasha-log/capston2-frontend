import { Route, Routes } from 'react-router-dom';
import LoginForm from './features/authentication/components/LoginForm';
import SignupForm from './features/authentication/components/SignupForm';
import RequireAuth from './context/RequireAuth';
import Profile from './features/profile/components/Profile';
// import FileUploadForm from './features/post/components/FileUploadForm';
// import ImageCropForm from './features/post/components/ImageCropForm';
// import CaptionForm from './features/post/components/CaptionForm.js';
import Messaging from './features/messaging/components/Messaging';
import PostDetail from './features/post/components/PostDetail.js';
import HomePage from './pages/HomePage.js';
import ExplorePage from './pages/ExplorePage';
import EditProfileForm from './features/profile/components/EditProfileForm';
import EditProfilePhotoForm from './features/profile/components/EditProfilePhotoForm';

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
				path="/messages"
				element={
					<RequireAuth>
						<Messaging />
					</RequireAuth>
				}
			/>
			{/* <Route
				exact
				path="/upload"
				element={
					<RequireAuth>
						<FileUploadForm />
					</RequireAuth>
				}
			/> */}
			{/* <Route
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
			/> */}
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
			<Route
				exact
				path="/editProfileImage"
				element={
					<RequireAuth>
						<EditProfilePhotoForm />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};

export default InstapostRoutes;
