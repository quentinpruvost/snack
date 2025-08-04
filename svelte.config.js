// svelte.config.js
import adapter from '@sveltejs/adapter-vercel'; // <-- ON CHANGE L'IMPORT
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter() // On s'assure qu'il est bien appelé ici
	},
	preprocess: vitePreprocess()
};

export default config;