<script>
    import "../app.pcss";
    import Loading from "./loading.svelte";
    import { navigating } from '$app/stores';
</script>
{#if $navigating}
	<Loading />
{:else}
	<slot />
{/if}

