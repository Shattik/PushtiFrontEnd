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
    let focused = false;
    let showBuyFarmerModal = false;
    let showFarmerDropdown = true;
    let showBuySMEModal = false;
    let showSellSMEModal = false;
    let showSellVendorModal = false;
    let farmers = [
        {
            "nid": "1234567890",
            "phone": "1234567890",
            "name": "test",
            "avatarLink": "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
            "permanentAddress": "test",
            "rank": "Iron",
            "points": "0",
            "farmerType": "Dairy",
            "cashback": 0,
            "taxDeduction": 0
        },
        {
            "nid": "123",
            "phone": "123",
            "name": "hojoborolo",
            "avatarLink": "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
            "permanentAddress": "123",
            "rank": "Bronze",
            "points": "330",
            "farmerType": "Dairy",
            "cashback": 0.5,
            "taxDeduction": 1.2
        }
    ];
    let farmerItems = [
        {
            "id": "3",
            "name": "Buffalo Milk",
            "unit": "kg",
            "unitPrice": 120,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "2",
            "name": "Goat Milk",
            "unit": "kg",
            "unitPrice": 130,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "4",
            "name": "Sheep milk",
            "unit": "kg",
            "unitPrice": 50,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "5",
            "name": "Cow meat",
            "unit": "kg",
            "unitPrice": 650,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "6",
            "name": "Goat meat",
            "unit": "kg",
            "unitPrice": 800,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "7",
            "name": "Buffalo meat",
            "unit": "kg",
            "unitPrice": 500,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "8",
            "name": "Sheep meat",
            "unit": "kg",
            "unitPrice": 450,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "9",
            "name": "Chicken meat",
            "unit": "kg",
            "unitPrice": 150,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "10",
            "name": "Duck meat",
            "unit": "piece",
            "unitPrice": 200,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "11",
            "name": "Goose meat",
            "unit": "kg",
            "unitPrice": 220,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "12",
            "name": "Chicken egg",
            "unit": "piece",
            "unitPrice": 10,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "13",
            "name": "Duck egg",
            "unit": "piece",
            "unitPrice": 8,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "14",
            "name": "Goose egg",
            "unit": "piece",
            "unitPrice": 8,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "15",
            "name": "Butter",
            "unit": "litre",
            "unitPrice": 80,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "16",
            "name": "Rosogolla",
            "unit": "kg",
            "unitPrice": 250,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "17",
            "name": "Roshmalai",
            "unit": "kg",
            "unitPrice": 300,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "18",
            "name": "Khir",
            "unit": "kg",
            "unitPrice": 280,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "1",
            "name": "Cow Milk",
            "unit": "kg",
            "unitPrice": 80,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "22",
            "name": "Cheese",
            "unit": "kg",
            "unitPrice": 250,
            "taxPercentage": 2,
            "imageLink": null
        },
        {
            "id": "24",
            "name": "Curd",
            "unit": "kg",
            "unitPrice": 250,
            "taxPercentage": 3,
            "imageLink": null
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

    let farmerBuyHistory=[
        {
            "transactionid": "3",
            "farmername": "hojoborolo",
            "avatarLink": "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
            "phone": "123",
            "total": "100",
            "totalTax": "100",
            "totalDeduction": "0",
            "cashback": "0",
            "timestamp": "2024-02-08T12:41:56.854Z",
            "status": "approved",
            "buyitems": [
                {
                    "tid": 3,
                    "productname": "Cow Milk",
                    "unit": "kg",
                    "quantity": 5,
                    "tax": 10,
                    "totalPrice": 300
                },
                {
                    "tid": 3,
                    "productname": "Goat Milk",
                    "unit": "kg",
                    "quantity": 10,
                    "tax": 12,
                    "totalPrice": 350
                }
            ]
        },
        {
            "transactionid": "2",
            "farmername": "hojoborolo",
            "avatarLink": "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
            "phone": "123",
            "total": "100",
            "totalTax": "100",
            "totalDeduction": "0",
            "cashback": "0",
            "timestamp": "2024-02-08T12:40:51.698Z",
            "status": "rejected",
            "buyitems": [
                {
                    "tid": 2,
                    "productname": "Cow Milk",
                    "unit": "kg",
                    "quantity": 5,
                    "tax": 10,
                    "totalPrice": 300
                },
                {
                    "tid": 2,
                    "productname": "Goat Milk",
                    "unit": "kg",
                    "quantity": 10,
                    "tax": 12,
                    "totalPrice": 350
                }
            ]
        },
        {
            "transactionid": "1",
            "farmername": "hojoborolo",
            "avatarLink": "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
            "phone": "123",
            "total": "100",
            "totalTax": "100",
            "totalDeduction": "0",
            "cashback": "0",
            "timestamp": "2023-12-05T18:05:17.000Z",
            "status": "approved",
            "buyitems": [
                {
                    "tid": 1,
                    "productname": "Cow Milk",
                    "unit": "kg",
                    "quantity": 5,
                    "tax": null,
                    "totalPrice": null
                },
                {
                    "tid": 1,
                    "productname": "Goat Milk",
                    "unit": "kg",
                    "quantity": 2,
                    "tax": null,
                    "totalPrice": null
                }
            ]
        }
    ]

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
                    <TransactionTable tableTitle="Buy History" userType="farmer" transactions={farmerBuyHistory}/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showBuyFarmerModal = true)}>Add Buy Record</Button>   
                    </div>
                    
                </div>
            </TabItem>
            <TabItem title="SME" >
                <div class="space-y-3">
                    <TransactionTable tableTitle="Sell History" transactionPerPage="6"/>
                    <div class="w-full grid grid-cols-1 place-items-end">
                        <Button class="bg-logo-1 text-white" on:click={() => (showSellSMEModal = true)}>Add Sell Record</Button>   
                    </div>
                    <TransactionTable tableTitle="Buy History" transactionPerPage="6"/>
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
    <form class="flex flex-col space-y-2" on:submit|preventDefault={addFarmerBuy}>
        <BuyModalContent bind:farmerItems={farmerItems} bind:farmers={farmers} bind:buyRequestFarmer={buyRequestFarmer} type="SME"/>
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