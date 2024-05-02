import { Client, Account, Databases, ID, Query } from 'appwrite';
import { APPWRITE_ENDPOINT, PROJECT_ID, DATABASE_ID } from '../config/config';

class TodoService {
	constructor() {
		this.client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
		this.account = new Account(this.client);
		this.databases = new Databases(this.client);
	}

	async createDocument(userId, title, description, isCompleted) {
		try {
			const result = await this.databases.createDocument(
				DATABASE_ID, // datab	aseId
				'66324e74002f29eda5a5', // collectionId
				ID.unique(),
				{
					title,
					description,
					isCompleted: isCompleted,
					userId,
				}
			);
		} catch (error) {
			console.log('Error creating document:', error);
		}
	}
	async getTodos(userId) {
		try {
			const result = await this.databases.listDocuments(DATABASE_ID, '66324e74002f29eda5a5', [Query.equal('userId', userId)]);
			return result;
		} catch (error) {
			console.error('Error fetching todos:', error);
			throw error;
		}
	}

	async updateIsCompleted(documentId, isCompleted) {
		const response = await this.databases.updateDocument(DATABASE_ID, '66324e74002f29eda5a5', documentId, { isCompleted: isCompleted });
		return response
	}

	async deleteDocument(documentId) {
		const result = await this.databases.deleteDocument(DATABASE_ID, '66324e74002f29eda5a5', documentId);

		return result;
	}
}

const todoService = new TodoService();

export default todoService;
