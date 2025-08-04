<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { MapPin, Clock, Phone, Mail } from 'lucide-svelte';
	import type L from 'leaflet';

	onMount(async () => {
		// On s'assure que le code s'exécute uniquement dans le navigateur
		if (browser) {
			// On importe Leaflet dynamiquement
			const L = (await import('leaflet')).default;

			// Coordonnées GPS (à remplacer par les vôtres)
			const lat = 43.6047; // Exemple : Toulouse
			const lon = 1.4442;

			// Création de la carte, attachée à la div avec l'id "map"
			const map = L.map('map').setView([lat, lon], 15);

			// Ajout du fond de carte (OpenStreetMap est gratuit)
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// Ajout d'un marqueur sur la carte
			L.marker([lat, lon])
				.addTo(map)
				.bindPopup('<b>SnackAttack</b><br>On vous attend ici !')
				.openPopup();
		}
	});
</script>

<div class="flex flex-col min-h-screen bg-gray-50">
	<Header />

	<main class="flex-grow pt-32 pb-16">
		<div class="container mx-auto px-4">
			<div class="text-center mb-12">
				<h1 class="text-5xl font-black text-gray-800 uppercase">Où nous trouver</h1>
				<p class="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
					Passez nous voir pour déguster nos spécialités sur place ou à emporter.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div class="space-y-8">
					<div class="flex items-start gap-4">
						<div class="bg-orange-100 p-3 rounded-full">
							<MapPin class="text-orange-600" size={24} />
						</div>
						<div>
							<h2 class="text-xl font-bold text-gray-800">Adresse</h2>
							<p class="text-gray-600">123 Rue de la Gourmandise<br />31000 Toulouse, France</p>
						</div>
					</div>
					<div class="flex items-start gap-4">
						<div class="bg-orange-100 p-3 rounded-full">
							<Clock class="text-orange-600" size={24} />
						</div>
						<div>
							<h2 class="text-xl font-bold text-gray-800">Horaires d'ouverture</h2>
							<p class="text-gray-600">
								Lundi - Samedi : 11h30 - 22h00<br />Dimanche : Fermé
							</p>
						</div>
					</div>
					<div class="flex items-start gap-4">
						<div class="bg-orange-100 p-3 rounded-full">
							<Phone class="text-orange-600" size={24} />
						</div>
						<div>
							<h2 class="text-xl font-bold text-gray-800">Téléphone</h2>
							<a href="tel:+33123456789" class="text-gray-600 hover:text-orange-600"
								>01 23 45 67 89</a
							>
						</div>
					</div>
				</div>

				<div class="w-full h-[500px] rounded-2xl shadow-lg overflow-hidden z-10" id="map"></div>
			</div>
		</div>
	</main>

	<Footer />
</div>