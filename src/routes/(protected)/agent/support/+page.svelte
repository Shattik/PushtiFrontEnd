<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import { Avatar, Button, Search, TabItem, Table, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tabs } from 'flowbite-svelte';

    import { page } from "$app/stores";
    import { ChevronLeftSolid, ChevronRightSolid, MedalSolid, UsersSlashSolid } from "svelte-awesome-icons";

    let focused = false;
    let value = "";
</script>

<div class="flex flex-row">
    {#if focused}
        <Sidebar bind:focused />
    {:else}
        <RolledSidebar bind:focused />
    {/if}
    <div class="w-full h-screen p-5">
        <Header page="Support Inbox" />
    </div>
</div> 