<script>
    import { Table, TableHead, TableHeadCell, TableBodyRow, TableBodyCell, Avatar, Button } from "flowbite-svelte";
    import { LinkSlashSolid, ChevronLeftSolid, ChevronRightSolid, CheckSolid, TrashCanSolid } from "svelte-awesome-icons";
    import { slide } from "svelte/transition";
    import { get } from "svelte/store";
    import { jwtToken } from "$lib/Components/token.js";
    import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";

    export let transactions=[
        {
            "transactionid": "5",
            "total": "3640",
            "totalTax": "73",
            "totalDeduction": "357",
            "cashback": "6",
            "timestamp": "2024-02-10T21:11:38.868Z",
            "status": "Rejected",
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
    ]; 
    export let ongoing=[
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
    ]; 


    let openRowTransaction = -1;
    let openRowOngoing = -1;
    let pagination_page=0;
    export let transactionPerPage=10;
    export let tableType="Sell";
    export let userType="Farmer"; 
    const toggleRowTransaction = (i) => {
        openRowTransaction = openRowTransaction === i ? -1 : i
    };
    const toggleRowOngoing = (i) => {
        openRowOngoing = openRowOngoing === i ? -1 : i
    };
    function previousTransaction() {
        pagination_page--;
    }
    function nextTransaction() {
        pagination_page++;
    }



    async function acceptRequest(tid) {
        const request={
            "tid": tid,
        }
        const response = await fetch(
            `${PUBLIC_API_GATEWAY_URL}/${userType.toLowerCase()}/${tableType.toLowerCase()}-response/accept`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: get(jwtToken),
                },
                body: JSON.stringify(request),
            }
        );
        console.log(await response.json());
        if (response.ok) {
            for(let i=0;i<ongoing.length;i++){
                if(ongoing[i].transactionid==tid){
                    ongoing[i].status="approved";
                    transactions=[ongoing[i],...transactions];
                    ongoing=ongoing.slice(0,i).concat(ongoing.slice(i+1));
                    console.log("ongoing",ongoing);
                    console.log("transactions",transactions);
                    console.log("[0]",transactions[0]);
                    break;
                }
            }
            ongoing=ongoing;
        } else {
            console.log("Error");
        }
    }

    async function rejectRequest(tid) {
        const request={
            "tid": tid,
        }
        const response = await fetch(
            `${PUBLIC_API_GATEWAY_URL}/${userType.toLowerCase()}/${tableType.toLowerCase()}-response/reject`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: get(jwtToken),
                },
                body: JSON.stringify(request),
            }
        );
        console.log(await response.json());
        if (response.ok) {
            for(let i=0;i<ongoing.length;i++){
                if(ongoing[i].transactionid==tid){
                    ongoing[i].status="rejected";
                    transactions=[ongoing[i],...transactions];
                    ongoing=ongoing.slice(0,i).concat(ongoing.slice(i+1));
                    break;
                }
            }
            ongoing=ongoing;
        } else {
            console.log("Error");
        }
    }
</script>

<div class="flex flex-row w-full p-1 pb-3 items-center">
    <h1 class="text-2xl font-bold text-custom_font-sub_header">Pending {tableType} Orders</h1>
