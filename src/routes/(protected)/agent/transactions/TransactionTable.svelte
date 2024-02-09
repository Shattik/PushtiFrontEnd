<script>
    import { Avatar, Button, Dropdown, DropdownItem, Table, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { LinkSlashSolid, ChevronLeftSolid, ChevronRightSolid, SlidersSolid } from "svelte-awesome-icons";
    import { slide } from "svelte/transition";


    export const transactions=[
        {
            "tid": 123456789,    
            "date": "2022-10-31T11:00:00Z",
            "name": "John Doe",
            "avatarLink": "avatar23.png",
            "total": 1000,
            "Objects": [
                {
                    "name": "Milk",
                    "quantity": 10,
                    "price": 1000
                },
                {
                    "name": "Milk",
                    "quantity": 10,
                    "price": 1000
                },
                {
                    "name": "Milk",
                    "quantity": 10,
                    "price": 1000
                },
                {
                    "name": "Milk",
                    "quantity": 10,
                    "price": 1000
                },
                {
                    "name": "Milk",
                    "quantity": 10,
                    "price": 1000
                },
                {
                    "name": "Sitamet",
                    "quantity": 10,
                    "price": 1000
                }
            ],
            "status": "Done"
        },
        {
            "tid": 123456789,    
            "date": "2022-10-31T11:00:00Z",
            "name": "John Doe",
            "avatarLink": "avatar44.png",
            "total": 10023,
            "Objects": [
                {
                    "name": "Milk",
                    "quantity": 10,
                    "price": 1000
                },
                {
                    "name": "Sitamet",
                    "quantity": 10,
                    "price": 1000
                }
            ],
            "status": "Rejected"
        },
    ]; 
    let openRow = -1;
    let pagination_page=0;
    let filtered_transactions=transactions;
    const placement = "bottom-start";
    export const transactionPerPage=10;
    export let tableTitle="Buy History";
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
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownItem slot="footer">Sign out</DropdownItem>
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
            >{transaction.tid}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header"
            >
        <div class="flex flex-row items-center">
            <Avatar
            class="w-7 h-7 me-3"
            src={transaction.avatarLink}
            alt="avatar"
            />
            {transaction.name}
        </div>
            </TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{new Date(transaction.date).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(transaction.date).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{transaction.total}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >
            {#if transaction.status.toLowerCase()=="done"}
                <span class="text-logo-2">
                    Done
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
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold text-right bg-body_custom"
                            >Price</TableHeadCell
                            >
                        </TableHead>
                        {#each transaction.Objects as object}
                            <TableBodyRow class=" border-transparent bg-body_custom ">
                                <TableBodyCell class="text-custom_font-table-header"
                                    >{object.name}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.price/object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right"
                                    >{object.price}</TableBodyCell
                                >
                            </TableBodyRow>
                        {/each}
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
                            <div class="text-custom_font-table-header text-right">{transaction.total}</div>
                        </div>
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Tax Amount</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.total}</div>
                        </div>
                        {/if}
                        <div class="flex flex-row p-3 px-6 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Cash Back</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.total}</div>
                        </div>
                        <div class="grow bg-body_custom">
                        </div>
                        <div class="flex flex-row p-3 px-6 border-t-2 border-divider_col bg-body_custom">
                            <div class="grow"><span class="text-custom_font-table-header font-bold">Final Amount</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.total}</div>
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