import { Client, Account, ID, Storage } from 'appwrite';
import { APPWRITE_ENDPOINT, PROJECT_ID, BUCKET_ID } from '../config/config';

class UserService {
	constructor() {
		this.client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
		this.account = new Account(this.client);
		this.sessionId = null;
		this.storage = new Storage(this.client);
	}

	async uploadProfilePicture(file, userId) {
		try {
			const response = await this.storage.createFile(BUCKET_ID, userId, file);
			return response.$id;
		} catch (error) {
			console.error('Error uploading profile picture:', error);
			throw error;
		}
	}

	async getFilePreview(userId) {
		// console.log(userId);
		try {
			const result = await this.storage.getFilePreview(BUCKET_ID, userId);
			return result.href;
		} catch (error) {
			console.error('Error getting file preview:', error);
			throw error;
		}
	}
}

export const userService = new UserService();

export default userService;
