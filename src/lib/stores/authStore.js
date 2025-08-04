import { writable } from 'svelte/store';

// La valeur par défaut est un utilisateur null, donc déconnecté.
export const authStore = writable({ user: null });