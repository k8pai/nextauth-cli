export const GenerateSupabaseConfig = () => {
	return `export const config = {
	url: process.env.NEXT_PUBLIC_SUPABASE_URL,
	secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
}`;
};
