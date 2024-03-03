<script>
    import { BellSolid, CircleInfoSolid, GearSolid } from 'svelte-awesome-icons';
    import { Avatar, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { get } from 'svelte/store';
    import { avatar, name } from '$lib/Components/avatar.js';
    import { jwtToken } from '$lib/Components/token.js';
    import { goto } from '$app/navigation';
	export let page="";
    export let avatarLink=get(avatar);
    export let userName=get(name);
    function logout(){
        jwtToken.set("");
        goto("/login");
    }
    let placement='bottom-end';
</script>

<div class="flex flex-row justify-between items-center">
    <h1 class="text-xl text-custom_font-deep font-bold ms-1">{page}</h1>
    <div class="flex flex-row space-x-3 items-center">
        <BellSolid class="w-5 h-5 text-logo-1"/>
        <CircleInfoSolid class="w-5 h-5 text-logo-1"/>
        <GearSolid class="w-5 h-5 text-logo-1"/>
        <Avatar id="avatar" class="ms-3 w-8 h-8 ring-border-custom" src={avatarLink} />   
    </div> 
</div>
<hr class="mt-3 border-divider_col shadow"/>
<hr class="mb-3 border-divider_col shadow"/>

<Dropdown {placement} triggeredBy ="#avatar" class="w-48">
    <div slot="header" class="px-4 py-2">
        <span class="block text-gray-900 dark:text-white">Hi, {userName}</span>
    </div>
    <DropdownItem href="\settings" disabled>Settings</DropdownItem>
    <DropdownItem on:click={logout}>Log Out</DropdownItem>
</Dropdown>