<script>
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { UserPlus } from 'lucide-svelte';

	let name = '';
	let email = '';
	let password = '';
	let errorMessage = '';

	async function handleRegister() {
		errorMessage = '';
		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password })
		});

		const result = await response.json();

		if (result.success) {
			authStore.set({ user: result.user });
			await goto('/order');
		} else {
			errorMessage = result.message;
		}
	}
</script>

<div class="flex flex-col min-h-screen bg-gray-50">
	<Header />

	<main class="flex-grow flex items-center justify-center pt-32 pb-16">
		<div class="container mx-auto p-4 lg:p-8">
			<div class="flex flex-col lg:flex-row w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-white animate-fade-in">
				
				<div class="hidden lg:block lg:w-1/2">
					<img
						src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"
						alt="Burger appétissant"
						class="w-full h-full object-cover"
					/>
				</div>

				<div class="w-full lg:w-1/2 p-8 md:p-12">
					<div class="text-center">
						<UserPlus class="mx-auto text-orange-500 mb-4" size={48} />
						<h1 class="text-3xl font-bold text-gray-800 mb-2">Rejoignez-nous !</h1>
						<p class="text-gray-600 mb-8">Créez votre compte pour commander.</p>
					</div>

					<form on:submit|preventDefault={handleRegister} class="flex flex-col gap-4">
						<input
							type="text"
							bind:value={name}
							placeholder="Votre nom"
							class="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-orange-500 focus:outline-none transition"
							required
						/>
						<input
							type="email"
							bind:value={email}
							placeholder="Email"
							class="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-orange-500 focus:outline-none transition"
							required
						/>
						<input
							type="password"
							bind:value={password}
							placeholder="Mot de passe"
							class="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-orange-500 focus:outline-none transition"
							required
						/>
						<button
							type="submit"
							class="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg mt-4"
							>Créer mon compte</button
						>

						{#if errorMessage}
							<p class="text-red-500 mt-4 text-center">{errorMessage}</p>
						{/if}
					</form>

					<div class="mt-8 text-center">
						<p class="text-sm text-gray-600">
							Déjà un compte ?
							<a href="/login" class="font-medium text-orange-600 hover:underline">Connectez-vous</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>

	<Footer />
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
	}
</style>