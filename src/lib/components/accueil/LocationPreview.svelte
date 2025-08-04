<script lang="ts">
	import { MapPin, ArrowRight } from 'lucide-svelte';
</script>

<section id="ou-nous-trouver" class="py-24 bg-white">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-4xl font-black text-gray-800 mb-4">Retrouvez-nous en Ville</h2>
				<p class="text-gray-600 mb-6 max-w-lg">
					Notre snack est idéalement situé pour une pause gourmande à tout moment de la journée. Venez
					déguster nos spécialités sur notre terrasse ou commandez à emporter !
				</p>
				<div class="space-y-4 mb-8">
					<div class="flex items-center gap-3">
						<MapPin class="text-orange-500" />
						<span class="font-semibold">123 Rue de la Gourmandise, 31000 Toulouse</span>
					</div>
				</div>
				<a
					href="/ou-nous-trouver"
					class="inline-flex items-center gap-2 bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg"
				>
					Voir sur la carte
					<ArrowRight size={20} />
				</a>
			</div>
			<div>
				<img
					src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1771&auto=format&fit=crop"
					alt="Façade du restaurant"
					class="rounded-2xl shadow-xl w-full h-full object-cover aspect-video lg:aspect-square"
				/>
			</div>
		</div>
	</div>
</section>