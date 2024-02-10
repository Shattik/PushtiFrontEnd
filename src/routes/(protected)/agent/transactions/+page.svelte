<script>
  import BuyModalContent from './BuyModalContent.svelte';

    import { Alert, Avatar, Button, Dropdown, DropdownItem, Label, Modal, Search, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, Tabs } from 'flowbite-svelte';
    import RolledSidebar from '../RolledSidebar.svelte';
    import Sidebar from '../Sidebar.svelte';
    import TransactionTable from './TransactionTable.svelte';
    import Header from '../../Header.svelte';
    import { BanSolid, MagnifyingGlassSolid } from 'svelte-awesome-icons';
    import ItemsSelector from './ItemsSelector.svelte';
    import SellModalContent from './SellModalContent.svelte';
    import { page } from '$app/stores';
    import { get } from "svelte/store";
    import { jwtToken } from "$lib/Components/token.js";
    import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";

    let focused = false;
    let showBuyFarmerModal = false;
    let showFarmerDropdown = true;
    let showBuySMEModal = false;
    let showSellSMEModal = false;
    let showSellVendorModal = false;
    let farmers = [];
    let farmerItems = [];
    let data = $page.data;
    let buyRequestFarmer={
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
    let buyRequestSME={
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
    const addFarmerBuy = async () => {
        console.log('Adding a new buy record');
        let buyItems = [];
        buyRequestFarmer.items.forEach((item) => {
            buyItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: item.total,
                tax: item.tax,
            });
        });
        const request={
            buyReq:{
                farmerNid : buyRequestFarmer.farmerNid,
                total : buyRequestFarmer.total,
                totalTax : buyRequestFarmer.totalTax,
                totalDeduction : buyRequestFarmer.totalDeduction,
                cashback : buyRequestFarmer.cashback,
            },
            buyItems : buyItems
        }
        let res = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/buy/request/submit/farmer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: get(jwtToken)
            },
            body: JSON.stringify(request),
        });
        if (res.ok) {
            console.log('Buy request submitted successfully');
            let data= await res.json();
            let items=[];
            buyRequestFarmer.items.forEach((item) => {
                items.push({
                    tid: data[0].id,
                    productname: item.itemName,
                    quantity: item.quantity,
                    unit: item.unit,
                    totalPrice: item.total,
                    tax: item.tax,
                });
            });
            let transaction={
                transactionid: data[0].id,
                farmername: buyRequestFarmer.farmername,
                avatarLink: buyRequestFarmer.avatarLink,
                phone: buyRequestFarmer.phone,
                buyitems: items,
                total: buyRequestFarmer.total,
                totalTax: buyRequestFarmer.totalTax,
                totalDeduction: buyRequestFarmer.totalDeduction,
                cashback: buyRequestFarmer.cashback,
                timestamp: data[0].timestamp,
                status: data[0].status,
            }
            farmerBuyHistory=[transaction, ...farmerBuyHistory];
            showBuyFarmerModal = false;
        } else {
            console.log('Failed to submit buy request');
        }
    }
    const addSMEBuy = async () => {
        console.log('Adding a new buy record');
        let buyItems = [];
        buyRequestSME.items.forEach((item) => {
            buyItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: item.total,
                tax: item.tax,
            });
        });
        const request={
            buyReq:{
                smeNid : buyRequestSME.farmerNid,
                total : buyRequestSME.total,
                totalTax : buyRequestSME.totalTax,
                totalDeduction : buyRequestSME.totalDeduction,
                cashback : buyRequestSME.cashback,
            },
            buyItems : buyItems
        }
        let res = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/buy/request/submit/sme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: get(jwtToken)
            },
            body: JSON.stringify(request),
        });
        if (res.ok) {
            console.log('Buy request submitted successfully');
            let data= await res.json();
            let items=[];
            buyRequestSME.items.forEach((item) => {
                items.push({
                    tid: data[0].id,
                    productname: item.itemName,
                    quantity: item.quantity,
                    unit: item.unit,
                    totalPrice: item.total,
                    tax: item.tax,
                });
            });
            let transaction={
                transactionid: data[0].id,
                smename: buyRequestSME.farmername,
                avatarLink: buyRequestSME.avatarLink,
                phone: buyRequestSME.phone,
                buyitems: items,
                total: buyRequestSME.total,
                totalTax: buyRequestSME.totalTax,
                totalDeduction: buyRequestSME.totalDeduction,
                cashback: buyRequestSME.cashback,
                timestamp: data[0].timestamp,
                status: data[0].status,
            }
            smeBuyHistory=[transaction, ...smeBuyHistory];
            showBuySMEModal = false;
        } else {
            console.log('Failed to submit buy request');
        }
    }
    let farmerBuyHistory=data.farmer;
    let smeBuyHistory=data.sme;

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
                    <TransactionTable tableTitle="Buy History" userType="farmer" bind:transactions={farmerBuyHistory}/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showBuyFarmerModal = true)}>Add Buy Record</Button>   
                    </div>
                    
                </div>
            </TabItem>
            <TabItem title="SME" >
                <div class="space-y-3">
                    <TransactionTable tableTitle="Sell History" transactionPerPage={6}/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showSellSMEModal = true)}>Add Sell Record</Button>   
                    </div>
                    <TransactionTable tableTitle="Buy History" transactionPerPage={6} userType="sme" bind:transactions={smeBuyHistory}/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showBuySMEModal = true)}>Add Buy Record</Button>   
                    </div>
                </div>
            </TabItem>
            <TabItem title="Vendor" >
                <div class="space-y-3">
                    <TransactionTable tableTitle="Sell History"/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showSellVendorModal = true)}>Add Sell Record</Button>   
                    </div> 
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
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addSMEBuy}>
        <BuyModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:buyRequestFarmer={buyRequestSME} type="SME"/>
        <Button type="submit" class="w-full mt-2">Submit your request</Button>
    </form>
</Modal>

<Modal bind:open={showSellSMEModal} size="md" autoclose={false} class="w-full bg-body_custom" bodyClass="p-6 space-y-6 flex-1">
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addFarmerBuy}>
        <SellModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:sellRequestFarmer={buyRequestFarmer} type="SME"/>
        <Button type="submit" class="w-full mt-2">Submit your request</Button>
    </form>
</Modal>

<Modal bind:open={showSellVendorModal} size="md" autoclose={false} class="w-full bg-body_custom" bodyClass="p-6 space-y-6 flex-1">
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addFarmerBuy}>
        <SellModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:sellRequestFarmer={buyRequestFarmer} type="Vendor"/>
        <Button type="submit" class="w-full mt-2">Submit your request</Button>
    </form>
</Modal>