<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { cart, removeFromCart, incrementItem, decrementItem, type CartItem } from '$lib/stores/cartStore';
	import { Trash2, Plus, Minus } from 'lucide-svelte';

	// Variable réactive pour calculer le total
	$: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
</script>

<div class="bg-gray-50 min-h-screen flex flex-col">
	<Header />
	<main class="flex-grow pt-32 pb-16">
		<div class="container mx-auto px-4">
			<h1 class="text-4xl font-black text-gray-800 mb-8">Votre Panier</h1>

			{#if $cart.length > 0}
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div class="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
						{#each $cart as item (item.id)}
							<div class="flex items-center gap-4 border-b py-4 last:border-b-0">
								<img src={item.img} alt={item.name} class="w-24 h-24 object-cover rounded-md" />
								<div class="flex-grow">
									<h2 class="font-bold text-lg">{item.name}</h2>
									<p class="text-orange-600 font-semibold">{item.price.toFixed(2)}€</p>
								</div>
								<div class="flex items-center gap-3">
									<button on:click={() => decrementItem(item.id)} class="btn btn-sm btn-ghost">
										<Minus size={16} />
									</button>
									<span class="font-bold w-8 text-center">{item.quantity}</span>
									<button on:click={() => incrementItem(item.id)} class="btn btn-sm btn-ghost">
										<Plus size={16} />
									</button>
								</div>
								<button on:click={() => removeFromCart(item.id)} class="text-gray-400 hover:text-red-500">
									<Trash2 size={20} />
								</button>
							</div>
						{/each}
					</div>

					<div class="lg:col-span-1">
						<div class="bg-white rounded-lg shadow-md p-6 sticky top-32">
							<h2 class="text-2xl font-bold border-b pb-4">Résumé</h2>
							<div class="flex justify-between items-center py-4">
								<span class="text-gray-600">Sous-total</span>
								<span class="font-bold">{total.toFixed(2)}€</span>
							</div>
							<div class="flex justify-between items-center py-4 border-t border-b">
								<span class="text-xl font-bold">TOTAL</span>
								<span class="text-xl font-bold text-orange-600">{total.toFixed(2)}€</span>
							</div>
							<button class="btn btn-primary w-full mt-6">Passer la commande</button>
						</div>
					</div>
				</div>
			{:else}
				<div class="text-center py-20 bg-white rounded-lg shadow-md">
					<h2 class="text-2xl font-bold text-gray-800">Votre panier est vide</h2>
					<p class="text-gray-600 mt-2">Parcourez notre menu pour trouver quelque chose de bon !</p>
					<a href="/menu" class="btn btn-primary mt-6">Voir le menu</a>
				</div>
			{/if}
		</div>
	</main>
	<Footer />
</div>