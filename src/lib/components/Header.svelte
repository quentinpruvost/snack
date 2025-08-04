<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X, ShoppingCart } from 'lucide-svelte';
	import { authStore } from '$lib/stores/authStore.js';
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cartStore';

	let isMenuOpen = false;
	let hasScrolled = false;

	$: isTransparent = $page.url.pathname === '/' && !hasScrolled;
	$: itemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);

	const navLinks = [
		{ href: '/menu', text: 'Menu' },
		{ href: '/ou-nous-trouver', text: 'Où nous trouver' },
		{ href: '/#contact', text: 'Contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			hasScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class="fixed top-0 left-0 w-full z-40 transition-[height,background-color,box-shadow] duration-300 ease-in-out"
	class:h-20={hasScrolled}
	class:h-24={!hasScrolled}
	class:shadow-lg={hasScrolled}
	class:bg-white={!isTransparent}
>
	<div class="container mx-auto px-6 h-full flex justify-between items-center">
		<a
			href="/"
			class="text-3xl font-black transition-colors"
			class:text-white={isTransparent}
			class:text-gray-800={!isTransparent}
			class:drop-shadow-lg={isTransparent}
		>
			Snack<span class="text-orange-500">Attack</span>
		</a>

		<nav class="hidden md:flex items-center space-x-8">
			{#each navLinks as link}
				<a
					href={link.href}
					class="font-medium transition-colors"
					class:text-white={isTransparent}
					class:text-gray-600={!isTransparent}
					class:drop-shadow-md={isTransparent}
				>
					{link.text}
				</a>
			{/each}
		</nav>

		<div
			class="flex items-center space-x-4 transition-colors"
			class:text-white={isTransparent}
			class:text-gray-700={!isTransparent}
		>
			<a href="/panier" aria-label="Voir le panier" class="relative p-2 rounded-full hover:bg-white/20">
				<ShoppingCart />
				{#if itemCount > 0}
					<span
						class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
					>
						{itemCount}
					</span>
				{/if}
			</a>

			{#if $authStore.user}
				<a
					href="/api/auth/logout"
					class="hidden sm:block bg-gray-200 text-gray-700 font-bold py-2 px-5 rounded-full hover:bg-gray-300 transition-colors"
					>Déconnexion</a
				>
			{:else}
				<a
					href="/login"
					class="hidden sm:block bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg"
					>Connexion / Inscription</a
				>
			{/if}

			<button on:click={() => (isMenuOpen = true)} aria-label="Ouvrir le menu" class="md:hidden p-2">
				<Menu size={28} />
			</button>
		</div>
	</div>

	<div
		class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 md:hidden"
		class:opacity-100={isMenuOpen}
		class:opacity-0={!isMenuOpen}
		class:pointer-events-auto={isMenuOpen}
		class:pointer-events-none={!isMenuOpen}
	>
		<button
			on:click={() => (isMenuOpen = false)}
			class="absolute inset-0 bg-black/60 w-full h-full cursor-default"
			aria-label="Fermer le menu"
		></button>
		<div
			class="relative w-4/5 max-w-sm h-full bg-white p-6 flex flex-col transition-transform duration-300 ease-in-out"
			class:translate-x-0={isMenuOpen}
			class:translate-x-full={!isMenuOpen}
		>
			<div class="flex items-center justify-between pb-6 border-b">
				<h2 class="text-xl font-bold text-orange-500">Menu</h2>
				<button on:click={() => (isMenuOpen = false)} aria-label="Fermer le menu" class="p-2">
					<X size={30} class="text-gray-600" />
				</button>
			</div>
			<nav class="flex-grow mt-8 flex flex-col items-center justify-center space-y-8">
				{#each navLinks as link}
					<a
						on:click={() => (isMenuOpen = false)}
						href={link.href}
						class="text-2xl font-semibold text-gray-700 hover:text-orange-500"
					>
						{link.text}
					</a>
				{/each}
			</nav>

			{#if $authStore.user}
				<a
					href="/api/auth/logout"
					class="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-full text-center hover:bg-gray-300 w-full"
					>Se déconnecter</a
				>
			{:else}
				<a
					href="/login"
					on:click={() => (isMenuOpen = false)}
					class="bg-orange-500 text-white font-bold py-3 px-6 rounded-full text-center hover:bg-orange-600 w-full"
				>
					Connexion / Inscription
				</a>
			{/if}
		</div>
	</div>
</header>