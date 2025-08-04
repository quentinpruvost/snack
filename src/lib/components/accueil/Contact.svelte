<script lang="ts">
	import { Phone, Mail } from 'lucide-svelte';
</script>

<section id="contact" class="py-24 bg-gray-800 text-white">
	<div class="container mx-auto px-4 text-center">
		<h2 class="text-4xl font-black mb-4">Contactez-nous</h2>
		<p class="text-gray-400 max-w-2xl mx-auto mb-8">
			Une question ? Une commande de groupe ? N'hésitez pas à nous appeler ou à nous envoyer un
			email.
		</p>
		<div class="flex flex-col md:flex-row justify-center items-center gap-8">
			<a
				href="tel:+33123456789"
				class="inline-flex items-center gap-3 text-xl font-semibold hover:text-orange-400 transition-colors"
			>
				<Phone />
				<span>01 23 45 67 89</span>
			</a>
			<a
				href="mailto:contact@snackattack.com"
				class="inline-flex items-center gap-3 text-xl font-semibold hover:text-orange-400 transition-colors"
			>
				<Mail />
				<span>contact@snackattack.com</span>
			</a>
		</div>
	</div>
</section>