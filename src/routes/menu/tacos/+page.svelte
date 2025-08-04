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
		type: 'base' | 'viande' | 'sauce-base' | 'sauce-extra' | 'garniture';
		price: number; // <-- PRIX AJOUTÉ
	}

	const ingredientTypes: { [key: string]: Ingredient[] } = {
		Viandes: [
			{ id: 'tenders', name: 'Tenders', src: '/images/ingredients/tenders.png', zIndex: 20, type: 'viande', price: 2.5 },
			{ id: 'steak-hache', name: 'Steak Haché', src: '/images/ingredients/steak-hache.png', zIndex: 21, type: 'viande', price: 2.5 }
		],
		'Sauce Fromagère': [
			{ id: 'sauce-fromagere', name: 'Sauce Fromagère', src: '/images/ingredients/sauce-fromagere.png', zIndex: 30, type: 'sauce-base', price: 1.0 }
		],
		'Sauces Additionnelles': [
			{ id: 'mayonnaise', name: 'Mayonnaise', src: '/images/ingredients/mayonnaise.png', zIndex: 40, type: 'sauce-extra', price: 0.5 },
			{ id: 'ketchup', name: 'Ketchup', src: '/images/ingredients/ketchup.png', zIndex: 41, type: 'sauce-extra', price: 0.5 }
		],
		Garnitures: [
			{ id: 'laitue', name: 'Laitue', src: '/images/ingredients/laitue.png', zIndex: 10, type: 'garniture', price: 0.5 },
			{ id: 'oignon', name: 'Oignons', src: '/images/ingredients/oignon.png', zIndex: 11, type: 'garniture', price: 0.5 }
		]
	};
	
	const baseTacos: Ingredient = { id: 'galette', name: 'Galette', src: '/images/ingredients/galette.png', zIndex: 1, type: 'base', price: 2.0 };
	
	let selectedIngredients: Ingredient[] = [baseTacos];

	function toggleIngredient(ingredientToToggle: Ingredient) {
		const isAlreadySelected = selectedIngredients.some((i) => i.id === ingredientToToggle.id);
		if (isAlreadySelected) {
			selectedIngredients = selectedIngredients.filter((i) => i.id !== ingredientToToggle.id);
		} else {
			if (ingredientToToggle.type === 'sauce-base') {
				selectedIngredients = selectedIngredients.filter(i => i.type !== 'sauce-base');
			}
			selectedIngredients = [...selectedIngredients, ingredientToToggle];
		}
	}

	function isSelected(ingredientId: string): boolean {
		return selectedIngredients.some((i) => i.id === ingredientId);
	}

	// NOUVEAU : Calcul du prix total du tacos
	$: tacosPrice = selectedIngredients.reduce((total, ingredient) => total + ingredient.price, 0);

	// NOUVEAU : Fonction pour ajouter le tacos personnalisé au panier
	function addCustomTacosToCart() {
		const customName = 'Tacos Perso (' + selectedIngredients.map(i => i.name).slice(1).join(', ') + ')';
		
		addToCart({
			name: customName,
			price: tacosPrice.toFixed(2) + '€',
			img: '/images/ingredients/custom-tacos.png' // Une image générique
		});
	}
</script>

<Header />
<main class="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen pt-24">
	<div class="p-8 flex flex-col">
		<h1 class="text-4xl font-black mb-8">Compose ton Tacos</h1>
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
				<span class="text-3xl font-black text-orange-600">{tacosPrice.toFixed(2)}€</span>
			</div>
			<button
				on:click={addCustomTacosToCart}
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
				src={baseTacos.src}
				alt={baseTacos.name}
				class="absolute inset-0 w-full h-full object-contain"
				style="z-index: {baseTacos.zIndex};"
			/>
			{#each selectedIngredients.filter(i => i.id !== 'galette') as ingredient (ingredient.id)}
				<img
					src={ingredient.src}
					alt={ingredient.name}
					class="absolute inset-0 w-full h-full object-contain p-8"
					style="z-index: {ingredient.zIndex};"
					transition:fly={{ y: -50, duration: 400, easing: quintOut }}
				/>
			{/each}
		</div>
	</div>
</main>