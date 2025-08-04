<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Hero from '$lib/components/accueil/Hero.svelte';
	import FeaturedProducts from '$lib/components/accueil/FeaturedProducts.svelte';
	import Categories from '$lib/components/accueil/Categories.svelte';
	import LocationPreview from '$lib/components/accueil/LocationPreview.svelte';
	import Contact from '$lib/components/accueil/Contact.svelte';
</script>

<Header />

<main>
	<Hero />
	<FeaturedProducts />
	<LocationPreview />
	<Contact />
</main>

<Footer />