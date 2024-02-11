<script>
    import TransactionsTab from '../../TransactionsTab.svelte';
    import RolledSidebar from '../RolledSidebar.svelte';
    import Sidebar from '../Sidebar.svelte';
    import Header from '../../Header.svelte';
    import { page } from '$app/stores';
    import { Tabs, TabItem } from 'flowbite-svelte';
    let transactions=[
        {
            "transactionid": "7",
            "total": "6000",
            "totalTax": "119",
            "totalDeduction": "588",
            "cashback": "11",
            "timestamp": "2024-02-10T21:16:54.549Z",
            "status": "pending",
            "buyitems": [
                {
                    "tid": 7,
                    "productname": "Buffalo meat",
                    "unit": "kg",
                    "quantity": 12,
                    "tax": 120,
                    "totalPrice": 6000
                }
            ]
        },
        {
            "transactionid": "6",
            "total": "2500",
            "totalTax": "50",
            "totalDeduction": "245",
            "cashback": "4",
            "timestamp": "2024-02-10T21:15:29.755Z",
            "status": "pending",
            "buyitems": [
                {
                    "tid": 6,
                    "productname": "Buffalo meat",
                    "unit": "kg",
                    "quantity": 5,
                    "tax": 50,
                    "totalPrice": 2500
                }
            ]
        },
        {
            "transactionid": "5",
            "total": "3640",
            "totalTax": "73",
            "totalDeduction": "357",
            "cashback": "6",
            "timestamp": "2024-02-10T21:11:38.868Z",
            "status": "pending",
            "buyitems": [
                {
                    "tid": 5,
                    "productname": "Chicken meat",
                    "unit": "kg",
                    "quantity": 6,
                    "tax": 18,
                    "totalPrice": 900
                },
                {
                    "tid": 5,
                    "productname": "Goose egg",
                    "unit": "piece",
                    "quantity": 30,
                    "tax": 5,
                    "totalPrice": 240
                },
                {
                    "tid": 5,
                    "productname": "Buffalo meat",
                    "unit": "kg",
                    "quantity": 5,
                    "tax": 50,
                    "totalPrice": 2500
                }
            ]
        }
    ]
    let buy=$page.data.buy;
    let sell=$page.data.sell;
    $: ongoingBuy=buy.filter(t=>t.status=="pending")
    $: completedBuy=buy.filter(t=>t.status!="pending")
    $: ongoingSell=sell.filter(t=>t.status=="pending")
    $: completedSell=sell.filter(t=>t.status!="pending")
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
        <Tabs style="underline" contentClass="p-4 bg-divider_col rounded-lg dark:bg-gray-800 mt-4 ">
            <TabItem open title="Sell" >
                <TransactionsTab bind:ongoing={ongoingSell} bind:transactions={completedSell} userType="SME"/>
            </TabItem>
            <TabItem title="Buy" >
                <TransactionsTab bind:ongoing={ongoingBuy} bind:transactions={completedBuy} tableType="Buy" userType="SME"/>
            </TabItem>
        </Tabs>
    </div>
</div>