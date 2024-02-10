<script>
    import { Avatar, Button, Dropdown, DropdownItem, Table, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { LinkSlashSolid, ChevronLeftSolid, ChevronRightSolid, SlidersSolid } from "svelte-awesome-icons";
    import { slide } from "svelte/transition";


    export let transactions=[
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
    ]; 
    let openRow = -1;
    let pagination_page=0;
    let length=transactions.length;
    let filtered_transactions=transactions;
    const placement = "bottom-start";
    export let transactionPerPage=10;
    export let tableTitle="Buy History";
    export let userType="farmer";
    $:if(transactions.length!=length){
        filtered_transactions=transactions;
        length=transactions.length;
    }
    const toggleRowTransaction = (i) => {
        openRow = openRow === i ? -1 : i
    };
    function previousTransaction() {
        pagination_page--;
    }
    function nextTransaction() {
        pagination_page++;
    }
</script>
<div class="flex flex-row w-full p-1 pb-3 items-center">
    <h1 class="text-2xl font-bold text-custom_font-sub_header">{tableTitle}</h1>
    <div class="flex-grow"></div>
    <div class="flex flex-row space-x-2">
        <SlidersSolid class="filter-menu w-5 h-5 me-2 text-center text-custom_font-sub_header"/>
        <Dropdown {placement} triggeredBy=".filter-menu">
            <DropdownItem>Filter</DropdownItem>
        </Dropdown>
    </div>
</div>
<Table shadow>
    <TableHead>
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
    >TID</TableHeadCell
    >
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg w-1/4"
    >Name</TableHeadCell
    >
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
        >Date</TableHeadCell
    >
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
        >Total</TableHeadCell
    >
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg "
        >Status</TableHeadCell
    >
    </TableHead>
    {#if transactions.length==0}
    <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
        <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
            <div class="flex flex-col items-center justify-center ">
                <span class="text-custom_font-table_header text-xl">No Transactions Found</span>
                <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
            </div>
        </TableBodyCell>
    </TableBodyRow>
    {:else if filtered_transactions.length==0}
    <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
        <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
            <div class="flex flex-col items-center justify-center ">
                <span class="text-custom_font-table_header text-xl">No transactions matching The filters</span>
                <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
            </div>
        </TableBodyCell>
    </TableBodyRow>
    {:else}
    {#each filtered_transactions.slice(pagination_page*transactionPerPage, (pagination_page+1)*transactionPerPage+1) as transaction,i}
        <TableBodyRow
        class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
        on:click={() => toggleRowTransaction(i)}
        on:dblclick={() => toggleRowTransaction(i)}
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{transaction.transactionid}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header"
            >
        <div class="flex flex-row items-center">
            <Avatar
            class="w-7 h-7 me-3"
            src={transaction.avatarLink}
            alt="avatar"
            />
            {#if userType=="farmer"}
                {transaction.farmername}
            {:else if userType=="sme"}
                {transaction.smename}
            {:else}
                {transaction.vendorname}
            {/if}
        </div>
            </TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{new Date(transaction.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(transaction.timestamp).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{transaction.total}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >
            {#if transaction.status.toLowerCase()=="approved"}
                <span class="text-logo-2">
                    Approved
                </span>
            {:else if transaction.status.toLowerCase()=="pending"}
                <span class="text-sky-500">
                    Pending
                </span>
            {:else if transaction.status.toLowerCase()=="rejected"}
                <span class="text-red-500">
                    Rejected
                </span>
            {/if}
        </TableBodyCell
        >
        </TableBodyRow>
        {#if openRow === i}
            <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md" >
            <TableBodyCell colspan="5" class="p-0">
                <div class="flex flex-row w-full min-w-full space-x-5 pe-3"   transition:slide={{ duration: 300, axis: 'y' }} >
                <div class="grow p-2 h-full">
                    <Table>
                        <TableHead>
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold bg-body_custom"
                            >Product</TableHeadCell
                            >
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold text-right bg-body_custom"
                            >Unit Price</TableHeadCell
                            >
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold text-right bg-body_custom"
                            >Quantity</TableHeadCell
                            >
                            {#if tableTitle=="Buy History"}
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold text-right bg-body_custom"
                            >Tax Amount</TableHeadCell
                            >
                            {/if}
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold text-right bg-body_custom"
                            >Price</TableHeadCell
                            >
                        </TableHead>
                        {#if tableTitle=="Buy History"}
                            {#each transaction.buyitems as object}
                                <TableBodyRow class=" border-transparent bg-body_custom ">
                                    <TableBodyCell class="text-custom_font-table-header"
                                        >{object.productname}</TableBodyCell
                                    >
                                    <TableBodyCell class="text-custom_font-table-header text-right "
                                        >{(object.totalPrice??0)/object.quantity}</TableBodyCell
                                    >
                                    <TableBodyCell class="text-custom_font-table-header text-right "
                                        >{object.quantity} {object.unit}</TableBodyCell
                                    ><TableBodyCell class="text-custom_font-table-header text-right "
                                        >{object.tax??0}</TableBodyCell
                                    >
                                    <TableBodyCell class="text-custom_font-table-header text-right"
                                        >{object.totalPrice??0}</TableBodyCell
                                    >
                                </TableBodyRow>
                            {/each}
                        {:else}
                            {#each transaction.sellitems as object}
                                <TableBodyRow class=" border-transparent bg-body_custom ">
                                    <TableBodyCell class="text-custom_font-table-header"
                                        >{object.productname}</TableBodyCell
                                    >
                                    <TableBodyCell class="text-custom_font-table-header text-right "
                                        >{(object.total??0)/object.quantity}</TableBodyCell
                                    >
                                    <TableBodyCell class="text-custom_font-table-header text-right "
                                        >{object.quantity} {object.unit}</TableBodyCell
                                    >
                                    <TableBodyCell class="text-custom_font-table-header text-right"
                                        >{object.total}</TableBodyCell
                                    >
                                </TableBodyRow>
                            {/each}
                        {/if}
                    </Table>
                </div>  
                <div class="flex flex-col w-1/4 p-2 space-y-4 my-2 border-2 rounded-lg border-divider_col">
                    <div class="flex flex-col h-full ">
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Total</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.total}</div>
                        </div>
                        {#if tableTitle=="Buy History"}
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Due Deduction</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.totalDeduction??0}</div>
                        </div>
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Tax Amount</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.totalTax??0}</div>
                        </div>
                        {/if}
                        <div class="flex flex-row p-3 px-6 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Cash Back</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.cashback??0}</div>
                        </div>
                        <div class="grow bg-body_custom">
                        </div>
                        <div class="flex flex-row p-3 px-6 border-t-2 border-divider_col bg-body_custom">
                            <div class="grow"><span class="text-custom_font-table-header font-bold">Final Amount</span></div>
                            <div class="text-custom_font-table-header text-right">
                                {#if tableTitle=="Buy History"}
                                    {parseInt(transaction.total)-parseInt(transaction.totalDeduction)-parseInt(transaction.totalTax)+parseInt(transaction.cashback)}
                                {:else}
                                    {parseInt(transaction.total)-parseInt(transaction.cashback)}
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </TableBodyCell>
            </TableBodyRow>
        {/if}
    {/each}
    <TableBodyRow class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl">
                <TableBodyCell colspan="8">
                        <div class="flex flex-row items-center justify-between w-full">
                            <Button on:click={previousTransaction} disabled={pagination_page==0} class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                <ChevronLeftSolid class="w-4 h-4"/>
                                Previous
                            </Button>
                            <p class="text-custom_font-table_header grow text-center">
                                Showing 
                                <span class="font-bold">{pagination_page*transactionPerPage+1}</span> 
                                to 
                                <span class="font-bold">{Math.min(filtered_transactions.length,(pagination_page+1)*transactionPerPage)}</span> 
                                of 
                                <span class="font-bold">{filtered_transactions.length}</span> 
                                entries
                            </p>
                            <Button on:click={nextTransaction} disabled={pagination_page>=filtered_transactions.length/transactionPerPage-1 } class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                Next
                                <ChevronRightSolid class="w-4 h-4"/>
                            </Button>
                        </div>
                </TableBodyCell>
            </TableBodyRow>
    {/if}
</Table>