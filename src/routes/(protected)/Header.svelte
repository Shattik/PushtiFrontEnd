<script>
    import { BellSolid, CircleInfoSolid, GearSolid } from 'svelte-awesome-icons';
    import { Avatar } from 'flowbite-svelte';
    import { get } from 'svelte/store';
    import { avatar } from '$lib/Components/avatar.js';

	export let page="";
    export let avatarLink=get(avatar);
</script>

<div class="flex flex-row justify-between items-center">
        <h1 class="text-xl text-custom_font-deep font-bold ms-1">{page}</h1>
        <div class="flex flex-row space-x-3 items-center">
            <BellSolid class="w-5 h-5 text-logo-1"/>
            <CircleInfoSolid class="w-5 h-5 text-logo-1"/>
            <GearSolid class="w-5 h-5 text-logo-1"/>
            <Avatar class="ms-3 w-8 h-76 ring-border-custom" src={avatarLink} />   
        </div> 
    </div>
    <hr class="mt-3 border-divider_col shadow"/>
    <hr class="mb-3 border-divider_col shadow"/>

