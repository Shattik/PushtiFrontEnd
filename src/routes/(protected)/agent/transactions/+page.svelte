<script>
  import BuyModalContent from './BuyModalContent.svelte';

    import { Alert, Avatar, Button, Dropdown, DropdownItem, Label, Modal, Search, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, Tabs } from 'flowbite-svelte';
    import RolledSidebar from '../RolledSidebar.svelte';
    import Sidebar from '../Sidebar.svelte';
    import TransactionTable from './TransactionTable.svelte';
    import Header from '../../Header.svelte';
    import { BanSolid, MagnifyingGlassSolid } from 'svelte-awesome-icons';
    import ItemsSelector from './ItemsSelector.svelte';
    let focused = false;
    let showBuyFarmerModal = true;
    let showFarmerDropdown = true;
    let farmers = [
        {name: 'John Doe', id: 1},
        {name: 'Jane Doe', id: 2},
        {name: 'John Doe', id: 3},
        {name: 'Jane Doe', id: 4},
    ];
    let farmerItems = [
        {
            id: 1,
            name: "Item 1",
            price: 100,
        },
        {
            id: 2,
            name: "Item 2",
            price: 200,
        },
        {
            id: 3,
            name: "Item 3",
            price: 300,
        },
        {
            id: 4,
            name: "Item 4",
            price: 400,
        },
        {
            id: 5,
            name: "Item 5",
            price: 500,
        },
        {
            id: 6,
            name: "Item 6",
            price: 600,
        },
        {
            id: 7,
            name: "Item 7",
            price: 700,
        },
        {
            id: 8,
            name: "Item 8",
            price: 800,
        },
        {
            id: 9,
            name: "Item 9",
            price: 900,
        },
        {
            id: 10,
            name: "Item 10",
            price: 1000,
        }
    ];
    let buyRequestFarmer={
        farmer: null,
        items: [],
        total: 0,
        dueDeduction: 0,
        taxAmount: 0,
        cashBack: 0,
        finalAmount: 0
    }
    const addFarmerBuy = () => {
        console.log('Adding a new buy record');
        console.log(farmerItems);
    }

</script>



<div class="flex flex-row">
    {#if focused}
        <Sidebar bind:focused />
    {:else}
        <RolledSidebar bind:focused />
    {/if}
    <div class="w-full h-screen p-5">
        <Header page="Loan Requests" />
        <Tabs style="underline" contentClass="p-4 bg-divider_col rounded-lg dark:bg-gray-800 mt-4 h-5/5">
            <TabItem open title="Farmer" >
                <div class="space-y-3">
                    <TransactionTable tableTitle="Buy History"/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showBuyFarmerModal = true)}>Add Buy Record</Button>   
                    </div>
                    
                </div>
            </TabItem>
            <TabItem title="SME" >
                <div class="space-y-3">
                    <TransactionTable tableTitle="Sell History" transactionPerPage="6"/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showSellSMEModal = true)}>Add Buy Record</Button>   
                    </div>
                    <TransactionTable tableTitle="Buy History" transactionPerPage="6"/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showBuySMEModal = true)}>Add Buy Record</Button>   
                    </div>
                </div>
            </TabItem>
            <TabItem title="Vendor" >
                <TransactionTable tableTitle="Sell History"/>
                <div class="w-full grid grid-cols-1 place-items-end">
                    <Button class="bg-logo-1 text-white" on:click={() => (showSellVendorModal = true)}>Add Sell Record</Button>   
                </div>  
            </TabItem>
        </Tabs>
    </div>
</div>

<Modal bind:open={showBuyFarmerModal} size="md" autoclose={false} class="w-full bg-body_custom" bodyClass="p-6 space-y-6 flex-1">
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addFarmerBuy}>
        <BuyModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:buyRequestFarmer={buyRequestFarmer}/>
        <Button type="submit" class="w-full mt-2">Submit your request</Button>
    </form>
</Modal>

<Modal bind:open={showBuySMEModal} size="md" autoclose={false} class="w-full bg-body_custom" bodyClass="p-6 space-y-6 flex-1">
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addFarmerBuy}>
        <BuyModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:buyRequestFarmer={buyRequestFarmer}/>
        <Button type="submit" class="w-full mt-2">Submit your request</Button>
    </form>
</Modal>

<Modal bind:open={showSellSMEModal} size="md" autoclose={false} class="w-full bg-body_custom" bodyClass="p-6 space-y-6 flex-1">
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addFarmerBuy}>
        <BuyModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:buyRequestFarmer={buyRequestFarmer}/>
        <Button type="submit" class="w-full mt-2">Submit your request</Button>
    </form>
</Modal>

<Modal bind:open={showSellVendorModal} size="md" autoclose={false} class="w-full bg-body_custom" bodyClass="p-6 space-y-6 flex-1">
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addFarmerBuy}>
        <BuyModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:buyRequestFarmer={buyRequestFarmer}/>
        <Button type="submit" class="w-full mt-2">Submit your request</Button>
    </form>
</Modal>