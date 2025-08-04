import { json, redirect } from '@sveltejs/kit';
// 1. Importer le type
import type { RequestHandler } from './$types';

// 2. Appliquer le type à la fonction GET
export const GET: RequestHandler = ({ cookies }) => {
	// Supprimer le cookie
	cookies.delete('session', { path: '/' });

	// Rediriger vers la page d'accueil
	throw redirect(303, '/');
};