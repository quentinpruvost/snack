<script lang="ts">
	import { Beef, Sandwich, Wheat } from 'lucide-svelte';
</script>

<section class="py-16 lg:py-24">
	<div class="container mx-auto px-6">
		<div class="text-center mb-12">
			<h2 class="text-3xl lg:text-4xl font-bold text-gray-800">Parcourir par Catégorie</h2>
			<p class="text-gray-600 mt-2">Cliquez pour composer le produit de vos rêves !</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
			<a href="/menu/burger" class="group">
				<div
					class="bg-gray-100 p-8 rounded-lg flex justify-center items-center transform group-hover:bg-orange-500 group-hover:scale-105 transition-all duration-300"
				>
					<Beef class="text-orange-500 group-hover:text-white" size={64} />
				</div>
				<h3 class="mt-4 font-bold text-xl text-gray-700 group-hover:text-orange-500 transition-colors">
					Burgers
				</h3>
			</a>

			<a href="/menu/tacos" class="group">
				<div
					class="bg-gray-100 p-8 rounded-lg flex justify-center items-center transform group-hover:bg-orange-500 group-hover:scale-105 transition-all duration-300"
				>
					<Sandwich class="text-orange-500 group-hover:text-white" size={64} />
				</div>
				<h3 class="mt-4 font-bold text-xl text-gray-700 group-hover:text-orange-500 transition-colors">
					French Tacos
				</h3>
			</a>

			<a href="/menu/fries" class="group">
				<div
					class="bg-gray-100 p-8 rounded-lg flex justify-center items-center transform group-hover:bg-orange-500 group-hover:scale-105 transition-all duration-300"
				>
					<Wheat class="text-orange-500 group-hover:text-white" size={64} />
				</div>
				<h3 class="mt-4 font-bold text-xl text-gray-700 group-hover:text-orange-500 transition-colors">
					Loaded Fries
				</h3>
			</a>
		</div>
	</div>
</section>