import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const session = cookies.get('session');

	if (!session) {
		// L'utilisateur n'est pas connecté
		return { user: null };
	}

	// L'utilisateur est connecté, on renvoie ses informations
	const user = JSON.parse(session);
	return { user };
};