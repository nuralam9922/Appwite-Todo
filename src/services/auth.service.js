import { Client, Account, ID, Role } from 'appwrite';
import { APPWRITE_ENDPOINT, PROJECT_ID } from '../config/config';

class AuthService {
	constructor() {
		this.client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
		this.account = new Account(this.client);
		this.sessionId = null; // Initialize sessionId to null
	}

	async createAccount(email, password, name) {
		try {
			const userAccount = await this.account.create(ID.unique(), email, password, name);
			// console.log('userAccount', userAccount);
			if (userAccount) {
				return await this.login(email, password);
			}
			// return userAccount;
		} catch (error) {
			console.log('Error creating account:', error);
			throw error;
		}
	}

	async login(email, password) {
		console.log(email, password);
		try {
			const loggedInUser = await this.account.createEmailPasswordSession(email, password);
			localStorage.setItem('loggedInUserId', loggedInUser.$id);
			return loggedInUser;
		} catch (error) {
			console.log('Error logging in:', error);
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			if (localStorage.getItem('loggedInUserId')) {
				return await this.account.get();
			}
		} catch (error) {
			console.log('Error getting current user:', error);
			throw error;
		}
	}

	async logOut() {
		localStorage.setItem('loggedInUserId', '');

		try {
			await this.account.deleteSessions();
			return false; // User was not logged in
		} catch (error) {
			console.error('Error logging out:', error);
			// Handle specific errors or update UI based on logout outcome (optional)
			throw error;
		}
	}
}

// Instantiate an object of the AuthService class
const authService = new AuthService();

// Export the instantiated object
export default authService;
