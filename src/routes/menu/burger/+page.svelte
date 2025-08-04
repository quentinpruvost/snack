<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Header from '$lib/components/Header.svelte';
	import { cart, addToCart } from '$lib/stores/cartStore';
	import { PlusCircle } from 'lucide-svelte';

	interface Ingredient {
		id: string;
		name: string;
		src: string;
		zIndex: number;
		price: number;
		bottomOffset: number; // <-- NOUVEAU : Position verticale en pixels
	}

	const ingredientTypes: { [key: string]: Ingredient[] } = {
		Pains: [
			{ id: 'bun-bottom', name: 'Pain du bas', src: '/images/ingredients/bun-bottom.png', zIndex: 1, price: 1.5, bottomOffset: 0 },
			{ id: 'bun-top', name: 'Pain du haut', src: '/images/ingredients/bun-top.png', zIndex: 100, price: 0, bottomOffset: 800 }
		],
		Viandes: [{ id: 'steak', name: 'Steak', src: '/images/ingredients/steak.png', zIndex: 50, price: 3.0, bottomOffset: 70 }],
		Garnitures: [{ id: 'lettuce', name: 'Laitue', src: '/images/ingredients/lettuce.png', zIndex: 70, price: 0.5, bottomOffset: 200 }],
		Fromages: [{ id: 'cheese', name: 'Fromage', src: '/images/ingredients/cheese.png', zIndex: 60, price: 1.0, bottomOffset: 100 }]
	};

	let selectedIngredients: Ingredient[] = [ingredientTypes.Pains[0]];

	function toggleIngredient(ingredientToToggle: Ingredient) {
		if (ingredientToToggle.id === 'bun-bottom') return;
		
		const isAlreadySelected = selectedIngredients.some((i) => i.id === ingredientToToggle.id);
		
		let newIngredients = [...selectedIngredients];

		if (isAlreadySelected) {
			newIngredients = newIngredients.filter((i) => i.id !== ingredientToToggle.id);
		} else {
			newIngredients.push(ingredientToToggle);
		}

		// Pour un empilement visuel correct, on trie les ingrédients par leur position verticale
		// Sauf le pain du haut qui doit toujours être le plus haut
		const topBun = newIngredients.find(i => i.id === 'bun-top');
		let sortedIngredients = newIngredients.filter(i => i.id !== 'bun-top').sort((a, b) => a.bottomOffset - b.bottomOffset);
		
		if (topBun) {
			// On trouve l'ingrédient le plus haut (hors pain du haut) pour ajuster la position du pain du haut
			const highestIngredient = sortedIngredients.reduce((prev, current) => (prev.bottomOffset > current.bottomOffset) ? prev : current, sortedIngredients[0]);
			if (highestIngredient) {
				topBun.bottomOffset = highestIngredient.bottomOffset + 20; // Ajuste dynamiquement
			}
			sortedIngredients.push(topBun);
		}
		
		selectedIngredients = sortedIngredients;
	}

	function isSelected(ingredientId: string): boolean {
		return selectedIngredients.some((i) => i.id === ingredientId);
	}

	$: burgerPrice = selectedIngredients.reduce((total, ingredient) => total + ingredient.price, 0);

	function addCustomBurgerToCart() {
		const customName = 'Burger Perso (' + selectedIngredients.map(i => i.name).filter(name => name !== 'Pain du bas' && name !== 'Pain du haut').join(', ') + ')';
		
		addToCart({
			name: customName,
			price: burgerPrice.toFixed(2) + '€',
			img: '/images/ingredients/custom-burger.png'
		});
	}
</script>

<Header />
<main class="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen pt-24">
	<div class="p-8 flex flex-col">
		<h1 class="text-4xl font-black mb-8">Compose ton Burger</h1>
		<div class="flex-grow">
			{#each Object.entries(ingredientTypes) as [category, ingredients]}
				<div class="mb-8">
					<h2 class="text-2xl font-bold border-b-2 border-orange-500 pb-2 mb-4">{category}</h2>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
						{#each ingredients as ingredient}
							<button
								on:click={() => toggleIngredient(ingredient)}
								class="border-2 rounded-lg p-4 text-center transition-all duration-200"
								class:border-orange-500={isSelected(ingredient.id)}
								class:ring-2={isSelected(ingredient.id)}
								class:ring-orange-300={isSelected(ingredient.id)}
								class:border-gray-200={!isSelected(ingredient.id)}
							>
								<img src={ingredient.src} alt={ingredient.name} class="w-20 h-20 mx-auto object-contain" />
								<span class="mt-2 block font-semibold text-sm">{ingredient.name}</span>
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-auto pt-6 border-t">
			<div class="flex justify-between items-center">
				<span class="text-2xl font-bold">Total :</span>
				<span class="text-3xl font-black text-orange-600">{burgerPrice.toFixed(2)}€</span>
			</div>
			<button
				on:click={addCustomBurgerToCart}
				class="w-full mt-4 bg-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
			>
				<PlusCircle />
				Ajouter au panier
			</button>
		</div>
	</div>

	<div class="relative flex items-center justify-center p-8 bg-gray-100 min-h-[50vh] lg:min-h-full">
		<div class="relative w-64 h-96">
			{#each selectedIngredients as ingredient (ingredient.id)}
				<img
					src={ingredient.src}
					alt={ingredient.name}
					class="absolute left-1/2 -translate-x-1/2 w-full h-auto object-contain"
					style="z-index: {ingredient.zIndex}; bottom: {ingredient.bottomOffset}px;"
					transition:fly={{ y: -50, duration: 400, easing: quintOut }}
				/>
			{/each}
		</div>
	</div>
</main>