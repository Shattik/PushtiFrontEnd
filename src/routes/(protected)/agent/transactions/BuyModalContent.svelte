<script>
    import { Alert, Avatar, Button, Dropdown, DropdownItem, Label, Modal, Search, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, Tabs } from 'flowbite-svelte';
    import { BanSolid, MagnifyingGlassSolid } from 'svelte-awesome-icons';
    import ItemsSelector from './ItemsSelector.svelte';
    import { onMount } from 'svelte';
    import { get } from "svelte/store";
    import { jwtToken } from "$lib/Components/token.js";
    import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";
    let showFarmerDropdown = true;
    export let farmers = [];
    export let type = "Farmer";
    export let farmerItems = [];
    let selectedFarmerItems = [];
    let focusedIndex = -1;
    let farmerName = '';
    let farmerError="";
    let selectedFarmer = null;
    let filteredFarmers = farmers;
    export let buyRequestFarmer={
        farmerNid: null,
        farmername: "",
        avatarLink: "",
        phone: "",
        items: [],
        total: 0,
        totalTax: 0,
        totalDeduction: 0,
        cashback: 0,
        finalAmount:0,

    }
    $: filteredFarmers = farmers.filter((farmer) => farmer.name.toLowerCase().includes(farmerName.toLowerCase()));
    $: buyRequestFarmer.farmerNid = selectedFarmer?.nid;
    $: buyRequestFarmer.farmername = selectedFarmer?.name;
    $: buyRequestFarmer.avatarLink = selectedFarmer?.avatarLink;
    $: buyRequestFarmer.phone = selectedFarmer?.phone;
    $: buyRequestFarmer.items = selectedFarmerItems;
    $: buyRequestFarmer.total = selectedFarmerItems.reduce((acc, item) => acc + item.total, 0);
    $: buyRequestFarmer.totalTax = Math.round(selectedFarmerItems.reduce((acc, item) => acc + item.tax, 0)*(1-selectedFarmer?.taxDeduction/100));
    $: buyRequestFarmer.totalDeduction = Math.min(selectedFarmer?.remaining,Math.round((buyRequestFarmer.total-buyRequestFarmer.totalTax) * selectedFarmer?.deduction/100));
    $: buyRequestFarmer.cashback = Math.round((buyRequestFarmer.total-buyRequestFarmer.totalTax-buyRequestFarmer.totalDeduction) * selectedFarmer?.cashback/100);
    $: buyRequestFarmer.finalAmount = buyRequestFarmer.total - buyRequestFarmer.totalDeduction - buyRequestFarmer.totalTax + buyRequestFarmer.cashback;
    
    onMount(async() => {
        const res= await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/buy/request/${type.toLowerCase()}  `, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: get(jwtToken),
            },
        });
        let data=await res.json();
        console.log(data);
        if(type==="Farmer"){
            farmers=data.farmers;
        }
        else{
            farmers=data.smes;
        }
        farmerItems=data.products;
    });

    function handleFarmerKey(event) {
        if (event.key === "ArrowDown") {
            focusedIndex = (focusedIndex + 1);
            if(focusedIndex === filteredFarmers.length) focusedIndex = -1;
            event.preventDefault(); // Prevent scrolling the page
        } else if (event.key === "ArrowUp") {
            focusedIndex = (focusedIndex==-1)?filteredFarmers.length-1:(focusedIndex - 1);
            event.preventDefault(); // Prevent scrolling the page
        } else if (event.key === "Enter") {
            // Implement what happens when an item is selected via Enter key
            if(focusedIndex!=-1){
                farmerName = filteredFarmers[focusedIndex].name;
                selectedFarmer = filteredFarmers[focusedIndex];
                focusedIndex = -1;
                showFarmerDropdown = false;
                farmerError="";
            }
            else{
                if(filteredFarmers.length==0 || filteredFarmers[0].name.toLowerCase()!=farmerName.toLowerCase()){
                    farmerError = `Please Select a valid ${type}`;
                }
                else {
                    farmerError="";
                    showFarmerDropdown = false;
                    selectedFarmer = filteredFarmers[0];
                    
                }
            } // Prevent submitting the form
        }
        else{
            let prev=showFarmerDropdown;
            showFarmerDropdown = true;
            focusedIndex = -1;
            selectedFarmer = null;
            farmerError="";
            console.log(prev);
            console.log(showFarmerDropdown);
        }
    }
</script>

<style>
    input[type="search"] {
        background-color: #FDFFF5;
        --tw-ring-color: #BFF8A4;
        border-color: #BFF8A4;
    }
</style>

<h3 class="mb-1 text-xl font-medium text-custom_font-deep text-center dark:text-white">Create a Buy Request</h3>
        {#if farmerError}
                <Alert color="red" border dismissable on:close={()=>{farmerError=""}}>
                    <BanSolid slot="icon" class="w-4 h-4"/>
                    <span class="font-medium">{farmerError}</span>
                </Alert>
		{/if}
        <Label class="space-y-2 mb-1">
            <span class="text-md text-custom_font-deep font-bold ">{type}: </span>
            <div class="relative">
                <MagnifyingGlassSolid class="absolute left-3 top-2 w-4 text-slate-500"/>
                <input type="search" id="farmer-search" class="w-full p-2 border-2 border-divider_col rounded-md indent-8 text-sm" bind:value={farmerName} on:keydown={handleFarmerKey} on:focus={()=> showFarmerDropdown=true} on:click={() =>console.log("clicked")} placeholder="Search" autofocus required/>
            </div>
            {#if filteredFarmers.length > 0 }
                <Dropdown bind:open={showFarmerDropdown}  class="w-full overflow-y-auto max-h-80" containerClass="divide-y z-50 w-11/12" >
                    {#each filteredFarmers as farmer,index}
                        {#if index === focusedIndex}
                            <DropdownItem 
                            on:click={() => (farmerName = farmer.name, focusedIndex = -1, selectedFarmer = farmer, showFarmerDropdown = false)
                            } class="bg-gray-100 hover:bg-gray-100">{farmer.name}</DropdownItem>
                        {:else}
                            <DropdownItem 
                            on:hover={() => focusedIndex = index} 
                            on:click={() => (farmerName = farmer.name, selectedFarmer = farmer, showFarmerDropdown = false )}
                            >{farmer.name}</DropdownItem>
                        {/if}
                    {/each}
                </Dropdown>
            {/if}
        </Label>
        {#if selectedFarmer}
            <div class="flex items-center p-4 py-4 w-full border-2 rounded-lg border-divider_col">
                <Avatar class="w-48 h-48 ring-border_custom me-12" src={selectedFarmer.avatarLink} border/>
                <Table divClass="grow relative overflow-x-auto bg-body_custom">
                    <TableBody>
                        <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md bg-body_custom">
                            <TableBodyCell class="w-56 text-custom_font-deep font-bold">Name</TableBodyCell>
                            <TableBodyCell class="text-custom_font-light">{selectedFarmer.name}</TableBodyCell>
                        </TableBodyRow>
                        {#if type === "Farmer"}
                        <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md bg-body_custom">
                            <TableBodyCell class="text-custom_font-deep font-bold">Type</TableBodyCell>
                            <TableBodyCell class="text-custom_font-light">{selectedFarmer.farmerType}</TableBodyCell>
                        </TableBodyRow>
                        {/if}
                        <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md bg-body_custom">
                            <TableBodyCell class="text-custom_font-deep font-bold">Phone</TableBodyCell>
                            <TableBodyCell class="text-custom_font-light">{selectedFarmer.phone}</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md bg-body_custom">
                            <TableBodyCell class="text-custom_font-deep font-bold">Rank</TableBodyCell>
                            <TableBodyCell class="text-custom_font-light">{selectedFarmer.rank}</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
            <ItemsSelector bind:items={farmerItems} bind:selectedItems={selectedFarmerItems}/>
            <div class="text-sm flex flex-col p-4 py-4 w-full border-2 rounded-lg border-divider_col">
                <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                    <div class="grow "><span class="texttext-custom_font-table-header font-bold">Total</span></div>
                    <div class="text-custom_font-table-header text-right">{buyRequestFarmer.total}</div>
                </div>
                <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                    <div class="grow "><span class="text-custom_font-table-header font-bold">Due Deduction</span></div>
                    <div class="text-custom_font-table-header text-right">{buyRequestFarmer.totalDeduction}</div>
                </div>
                <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                    <div class="grow "><span class="text-custom_font-table-header font-bold">Tax Amount</span></div>
                    <div class="text-custom_font-table-header text-right">{buyRequestFarmer.totalTax}</div>
                </div>
                <div class="flex flex-row p-3 px-6 border-divider_col bg-body_custom">
                    <div class="grow "><span class="text-custom_font-table-header font-bold">Cash Back</span></div>
                    <div class="text-custom_font-table-header text-right">{buyRequestFarmer.cashback}</div>
                </div>
                <div class="grow bg-body_custom">
                </div>
                <div class="flex flex-row p-3 px-6 border-t-2 border-divider_col bg-body_custom">
                    <div class="grow"><span class="text-custom_font-table-header font-bold">Final Amount</span></div>
                    <div class="text-custom_font-table-header text-right">{buyRequestFarmer.finalAmount}</div>
                </div>
            </div>
        {/if}

