import { Client, Account, ID } from 'appwrite';
import { APPWRITE_ENDPOINT, PROJECT_ID } from '../config/config';

class AuthService {
	constructor() {
		this.client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
		this.account = new Account(this.client);
		this.sessionId = null; // Initialize sessionId to null
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(ID.unique(), email, password, name);
			if (userAccount) {
				return await this.login({ email, password });
			}
			// return userAccount;
		} catch (error) {
			console.log('Error creating account:', error);
			throw error;
		}
	}

	async login({ email, password }) {
		console.log(email, password);
		try {
			const userSession = await this.account.createEmailPasswordSession(email, password);
			return userSession;
		} catch (error) {
			console.log('Error logging in:', error);
			throw error;
		}
	}

	async getCurrentUser() {
		return await this.account.get();
	}

	async logOut() {
		try {
			// Regardless of the current user state, attempt to log out
			return await this.account.deleteSessions();
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
