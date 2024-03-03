<script>
    import "../app.pcss";
    import Loading from "./loading.svelte";
    import { navigating } from '$app/stores';
</script>
{#if $navigating}
    <div class="h-screen">
	    <Loading />
    </div>
{:else}
	<slot />
{/if}

