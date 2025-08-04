<script>
  import { Twitter, Instagram, Facebook } from 'lucide-svelte';
</script>

<footer class="bg-gray-800 text-white">
  <div class="container mx-auto px-6 py-8">
    <div class="flex flex-col items-center text-center">
      
      <a href="/" class="text-2xl font-bold text-white lg:text-3xl hover:text-orange-400 transition-colors">
        Snack<span class="text-orange-400">Attack</span>
      </a>

      <div class="flex justify-center mt-6 space-x-4">
        <a href="   " class="text-gray-400 hover:text-orange-400 transition-colors"><Twitter /></a>
        <a href="   " class="text-gray-400 hover:text-orange-400 transition-colors"><Instagram /></a>
        <a href="   " class="text-gray-400 hover:text-orange-400 transition-colors"><Facebook /></a>
      </div>

    </div>
    <hr class="my-6 border-gray-700" />
    <div class="text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} SnackAttack. Tous droits réservés.</p>
    </div>
  </div>
</footer>