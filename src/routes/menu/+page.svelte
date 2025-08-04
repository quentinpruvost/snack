<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { ChefHat, Sandwich, UtensilsCrossed, ShoppingCart, Plus, Minus, List } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { cart, addToCart, decrementItem } from '$lib/stores/cartStore';

	interface MenuItem {
		name: string;
		description: string;
		price: string;
		img: string;
	}

	const classicMenu: { [key: string]: MenuItem[] } = {
		Burgers: [
			{
				name: 'Le Classique',
				description: 'Steak haché, cheddar, salade, tomate, cornichons, sauce maison.',
				price: '9.50€',
				img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto-format&fit=crop'
			},
			{
				name: 'Le Bacon',
				description: 'Double steak, double bacon, oignons caramélisés, sauce barbecue.',
				price: '12.00€',
				img: 'https://media.istockphoto.com/id/520215281/fr/photo/bacon-burger.jpg?s=612x612&w=0&k=20&c=ltkUXJZqYF4SWJBY8B_dpmYMeNPpDf-E_MvJ83g7Iyo='
			}
		],
		Tacos: [
			{
				name: 'Tacos 2 Viandes',
				description: 'Le meilleur de la street food, avec notre sauce fromagère maison.',
				price: '11.00€',
				img: 'https://french-iceberg.com/wp-content/uploads/2021/05/French-Taco-1024x576.jpg'
			}
		],
		'Loaded Fries': [
			{
				name: 'Frites Cheddar Bacon',
				description: 'Frites dorées, nappage de cheddar coulant, éclats de bacon grillé.',
				price: '7.50€',
				img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2024_40/2077804/rick-martinez-cheese-fries-2x1-mc-241004.jpg'
			}
		]
	};

	let selectedCategory: string = 'Tous';
	const categoryFilters = [
		{ name: 'Tous', icon: List },
		{ name: 'Burgers', icon: ChefHat },
		{ name: 'Tacos', icon: Sandwich },
		{ name: 'Loaded Fries', icon: UtensilsCrossed }
	];

	$: filteredItems = (() => {
		if (selectedCategory === 'Tous') {
			return Object.values(classicMenu).flat();
		}
		return classicMenu[selectedCategory] || [];
	})();

	$: cartQuantities = new Map($cart.map((item) => [item.id, item.quantity]));

	const customCategories = [
		{
			name: 'Crée ton Burger',
			description: 'Choisis ton pain, ta viande et tes garnitures.',
			href: '/menu/burger',
			icon: ChefHat
		},
		{
			name: 'Crée ton Tacos',
			description: 'Compose le French Tacos de tes rêves.',
			href: '/menu/tacos',
			icon: Sandwich
		},
		{
			name: 'Crée tes Loaded Fries',
			description: "Une base de frites et des toppings à n'en plus finir.",
			href: '/menu/fries',
			icon: UtensilsCrossed
		}
	];
</script>

<div class="bg-gray-50 min-h-screen flex flex-col">
	<Header />
	<main class="flex-grow pt-32">
		<div class="container mx-auto px-4 py-16 text-center">
			<h1 class="text-5xl font-black text-gray-800 uppercase">Notre Menu</h1>
			<p class="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
				Parcourez nos créations ou devenez le chef en composant votre propre menu !
			</p>
		</div>

		<section class="container mx-auto px-4 pb-24">
			<h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Nos Classiques</h2>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 max-w-3xl mx-auto">
				{#each categoryFilters as category}
					<button
						on:click={() => (selectedCategory = category.name)}
						class="text-center group transition-transform duration-300 hover:scale-105"
					>
						<div
							class="p-6 rounded-2xl flex justify-center items-center transition-all duration-300"
							class:bg-orange-500={selectedCategory === category.name}
							class:shadow-lg={selectedCategory === category.name}
							class:bg-white={selectedCategory !== category.name}
							class:shadow-md={selectedCategory !== category.name}
						>
							<svelte:component
								this={category.icon}
								size={40}
								class="transition-colors duration-300 {selectedCategory === category.name
									? 'text-white'
									: 'text-orange-500'}"
							/>
						</div>
						<h3
							class="mt-3 font-bold text-lg transition-colors duration-300"
							class:text-orange-600={selectedCategory === category.name}
							class:text-gray-700={selectedCategory !== category.name}
						>
							{category.name}
						</h3>
					</button>
				{/each}
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				{#each filteredItems as item (item.name)}
					{@const quantity = cartQuantities.get(item.name) || 0}
					<div
						animate:flip={{ duration: 300, easing: quintOut }}
						class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
					>
						<img src={item.img} alt={item.name} class="w-full h-48 object-cover" />
						<div class="p-6 flex flex-col flex-grow">
							<h3 class="text-xl font-bold text-gray-800">{item.name}</h3>
							<p class="mt-2 text-gray-600 text-sm flex-grow">{item.description}</p>
							<div class="mt-4 flex justify-between items-center">
								<span class="font-black text-xl text-gray-800">{item.price}</span>
								{#if quantity === 0}
									<button
										on:click={() => addToCart(item)}
										class="bg-orange-100 text-orange-600 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
									>
										<ShoppingCart size={20} />
									</button>
								{:else}
									<div class="flex items-center gap-2 bg-orange-100 rounded-full">
										<button
											on:click={() => decrementItem(item.name)}
											class="p-2 text-orange-600 hover:bg-orange-200 rounded-full"
										>
											<Minus size={16} />
										</button>
										<span class="font-bold text-orange-800 w-5 text-center">{quantity}</span>
										<button
											on:click={() => addToCart(item)}
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
		</section>

		<section class="bg-white py-24">
			<div class="container mx-auto px-4">
				<div class="text-center mb-12">
					<h2 class="text-3xl font-bold text-gray-800">Ou composez le vôtre !</h2>
					<p class="text-lg text-gray-600 mt-2">Laissez parler votre créativité.</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{#each customCategories as category}
						<a
							href={category.href}
							class="group block bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
						>
							<div
								class="mx-auto bg-white h-20 w-20 flex items-center justify-center rounded-full shadow-md mb-4"
							>
								<svelte:component this={category.icon} class="text-orange-500" size={40} />
							</div>
							<h3 class="text-2xl font-bold text-gray-800">{category.name}</h3>
							<p class="mt-2 text-gray-600">{category.description}</p>
						</a>
					{/each}
				</div>
			</div>
		</section>
	</main>
	<Footer />
</div>