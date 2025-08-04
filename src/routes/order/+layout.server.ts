// 1. On importe le type pour la fonction load
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// 2. On applique le type "LayoutServerLoad" à notre fonction
export const load: LayoutServerLoad = ({ cookies }) => {
	const session = cookies.get('session');

	// Si pas de cookie de session, on redirige l'utilisateur vers la page de connexion
	if (!session) {
		throw redirect(303, '/login');
	}

	// Si un cookie existe, on passe les infos au client
	const user = JSON.parse(session);
	return { user }; // Ces données seront disponibles dans la page "/order"
};