<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Header from '$lib/components/Header.svelte';
	// IMPORTS MIS À JOUR
	import { cart, addToCart } from '$lib/stores/cartStore';
	import { PlusCircle } from 'lucide-svelte';

	interface Ingredient {
		id: string;
		name: string;
		src: string;
		zIndex: number;
		type: 'base' | 'proteine' | 'fromage' | 'garniture';
		price: number; // <-- PRIX AJOUTÉ
	}

	const ingredientTypes: { [key: string]: Ingredient[] } = {
		Protéines: [
			{ id: 'bacon', name: 'Bacon', src: '/images/ingredients/bacon.png', zIndex: 30, type: 'proteine', price: 2.0 },
			{ id: 'poulet-effiloche', name: 'Poulet Effiloché', src: '/images/ingredients/poulet-effiloche.png', zIndex: 31, type: 'proteine', price: 2.5 }
		],
		'Fromages & Sauces': [
			{ id: 'cheddar-fondu', name: 'Cheddar Fondu', src: '/images/ingredients/cheddar-fondu.png', zIndex: 50, type: 'fromage', price: 1.5 },
			{ id: 'sauce-bbq', name: 'Sauce BBQ', src: '/images/ingredients/sauce-bbq.png', zIndex: 51, type: 'fromage', price: 0.5 }
		],
		Garnitures: [
			{ id: 'ciboulette', name: 'Ciboulette', src: '/images/ingredients/ciboulette.png', zIndex: 60, type: 'garniture', price: 0.3 },
			{ id: 'jalapenos', name: 'Jalapeños', src: '/images/ingredients/jalapenos.png', zIndex: 61, type: 'garniture', price: 0.7 }
		]
	};
	
	const baseFries: Ingredient = { id: 'frites-base', name: 'Frites', src: '/images/ingredients/frites-base.png', zIndex: 1, type: 'base', price: 4.0 };
	
	let selectedIngredients: Ingredient[] = [baseFries];

	function toggleIngredient(ingredientToToggle: Ingredient) {
		const isAlreadySelected = selectedIngredients.some((i) => i.id === ingredientToToggle.id);
		if (isAlreadySelected) {
			selectedIngredients = selectedIngredients.filter((i) => i.id !== ingredientToToggle.id);
		} else {
			selectedIngredients = [...selectedIngredients, ingredientToToggle];
		}
	}

	function isSelected(ingredientId: string): boolean {
		return selectedIngredients.some((i) => i.id === ingredientId);
	}

	// NOUVEAU : Calcul du prix total
	$: friesPrice = selectedIngredients.reduce((total, ingredient) => total + ingredient.price, 0);

	// NOUVEAU : Fonction pour ajouter les frites personnalisées au panier
	function addCustomFriesToCart() {
		const customName = 'Frites Perso (' + selectedIngredients.map(i => i.name).slice(1).join(', ') + ')';
		
		addToCart({
			name: customName,
			price: friesPrice.toFixed(2) + '€',
			img: '/images/ingredients/custom-fries.png' // Une image générique
		});
	}
</script>

<Header />
<main class="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen pt-24">
	<div class="p-8 flex flex-col">
		<h1 class="text-4xl font-black mb-8">Compose tes Loaded Fries</h1>
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
								<img
									src={ingredient.src}
									alt={ingredient.name}
									class="w-20 h-20 mx-auto object-contain"
								/>
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
				<span class="text-3xl font-black text-orange-600">{friesPrice.toFixed(2)}€</span>
			</div>
			<button
				on:click={addCustomFriesToCart}
				class="w-full mt-4 bg-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
			>
				<PlusCircle />
				Ajouter au panier
			</button>
		</div>
	</div>

	<div class="relative flex items-center justify-center p-8 bg-gray-100 min-h-[50vh] lg:min-h-full">
		<div class="relative w-80 h-80">
			<img
				src={baseFries.src}
				alt={baseFries.name}
				class="absolute inset-0 w-full h-full object-contain"
				style="z-index: {baseFries.zIndex};"
			/>
			{#each selectedIngredients.filter(i => i.id !== 'frites-base') as ingredient (ingredient.id)}
				<img
					src={ingredient.src}
					alt={ingredient.name}
					class="absolute inset-0 w-full h-full object-contain p-4"
					style="z-index: {ingredient.zIndex};"
					transition:fly={{ y: -50, duration: 400, easing: quintOut }}
				/>
			{/each}
		</div>
	</div>
</main>