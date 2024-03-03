<script>
	import { onMount } from 'svelte';
    import { Stretch, SyncLoader, Wave, Pulse, Shadow, Moon, Plane } from 'svelte-loading-spinners';

    let val = 0;

    onMount(() => {
        val = Math.floor((Math.random() * 100))%7;
    });
</script>

<center class="grow grid grid-cols-1 place-items-center h-full">
{#if val == 0}
    <Stretch size="100" color="#27c848"/>
{:else if val == 1}
    <SyncLoader size="100" color="#27c848"/>
{:else if val == 2}
    <Wave size="100" color="#27c848"/>
{:else if val == 3}
    <Pulse size="100" color="#27c848"/>
{:else if val == 4}
    <Shadow size="100" color="#27c848"/>
{:else if val == 5}
    <Moon size="100" color="#27c848"/>
{:else if val == 6}
    <Plane size="100" color="#27c848"/>
{/if}
</center>

