import { ExtentionTypes } from '../../typings';
import { CreateFolderAndWrite } from '../helpers';

const GenerateSupabaseConfig = () => {
	return `export const config = {
	url: process.env.NEXT_PUBLIC_SUPABASE_URL,
	secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
}`;
};

export const GenerateSupabaseAdapter = (ext: ExtentionTypes) => {
	CreateFolderAndWrite('lib', `config${ext}`, GenerateSupabaseConfig());
};
