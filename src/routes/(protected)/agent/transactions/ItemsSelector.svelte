<script>
    import { Dropdown, DropdownItem } from "flowbite-svelte";
    import { MagnifyingGlassSolid } from "svelte-awesome-icons";

    export let items ;
    export let selectedItems;
    console.log(items);
    let itemName = '';
    let showItemDropdown = false;
    let focusedIndex = -1;
    let itemSearchBox;
    let filteredItems = items;
    $: filteredItems = items.filter((item) => item.name.toLowerCase().includes(itemName.toLowerCase()));
    
    const handleItemKey = (event) => {
        if (event.key === "ArrowDown") {
            focusedIndex = (focusedIndex + 1);
            if(focusedIndex === filteredItems.length) focusedIndex = -1;
            event.preventDefault(); // Prevent scrolling the page
        } else if (event.key === "ArrowUp") {
            focusedIndex = (focusedIndex==-1)?filteredItems.length-1:(focusedIndex - 1);
            event.preventDefault(); // Prevent scrolling the page
        } else if (event.key === "Enter") {
            // Implement what happens when an item is selected via Enter key
            if(focusedIndex!=-1){
                itemName = filteredItems[focusedIndex].name;
                addItem(focusedIndex);
                focusedIndex = -1;
                showItemDropdown = false;
            } 
            else{
                if(filteredItems.length==0 || filteredItems[0].name.toLowerCase()!=itemName.toLowerCase()){
                    console.log("Please Select a valid item");
                }
                else {
                    itemName = filteredItems[0].name;
                    addItem(0);
                    showItemDropdown = false;
                }

            }
            event.preventDefault(); // Prevent submitting the form
        }
        else{
            showItemDropdown = true;
            focusedIndex = -1;
        }
    }
    const handleNumKey = (event) => {
        if (event.key === "Enter"){
            event.preventDefault();
            itemSearchBox.focus();
        }
    }
    function addItem(index){
        let item = {
            productId: filteredItems[index].id,
            name: filteredItems[index].name,
            price: filteredItems[index].unitPrice,
            taxPercentage: filteredItems[index].taxPercentage,
            tax: 0,
            unit: filteredItems[index].unit,
            imageLink: filteredItems[index].imageLink,
            quantity: null,
            total: 0,
        };
        selectedItems = [...selectedItems, item];
        items = items.filter((it) => item.productId !== it.id);
        itemName = '';
        showItemDropdown = false;
    }

    function removeItem(index){
        let item = {
            id: selectedItems[index].productId,
            name: selectedItems[index].name,
            unitPrice: selectedItems[index].price,
            taxPercentage: selectedItems[index].taxPercentage,
            unit: selectedItems[index].unit,
            imageLink: selectedItems[index].imageLink,
        }
        items = [...items, item];
        selectedItems = selectedItems.filter((it, i) => i !== index);
        itemSearchBox.focus();
    }
    
</script>

<style>
    input {
        background-color: #FDFFF5;
        --tw-ring-color: #BFF8A4;
    }
    input:focus {
        --tw-ring-color: #27C848;
        border-color: #27C848;
    }
</style>

<div class="grid grid-cols-5 gap-3 place-items-stretch">
    <div class="text-sm text-custom_font-deep font-bold col-span-2 text-left">Product</div>
    <div class="text-sm text-custom_font-deep font-bold text-right">Unit Price</div>
    <div class="text-sm text-custom_font-deep font-bold text-right">Quantity</div>
    <div class="text-sm text-custom_font-deep font-bold text-right">Subtotal</div>
    {#if selectedItems.length > 0}
        {#each selectedItems as item,index}
            <input type="search" class="w-full p-2 border-2 border-divider_col rounded-md text-sm col-span-2" value={item.name} on:keydown={(event)=> event.preventDefault()} on:input|preventDefault={()=> {removeItem(index)} } />
            <input class="w-full p-2 border-2 border-divider_col rounded-md text-sm text-right" value={`${item.price}/${item.unit}`} disabled/>
            <input type="number" class="w-full p-2 border-2 border-divider_col rounded-md text-sm text-right" bind:value={item.quantity} on:input={()=>{item.quantity = Math.max(item.quantity,0);item.total=item.quantity*item.price; item.tax = Math.round(item.total*item.taxPercentage/100);}} on:keydown={handleNumKey} autofocus required/>
            <input type="number" class="w-full p-2 border-2 border-divider_col rounded-md text-sm text-right" value={item.total} disabled/>
        {/each}
        <div class="relative col-span-2">
            <MagnifyingGlassSolid class="absolute left-3 top-2 w-4 text-slate-500"/>
            <input type="search" id="item-search" class="w-full p-2 border-2 border-divider_col rounded-md indent-8 text-sm" bind:value={itemName} on:keydown={handleItemKey} on:focus={()=> showItemDropdown=true} bind:this={itemSearchBox} on:click={() =>console.log("clicked")} placeholder="Search"/>

        </div>
    {:else}
        <div class="relative col-span-2">
            <MagnifyingGlassSolid class="absolute left-3 top-2 w-4 text-slate-500"/>
            <input type="search" id="item-search" class="w-full p-2 border-2 border-divider_col rounded-md indent-8 text-sm" bind:value={itemName} on:keydown={handleItemKey} on:focus={()=> showItemDropdown=true} bind:this={itemSearchBox} on:click={() =>console.log("clicked")} placeholder="Search" autofocus required/>
        </div>
    {/if}
    {#if filteredItems.length > 0}
        <Dropdown bind:open={showItemDropdown} class="w-full max-h-80 overflow-y-auto" containerClass="divide-y z-50 w-2/5" >
            {#each filteredItems as item, index}
                {#if index === focusedIndex}
                    <DropdownItem 
                    on:click={() => (itemName = item.name, focusedIndex = -1, showItemDropdown = false, addItem(index))
                    } class="bg-gray-100 hover:bg-gray-100">{item.name}</DropdownItem>
                {:else}
                    <DropdownItem 
                    on:click={() => (itemName = item.name,  showItemDropdown = false, addItem(index))
                    }>{item.name}</DropdownItem>
                {/if}
            {/each}
        </Dropdown>
    {/if}
    <input type="number" class="w-full p-2 border-2 border-divider_col rounded-md text-sm" disabled/>
    <input type="number" class="w-full p-2 border-2 border-divider_col rounded-md text-sm" disabled/>
    <input type="number" class="w-full p-2 border-2 border-divider_col rounded-md text-sm" disabled/>
</div>

