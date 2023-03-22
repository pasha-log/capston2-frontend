import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class InstapostApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${InstapostApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			// throw Array.isArray(message) ? message : [ message ];
			return message;
		}
	}

	// Individual API routes

	// Register someone in with this function, that should return a token.

	static async registerUser(registerInfo) {
		let response = await this.request('auth/register', registerInfo, 'post');
		InstapostApi.token = response.token;
		return response;
	}

	// Log someone in with this function, that should return a token.

	static async loginUser(loginInfo) {
		let response = await this.request('auth/token', loginInfo, 'post');
		InstapostApi.token = response.token;
		return response;
	}

	// Get user by username.

	static async getUser(username) {
		let response = await this.request(`users/${username}`);
		return response.user;
	}

	// Upload new post.

	static async uploadPost(postData) {
		// postData is the File
		console.log(postData);

		const form = new FormData();
		form.append('single', postData);

		let response = await axios({
			url: `http://localhost:3001/users/upload`,
			method: 'post',
			data: form,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		console.log(response);
		return response.post;
	}
}

export default InstapostApi;
