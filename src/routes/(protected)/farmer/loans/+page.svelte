<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button, Pagination, Checkbox, Input, Label, Modal, Textarea } from "flowbite-svelte";
    import { ChevronLeftSolid, ChevronRightSolid } from "svelte-awesome-icons";
    import { onMount } from "svelte";
    let active_loan=false;
    let focused=false;
    let formModal=true;
    let description="";
    let ongoing_loan={
        start_date:"2021-01-01",
        total: 100000,
        remaining: 50000,
        interest: 10,
        status: "Stage1"
    }
    let loans=[
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100000, status: "Done"},
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100000, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100000, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100000, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100000, status: "Done" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100000, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100000, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100001, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100002, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100003, status: "Done" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100004, status: "Done" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100005, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100006, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100007, status: "Done" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100008, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100009, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100010, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100011, status: "Done" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100012, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100013, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100014, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100015, status: "Done" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100016, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100017, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100018, status: "Done" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100019, status: "Rejected" },
        { start_date:"2021-01-01", end_date:"2021-01-01", total: 100020, status: "Rejected" }
    ];

    let pagination_page=0;

    async function addLoan(){
        active_loan=true;
        formModal=false;
    }

    function previous(){
        pagination_page--;
    }
    function next(){
        if(pagination_page<loans.length/10-1){
            pagination_page++;
        }
    }

</script>

<div class="flex flex-row">
    {#if focused}
    <Sidebar bind:focused={focused}/>
    {:else}    
    <RolledSidebar bind:focused={focused}/>
    {/if}
    <div class="w-full h-screen p-5">

        <Header page="Loans"/>
        <div >
            <h1 class="text-2xl font-bold text-custom_font-sub_header mb-3">Current Loan</h1>
            <Table shadow>
                <TableHead>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg rounded-tl-xl">Start Date</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Total Amount</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Remaining</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Deduction%</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg rounded-tr-xl">Status</TableHeadCell>
                </TableHead>
                <TableBody >
                    {#if active_loan}
                    <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.start_date}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.total}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.remaining}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.interest}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.status}</TableBodyCell>
                    </TableBodyRow>
                    {:else}
                    <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
                        <TableBodyCell colspan="5" class="text-custom_font-table_header items-center rounded-b-xl">
                            <div class="flex flex-col items-center justify-center">
                                <span>No Active Loan</span>
                                <Button on:click={()=>(formModal=true)} class="mt-4 text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md focus:ring-border_custom">Apply for Loan</Button>
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>
                    {/if}
                </TableBody>
            </Table>
        </div>

        <hr class="mt-5 border-divider_col shadow"/>
        <hr class="mb-3 border-divider_col shadow"/>

        <div class="mb-5 pb-5">
            <h1 class="text-2xl font-bold text-custom_font-sub_header mb-3">Previous Loans</h1>
            <Table shadow >
                <TableHead>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Start Date</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">End Date</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Total Amount</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Status</TableHeadCell>
                </TableHead>
                <TableBody >
                    {#each loans.slice(pagination_page*10,pagination_page*10+10) as loan}
                    <TableBodyRow class="px-1 border-b-2 border-spacing-5 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="text-custom_font-table-header text-center">{loan.start_date}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{loan.end_date}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{loan.total}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {#if loan.status!="Rejected"}
                            <span class="text-logo-2">{loan.status}</span>
                            {:else}
                            <span class="text-red-500">{loan.status}</span>
                            {/if}
                        </TableBodyCell>
                    </TableBodyRow>
                    {/each}
                    <TableBodyRow class="border-b-2 border-divider_col rounded-b-xl">
                        <TableBodyCell colspan="4">
                                <div class="flex flex-row items-center justify-between w-full">
                                    <Button on:click={previous} disabled={pagination_page==0} class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                        <ChevronLeftSolid class="w-4 h-4"/>
                                        Previous
                                    </Button>
                                    <p class="text-custom_font-table_header">
                                        Showing 
                                        <span class="font-bold">{pagination_page*10+1}</span> 
                                        to 
                                        <span class="font-bold">{Math.min(loans.length,pagination_page*10+10)}</span> 
                                        of 
                                        <span class="font-bold">{loans.length}</span> 
                                        entries
                                    </p>
                                    <Button on:click={next} disabled={pagination_page==loans.length/10-1} class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                        Next
                                        <ChevronRightSolid class="w-4 h-4"/>
                                    </Button>
                                </div>
                        </TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
    </div>
</div>
<Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" on:submit|preventDefault={addLoan}>
    <h3 class="mb-4 text-xl font-medium text-gray-900 text-center dark:text-white">Sign in to our platform</h3>
    <Label class="space-y-2">
      <span>Amount</span>
      <Input type="email" name="email" placeholder="name@company.com" required />
    </Label>
    <Label class="space-y-2">
      <span>Description</span>
      <Textarea id="textarea-id" bind:value={description} placeholder="Describe the need for this loan" rows="12" cols="4" name="message" />
    </Label>
    <Button type="submit" class="w-full1">Submit your request</Button>
  </form>
</Modal>