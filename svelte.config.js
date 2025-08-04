// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// L'adaptateur est la seule chose nécessaire dans la config kit pour le déploiement
		adapter: adapter()
	}
};

export default config;