<script>
    import RolledSidebar from '../RolledSidebar.svelte';
    import Sidebar from '../Sidebar.svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	let list = [1, 2, 3];

    let focused=false;
</script>


<div class="flex flex-row">
    {#if focused}
    <Sidebar bind:focused={focused}/>
    {:else}    
    <RolledSidebar bind:focused={focused}/>
    {/if}
<div class="w-full h-screen bg-red-500">
    <h1>Dashboard</h1>
    {#each list as n (n)}
	<div animate:flip={{ delay: 250, duration: 250, easing: quintOut }}>
		{n}
	</div>
{/each}
</div>
</div>