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

	// Upload new image to s3 bucket.

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
		return response.data;
	}

	// Add caption and save post to database.

	static async createPost(postData) {
		let response = await this.request(`users/create`, postData, 'post');
		return response.data;
	}

	// Get all comments associated with a post.

	static async getPostComments(postId) {
		let response = await this.request(`users/comments/${postId}`);
		console.log(response);
		return response.comments;
	}

	// Post a new comment to a post.

	static async createComment(commentData) {
		console.log(commentData);
		let response = await this.request(`users/comment`, commentData, 'post');
		return response.data;
	}

	// Follow another user.

	static async follow(usernameFollowing, usernameBeingFollowed) {
		let response = await this.request(`users/follow/${usernameFollowing}/${usernameBeingFollowed}`, 'post');
		return response.data;
	}

	// Find all followers not followed by current user.

	static async findAllUsers(name) {
		let response;
		name ? (response = await this.request(`users?name=${name}`)) : (response = await this.request(`users/`));
		console.log(response);
		return response;
	}

	// Find all posts from users that current user is following.

	static async getFollowingPosts(username) {
		let response = await this.request(`users/${username}/followerPosts/`);
		console.log(response.posts[0].createdAt);
		return response.posts;
	}
}

export default InstapostApi;
