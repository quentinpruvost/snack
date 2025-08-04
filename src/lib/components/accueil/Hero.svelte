<script>
	// Pas besoin de script pour ce composant
</script>

<section class="relative h-[70vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
	<div class="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-0">
		
        <video
			autoplay
			loop
			muted
			playsinline
			class="w-full h-full object-cover hidden md:block"
			src="/videos/videoshero.mp4"
		>
			Votre navigateur ne supporte pas les vidéos.
		</video>

		<video
			autoplay
			loop
			muted
			playsinline
			class="w-full h-full object-cover md:hidden"
			src="/videos/heromobile.mp4"
		>
			Votre navigateur ne supporte pas les vidéos.
		</video>
	</div>

	<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

	<div class="relative z-20 text-center text-white p-4 max-w-4xl mx-auto">
		<h1
			class="text-5xl md:text-7xl lg:text-8xl font-black uppercase animate-fade-in-down"
			style="animation-delay: 0.2s;"
		>
			Le Goût Ultime
		</h1>
		<p
			class="text-lg md:text-xl max-w-2xl mx-auto mt-4 mb-8 animate-fade-in-down"
			style="animation-delay: 0.6s;"
		>
			Des créations gourmandes, préparées avec passion et livrées encore chaudes.
		</p>
		<a
			href="/menu"
			class="bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-110 shadow-xl inline-block animate-fade-in-down"
			style="animation-delay: 1s;"
		>
			Découvrir le Menu
		</a>
	</div>
</section>

<style>
	@keyframes fade-in-down {
		from {
			opacity: 0;
			transform: translateY(-25px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-down {
		opacity: 0;
		transform: translateY(-25px);
		animation-name: fade-in-down;
		animation-duration: 0.8s;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}
</style>