<script>
  import Header from '../../Header.svelte';
    import { onMount } from 'svelte';
    import { Avatar, Button, Card, Progressbar, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
    import RolledSidebar from '../RolledSidebar.svelte';
    import Sidebar from '../Sidebar.svelte';
    import { sineOut } from 'svelte/easing';
    import { twJoin } from 'tailwind-merge';
    import { StarRegular } from 'svelte-awesome-icons';
    import { SvelteComponent } from 'svelte';
   
    /** @type { SvelteComponent } */
	let card;

    let farmer={
        name:"Bonnie Green",
        nid:"1234567890",
        type:"Dairy",
        agent:"John Doe",
        points:100,
        more_points:200,
        rank:"Gold",
        next_rank:"Platinum",   
        benefits:[
            "Free insurance",
            "Free seeds",
        ]
    }
    let progress=0;
    let focused=false;
    let textColor="text-rank-"+farmer.rank.toLowerCase();  
    let nextRankColor="text-rank-"+farmer.next_rank.toLowerCase(); 
    let hex="-[#ffd700]";

    onMount(async () => {
        progress=farmer.points/(farmer.points+farmer.more_points)*100; 
        card=card;
    });

</script>

<div class="hidden">
    <p class="text-rank-gold bg-rank-gold">Gold</p>
</div>

<div class="flex flex-row">
    {#if focused}
    <Sidebar bind:focused={focused}/>
    {:else}    
    <RolledSidebar bind:focused={focused}/>
    {/if}
    <div class="w-full h-screen p-5">
    <Header page="Dashboard"/>
    <Card class="max-w-full w-full bg-body_custom" padding="md" horizontal>
        <div class="flex items-center pb-4 w-full">
            <Avatar class="w-48 h-48 ring-border_custom me-12" border/>
            <Table divClass="grow relative overflow-x-auto">
                <TableBody>
                    <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="w-56 text-custom_font-deep font-bold">Name</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{farmer.name}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">NID</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{farmer.nid}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Type</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{farmer.type}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Agent</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{farmer.agent}</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
    </Card>

    <hr class="mt-3 border-divider_col shadow"/>
    <hr class="mb-3 border-divider_col shadow"/>

    <Card bind:this={card} class="max-w-full w-full bg-body_custom">
        <div class="flex flex-row justify-between items-center mb-3">
            
            <h1 class= {twJoin("text-xl font-bold", textColor)}>{farmer.rank}</h1>
            <h1 class="text-xl text-custom_font-deep font-bold ms-1">{farmer.points} Points</h1>
        </div>
        <Progressbar {progress} animate tweenDuration={1500} easing={sineOut} size="h-3"  class="mb-3 bg-primary-200" labelInside labelInsideClass="h-3 text-transparent text-xs font-medium text-center p-0.5 leading-none rounded-full bg-rank-{farmer.rank.toLowerCase()}"/>
        <p class="text-lg text-custom_font-deep font-medium">{farmer.more_points} points to <span class={twJoin("text-lg font-medium", nextRankColor)}>{farmer.next_rank}</span></p>
        <p class="my-3"><span class={twJoin("text-xl font-medium", textColor)}>Your Rewards</span></p>
        {#each farmer.benefits as benefit}
        <div class="flex flex-row">
            <StarRegular class="w-6 h-6 me-3 mb-4 text-rank-{farmer.rank.toLowerCase()}"/>
            <p class="text-lg text-custom_font-deep font-medium">{benefit}</p>
        </div>
        {/each}
    </Card>

    <hr class="mt-3 border-divider_col shadow"/>
    <hr class="mb-3 border-divider_col shadow"/>

    <!-- Insert chart for card here -->
</div>
</div>