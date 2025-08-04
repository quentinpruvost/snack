<script>
	import { authStore } from '$lib/stores/authStore.js';
	import { onMount } from 'svelte';
	
	export let data; // Données venant de +layout.server.js

	// On s'assure que le store est à jour au chargement de la page
	onMount(() => {
		if (data.user) {
			authStore.set({ user: data.user });
		}
	});
</script>

<div class="container mx-auto py-10">
    <h1 class="text-4xl font-bold">Passez votre commande</h1>
    <p class="mt-4">Bonjour, {data.user.name} ! Vous êtes connecté.</p>
    </div>