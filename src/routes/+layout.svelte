<script lang="ts">
    import { authStore } from "$lib/stores/authStore";
    import 'leaflet/dist/leaflet.css';
    import "../app.css";
    export let data;

    // Cette ligne réactive garantit que le store est toujours synchronisé
    // avec les données de session qui viennent du serveur.
    $: authStore.set({ user: data.user });
</script>

<slot />