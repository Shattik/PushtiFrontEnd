<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button, Pagination, Checkbox, Input, Label, Modal, Textarea } from "flowbite-svelte";
    import { ChevronLeftSolid, ChevronRightSolid, LinkSlashSolid } from "svelte-awesome-icons";
    import { onMount } from "svelte";
    import NormalSlider from "./NormalSlider.svelte";
    import { get } from "svelte/store";
    import { jwtToken } from "$lib/Components/token.js";
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    let focused=false;
    let formModal=false;
    let description="";
    let ongoing_loan={
        requestedMin: 10000,
        requestedMax: 500000,
        approvedAmount: 0,
        approvalTime:"",
        requestTime: "",
        remainingAmount: 0,
        status: "Stage1"
    }
    let loans=[
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, requestTime:"2024-01-24T14:06:12.709Z", approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" }, 
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: 100000, approvalTime:"2024-01-24T14:06:12.709Z", finishTime: "2024-01-24T14:06:12.709Z", status: "Completed" },
        { approvedAmount: null, approvalTime:null, finishTime: null, status: "Rejected" }
    ];

    let pagination_page=0;

    let loanData=$page.data;
    ongoing_loan=loanData.ongoing;
    loans=loanData.data;

    let values = [10000, 500000];

    async function addLoan(){
        let data;
        let request = {
            "max": values[1],
            "min": values[0],
            "description": description,
        };
        console.log(request);
        // Perform login logic here
        try {
            // Send authentication request to backend
            const response = await fetch('http://localhost:4001/farmer/loan/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: get(jwtToken),
                },
                body: JSON.stringify(request)
            });
            data = await response.json();
            console.log(response);
            console.log(data);
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
        if(data?.success){
            ongoing_loan={
                requestedMin: values[0],
                requestedMax: values[1],
                approvedAmount: null,
                approvalTime:null,
                requestTime: new Date().toISOString(),
                remainingAmount: null,
                status: "Pending"
            }
        }
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
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg rounded-tl-xl">Request Date</TableHeadCell>
                    { #if ongoing_loan?.status=="ongoing"}
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg rounded-tl-xl">Approval Date</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Total Amount</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Remaining</TableHeadCell>
                    {:else}
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Requested Minimum</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Requested Maximum</TableHeadCell>
                    {/if}
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg rounded-tr-xl">Status</TableHeadCell>
                </TableHead>
                <TableBody >
                    {#if ongoing_loan}
                    <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {new Date(ongoing_loan.requestTime).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(ongoing_loan.requestTime).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}
                        </TableBodyCell>
                        { #if ongoing_loan.status=="ongoing"}
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {new Date(ongoing_loan.approvalTime).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(ongoing_loan.approvalTime).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}
                        </TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.approvedAmount}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.remainingAmount}</TableBodyCell>
                        {:else}
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.requestedMin}</TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.requestedMax}</TableBodyCell>
                        {/if}
                        <TableBodyCell class="text-custom_font-table-header text-center">{ongoing_loan.status[0].toUpperCase()+ongoing_loan.status.slice(1,ongoing_loan.status.length)}</TableBodyCell>
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
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Request Date</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Start Date</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">End Date</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Total Amount</TableHeadCell>
                    <TableHeadCell class="text-custom_font-table_header font-bold text-center bg-sidebar_bg">Status</TableHeadCell>
                </TableHead>
                <TableBody >
                    {#if loans.length==0}
                    <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
                        <TableBodyCell colspan="5" class="text-custom_font-table_header items-center rounded-b-xl">
                            <div class="flex flex-col items-center justify-center">
                                <span class="text-custom_font-table_header text-xl">No Previous Loans</span>
                                <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>
                    {:else}
                    {#each loans.slice(pagination_page*10,pagination_page*10+10) as loan}
                    <TableBodyRow class="px-1 border-b-2 border-spacing-5 border-divider_col bg-body_custom drop-shadow-md">
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {#if loan.requestTime==null}
                            ---
                            {:else}
                            {new Date(loan.requestTime).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(loan.requestTime).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}
                            {/if}
                        </TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {#if loan.approvalTime==null}
                            ---
                            {:else}
                            {new Date(loan.approvalTime).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(loan.approvalTime).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}
                            {/if}
                        </TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {#if loan.finishTime==null}
                            ---
                            {:else}
                            {new Date(loan.finishTime).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(loan.finishTime).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}
                            {/if}
                        </TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {#if loan.approvedAmount==null}
                            ---
                            {:else}
                            {loan.approvedAmount}
                            {/if}
                        </TableBodyCell>
                        <TableBodyCell class="text-custom_font-table-header text-center">
                            {#if loan.status!="Rejected"}
                            <span class="text-logo-2">Completed</span>
                            {:else}
                            <span class="text-red-500">Rejected</span>
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
                                    <p class="text-custom_font-table_header grow text-center">
                                        Showing 
                                        <span class="font-bold">{pagination_page*10+1}</span> 
                                        to 
                                        <span class="font-bold">{Math.min(loans.length,pagination_page*10+10)}</span> 
                                        of 
                                        <span class="font-bold">{loans.length}</span> 
                                        entries
                                    </p>
                                    <Button on:click={next} disabled={pagination_page>=loans.length/10-1 } class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                        Next
                                        <ChevronRightSolid class="w-4 h-4"/>
                                    </Button>
                                </div>
                        </TableBodyCell>
                    </TableBodyRow>
                    {/if}
                </TableBody>
            </Table>
        </div>
    </div>
</div>
<Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" on:submit|preventDefault={addLoan}>
    <h3 class="mb-4 text-xl font-medium text-gray-900 text-center dark:text-white">Request for a New Loan</h3>
    <Label class="space-y-2">
      <span>Amount</span>
      <NormalSlider min={10000} max={500000} bind:values={values}/>
    </Label>
    <Label class="space-y-2">
      Minimum: <span>{values[0]}</span>
        Maximum: <span>{values[1]}</span>
    </Label>
    <Label class="space-y-2">
      <span>Description</span>
      <Textarea id="textarea-id" bind:value={description} placeholder="Describe the need for this loan" rows="12" cols="4" name="message" />
    </Label>
    <Button type="submit" class="w-full1">Submit your request</Button>
  </form>
</Modal>