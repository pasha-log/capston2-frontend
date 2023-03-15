import './App.css';
import { BrowserRouter } from 'react-router-dom';
import InstagramRoutes from './Routes';
import InstagramApi from './Api';
import { useEffect, useState } from 'react';
import CurrentUserContext from './CurrentUserContext';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
	// Seed the real database with two users
	// Start with login/registration (LoginForm, SignupForm, LandingPage)
	// Build the profile page (ProfilePage, PostDetail)
	const [ currentUser, setCurrentUser ] = useState();
	const [ storedValue, setValue ] = useLocalStorage();

	useEffect(
		() => {
			const getUserByUsername = async (username) => {
				InstagramApi.token = storedValue.token;
				let user = await InstagramApi.getUser(username);
				setCurrentUser(user);
			};

			storedValue ? getUserByUsername(storedValue.username) : console.log('Logged out');
		},
		[ storedValue ]
	);

	const setTokenAfterRegister = async (data, username) => {
		let response = await InstagramApi.registerUser(data);
		if (response.token) {
			setValue({ token: response.token, username: username });
			return true;
		} else {
			return response;
		}
	};

	const setTokenAfterLogin = async (data, username) => {
		let response = await InstagramApi.loginUser(data);
		if (response.token) {
			setValue({ token: response.token, username: username });
			return true;
		} else {
			return response;
		}
	};

	// const logOutUser = () => {
	// 	setValue(null);
	// };

	return (
		<div className="App">
			<CurrentUserContext.Provider value={{ storedValue, currentUser }}>
				<BrowserRouter>
					{/* <NavBar logOutUser={logOutUser} /> */}
					<main>
						<InstagramRoutes
							setTokenAfterRegister={setTokenAfterRegister}
							setTokenAfterLogin={setTokenAfterLogin}
						/>
					</main>
				</BrowserRouter>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
