import './App.css';
import { BrowserRouter } from 'react-router-dom';
import InstapostRoutes from './Routes';
import InstapostApi from './Api';
import { useEffect, useState } from 'react';
import CurrentUserContext from './CurrentUserContext';
import useLocalStorage from './hooks/useLocalStorage';
import NavBar from './NavBar';

function App() {
	const [ currentUser, setCurrentUser ] = useState();
	const [ storedValue, setValue ] = useLocalStorage();

	useEffect(
		() => {
			const getUserByUsername = async (username) => {
				InstapostApi.token = storedValue.token;
				let user = await InstapostApi.getUser(username);
				// console.log(user);
				setCurrentUser(user);
			};

			storedValue ? getUserByUsername(storedValue.username) : console.log('Logged out');
		},
		[ storedValue ]
	);

	const setTokenAfterRegister = async (data, username) => {
		let response = await InstapostApi.registerUser(data);
		if (response.token) {
			setValue({ token: response.token, username: username });
			InstapostApi.token = response.token;
			setCurrentUser(username);
			return true;
		} else {
			return response;
		}
	};

	const setTokenAfterLogin = async (data, username) => {
		let response = await InstapostApi.loginUser(data);
		if (response.token) {
			setValue({ token: response.token, username: username });
			InstapostApi.token = response.token;
			setCurrentUser(username);
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
					<NavBar />
					<main>
						<InstapostRoutes
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
