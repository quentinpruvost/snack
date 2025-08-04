<script lang="ts">
	import { ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-svelte';
	import { cart, addToCart, decrementItem } from '$lib/stores/cartStore';

	const products = [
		{
			name: 'Le Classique Burger',
			price: '9.50€',
			img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1771&auto=format&fit=crop',
			desc: 'Steak haché frais, cheddar fondant, salade, tomate, oignons rouges.'
		},
		{
			name: 'French Tacos - 2 Viandes',
			price: '11.00€',
			img: 'https://french-iceberg.com/wp-content/uploads/2021/05/French-Taco-1024x576.jpg',
			desc: 'Le meilleur de la street food, sauce fromagère maison inoubliable.'
		},
		{
			name: 'Loaded Fries Bacon',
			price: '7.50€',
			img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2024_40/2077804/rick-martinez-cheese-fries-2x1-mc-241004.jpg',
			desc: 'Frites dorées, bacon grillé, cheddar coulant et ciboulette.'
		}
	];

	$: cartQuantities = new Map($cart.map((item) => [item.id, item.quantity]));
</script>

<section id="menu" class="py-16 lg:py-24 bg-gray-50">
	<div class="container mx-auto px-6">
		<div class="text-center mb-12">
			<h2 class="text-3xl lg:text-4xl font-bold text-gray-800">Nos Stars du Moment</h2>
			<p class="text-gray-600 mt-2">Les favoris de nos clients, et bientôt les vôtres.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each products as product, i}
				{@const quantity = cartQuantities.get(product.name) || 0}
				<div
					class="card bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
					style="--delay: {i * 150}ms;"
				>
					<img src={product.img} alt={product.name} class="w-full h-56 object-cover" />
					<div class="p-6 flex flex-col flex-grow">
						<h3 class="font-bold text-xl text-gray-800">{product.name}</h3>
						<p class="text-gray-600 mt-2 text-sm flex-grow">{product.desc}</p>
						<div class="mt-4 flex justify-between items-center">
							<span class="font-bold text-lg text-orange-500">{product.price}</span>

							{#if quantity === 0}
								<button
									on:click={() => addToCart(product)}
									class="bg-orange-100 text-orange-600 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
								>
									<ShoppingCart size={20} />
								</button>
							{:else}
								<div class="flex items-center gap-2 bg-orange-100 rounded-full">
									<button
										on:click={() => decrementItem(product.name)}
										class="p-2 text-orange-600 hover:bg-orange-200 rounded-full"
									>
										<Minus size={16} />
									</button>
									<span class="font-bold text-orange-800 w-5 text-center">{quantity}</span>
									<button
										on:click={() => addToCart(product)}
										class="p-2 text-orange-600 hover:bg-orange-200 rounded-full"
									>
										<Plus size={16} />
									</button>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-16 text-center">
			<a
				href="/menu"
				class="inline-flex items-center gap-2 bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg"
			>
				Voir le menu complet
				<ArrowRight size={20} />
			</a>
		</div>
	</div>
</section>

<style>
	.card {
		opacity: 0;
		transform: translateY(20px);
		animation: fadeInUp 0.6s ease-out forwards;
		animation-delay: var(--delay);
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>