import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

const GenerateFirebaseConfig = () => {
	return `import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const firestore = initFirestore({
	credential: cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
	}),
});`;
};

export const GenerateFirebaseAdapter = (ext: ExtentionTypes) => {
	CreateFolderAndWrite('lib', `firestore${ext}`, GenerateFirebaseConfig());
};
