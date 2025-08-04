import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import type { RequestHandler } from './$types';

interface User {
	id: number;
	email: string;
	password: string;
	name: string;
}

const dbPath = path.resolve(process.cwd(), 'src/lib/server/db.json');

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { name, email, password } = await request.json();

	// Valider les données reçues (simple vérification)
	if (!name || !email || !password) {
		return json({ success: false, message: 'Tous les champs sont requis.' }, { status: 400 });
	}

	const users: User[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

	// Vérifier si l'utilisateur existe déjà
	const existingUser = users.find((u) => u.email === email);
	if (existingUser) {
		return json({ success: false, message: 'Cet email est déjà utilisé.' }, { status: 409 });
	}

	// Créer le nouvel utilisateur
	const newUser: User = {
		id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1, // Génère un nouvel ID unique
		name,
		email,
		password // NOTE: Dans une vraie application, il faut HASHER ce mot de passe !
	};

	// Ajouter le nouvel utilisateur à la liste et sauvegarder le fichier
	users.push(newUser);
	fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

	// Connecter automatiquement le nouvel utilisateur en créant le cookie
	cookies.set('session', JSON.stringify({ email: newUser.email, name: newUser.name }), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 1 semaine
	});

	return json({ success: true, user: { name: newUser.name, email: newUser.email } });
};