</div>
<Table shadow>
    <TableHead>
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
    >TID</TableHeadCell
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
        >Accept</TableHeadCell
    >
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg "
        >Reject</TableHeadCell
    >
    </TableHead>
    {#if ongoing.length==0}
    <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
        <TableBodyCell colspan="5" class="text-custom_font-table_header items-center rounded-b-xl">
            <div class="flex flex-col items-center justify-center ">
                <span class="text-custom_font-table_header text-xl">No Pending {tableType} Orders</span>
                <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
            </div>
        </TableBodyCell>
    </TableBodyRow>
    {:else}
    {#each ongoing as transaction,i}
        <TableBodyRow
        class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
        on:click={() => toggleRowOngoing(i)}
        on:dblclick={() => toggleRowOngoing(i)}
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{transaction.transactionid}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{new Date(transaction.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(transaction.timestamp).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{transaction.total}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header"
            >
            <div >
                <CheckSolid class="w-6 h-6 text-lime-500 m-auto opacity-60 hover:opacity-100" on:click={()=>{if(confirm("Are you sure you want to accept the request?")) acceptRequest(transaction.transactionid);}} />
            </div>
        </TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header "
            >
            <div >
                <TrashCanSolid class="w-6 h-6 text-red-500 m-auto opacity-60 hover:opacity-100" on:click={()=>{if(confirm("Are you sure you want to reject the request?")) rejectRequest(transaction.transactionid);}} />
            </div>
        </TableBodyCell
        >
        </TableBodyRow>
        {#if openRowOngoing === i}
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
                            {#if tableType=="Sell"}
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold text-right bg-body_custom"
                            >Tax</TableHeadCell
                            >
                            {/if}
                        </TableHead>
                        {#if tableType=="Sell"}
                        {#each transaction.buyitems as object}
                            <TableBodyRow class=" border-transparent bg-body_custom ">
                                <TableBodyCell class="text-custom_font-table-header"
                                    >{object.productname}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.totalPrice/object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right"
                                    >{object.totalPrice}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right"
                                    >{object.tax}</TableBodyCell
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
                                    >{object.total/object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.quantity}</TableBodyCell
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
                        {#if tableType=="Sell"}
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Due Deduction</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.totalDeduction}</div>
                        </div>
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Tax Amount</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.totalTax}</div>
                        </div>
                        {/if}
                        <div class="flex flex-row p-3 px-6 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Cash Back</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.cashback}</div>
                        </div>
                        <div class="grow bg-body_custom">
                        </div>
                        <div class="flex flex-row p-3 px-6 border-t-2 border-divider_col bg-body_custom">
                            <div class="grow"><span class="text-custom_font-table-header font-bold">Final Amount</span></div>
                            {#if tableType=="Sell"}
                            <div class="text-custom_font-table-header text-right">{parseInt(transaction.total)-parseInt(transaction.totalTax)-parseInt(transaction.totalDeduction)+parseInt(transaction.cashback)}</div>
                            {:else}
                            <div class="text-custom_font-table-header text-right">{parseInt(transaction.total)-parseInt(transaction.cashback)}</div>
                            {/if}
                        </div>
                    </div>
                </div>
                </div>
            </TableBodyCell>
            </TableBodyRow>
        {/if}
    {/each}
    {/if}
</Table>


    <hr class="mt-5 border-divider_col shadow" />
    <hr class="mb-2 border-divider_col shadow" />


<div class="flex flex-row w-full p-1 pb-3 items-center">
    <h1 class="text-2xl font-bold text-custom_font-sub_header">Previous {tableType} Orders</h1>
</div>



<Table shadow>
    <TableHead>
    <TableHeadCell
        class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
    >TID</TableHeadCell
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
        <TableBodyCell colspan="5" class="text-custom_font-table_header items-center rounded-b-xl">
            <div class="flex flex-col items-center justify-center ">
                <span class="text-custom_font-table_header text-xl">No Pending {tableType} Orders</span>
                <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
            </div>
        </TableBodyCell>
    </TableBodyRow>
    {:else}
    {#each transactions.slice(pagination_page*transactionPerPage, (pagination_page+1)*transactionPerPage+1) as transaction,i}
        <TableBodyRow
        class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
        on:click={() => toggleRowTransaction(i)}
        on:dblclick={() => toggleRowTransaction(i)}
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{transaction.transactionid}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{new Date(transaction.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(transaction.timestamp).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >{transaction.total}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
            >
            {#if transaction.status=="approved"}
                <span class="text-custom_font-table-header text-green-500">Approved</span>
                
            {:else}
                <span class="text-custom_font-table-header text-red-500">Rejected</span>
            {/if}
        </TableBodyCell
        >
        </TableBodyRow>
        {#if openRowTransaction === i}
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
                            {#if tableType=="Sell"}
                            <TableHeadCell
                            class="text-custom_font-table_header font-bold text-right bg-body_custom"
                            >Tax</TableHeadCell
                            >
                            {/if}
                        </TableHead>
                        {#if tableType=="Sell"}
                        {#each transaction.buyitems as object}
                            <TableBodyRow class=" border-transparent bg-body_custom ">
                                <TableBodyCell class="text-custom_font-table-header"
                                    >{object.productname}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.totalPrice/object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right"
                                    >{object.totalPrice}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right"
                                    >{object.tax}</TableBodyCell
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
                                    >{object.total/object.quantity}</TableBodyCell
                                >
                                <TableBodyCell class="text-custom_font-table-header text-right "
                                    >{object.quantity}</TableBodyCell
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
                        {#if tableType=="Sell"}
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Due Deduction</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.totalDeduction}</div>
                        </div>
                        <div class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Tax Amount</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.totalTax}</div>
                        </div>
                        {/if}
                        <div class="flex flex-row p-3 px-6 border-divider_col bg-body_custom">
                            <div class="grow "><span class="text-custom_font-table-header font-bold">Cash Back</span></div>
                            <div class="text-custom_font-table-header text-right">{transaction.cashback}</div>
                        </div>
                        <div class="grow bg-body_custom">
                        </div>
                        <div class="flex flex-row p-3 px-6 border-t-2 border-divider_col bg-body_custom">
                            <div class="grow"><span class="text-custom_font-table-header font-bold">Final Amount</span></div>
                            {#if tableType=="Sell"}
                            <div class="text-custom_font-table-header text-right">{parseInt(transaction.total)-parseInt(transaction.totalTax)-parseInt(transaction.totalDeduction)+parseInt(transaction.cashback)}</div>
                            {:else}
                            <div class="text-custom_font-table-header text-right">{parseInt(transaction.total)-parseInt(transaction.cashback)}</div>
                            {/if}
                        </div>
                    </div>
                </div>
                </div>
            </TableBodyCell>
            </TableBodyRow>
        {/if}
    {/each}
    <TableBodyRow class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl">
        <TableBodyCell colspan="4">
            <div class="flex flex-row items-center justify-between w-full">
                <Button on:click={previousTransaction} disabled={pagination_page==0} class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                    <ChevronLeftSolid class="w-4 h-4"/>
                    Previous
                </Button>
                <p class="text-custom_font-table_header grow text-center">
                    Showing 
                    <span class="font-bold">{pagination_page*transactionPerPage+1}</span> 
                    to 
                    <span class="font-bold">{Math.min(transactions.length,(pagination_page+1)*transactionPerPage)}</span> 
                    of 
                    <span class="font-bold">{transactions.length}</span> 
                    entries
                </p>
                <Button on:click={nextTransaction} disabled={pagination_page>=transactions.length/transactionPerPage-1 } class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                    Next
                    <ChevronRightSolid class="w-4 h-4"/>
                </Button>
            </div>
        </TableBodyCell>
    </TableBodyRow>
    {/if}
</Table>



