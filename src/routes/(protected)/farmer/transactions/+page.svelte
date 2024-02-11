<script>
    import TransactionsTab from '../../TransactionsTab.svelte';
    import RolledSidebar from '../RolledSidebar.svelte';
    import Sidebar from '../Sidebar.svelte';
    import Header from '../../Header.svelte';
    import { page } from '$app/stores';
    let transactions=[];
    transactions=$page.data.data;
    $: ongoing=transactions.filter(t=>t.status=="pending")
    $: completed=transactions.filter(t=>t.status!="pending")
    let focused=false;
</script>

<div class="flex flex-row">
    {#if focused}
    <Sidebar bind:focused={focused}/>
    {:else}    
    <RolledSidebar bind:focused={focused}/>
    {/if}
    <div class="w-full h-screen p-5">
        <Header page="Transactions"/>
        <TransactionsTab bind:ongoing={ongoing} bind:transactions={completed}/>
    </div>
</div>