import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
// 1. On importe le type 'RequestHandler' que SvelteKit génère pour nous
import type { RequestHandler } from './$types';

// 2. On définit une "interface" pour décrire un utilisateur
//    TypeScript saura maintenant ce qu'est un "User"
interface User {
	id: number;
	email: string;
	password: string;
	name: string;
}

const dbPath = path.resolve(process.cwd(), 'src/lib/server/db.json');

// 3. On applique le type 'RequestHandler' à notre fonction POST
//    TypeScript connaîtra maintenant les types de { request, cookies }
export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();

	// 4. On dit à TypeScript que notre variable 'users' est un tableau de 'User'
	const users: User[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

	// Grâce à ça, TypeScript sait que 'u' est de type 'User', l'erreur disparaît
	const user = users.find((u) => u.email === email && u.password === password);

	if (!user) {
		return json({ success: false, message: 'Email ou mot de passe incorrect.' }, { status: 401 });
	}

	cookies.set('session', JSON.stringify({ email: user.email, name: user.name }), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 1 semaine
	});

	return json({ success: true, user: { name: user.name, email: user.email } });
};