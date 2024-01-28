<script>
  import Sidebar from "../Sidebar.svelte";
  import RolledSidebar from "../RolledSidebar.svelte";
  import Header from "../../Header.svelte";
  import TripleSlider from "../TripleSlider.svelte";
  import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Button,
    Pagination,
    Checkbox,
    Input,
    Avatar,
    Modal,
    Tabs,
    TabItem,
  } from "flowbite-svelte";
  import { ChevronLeftSolid, ChevronRightSolid, LinkSlashSolid } from "svelte-awesome-icons";
  import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { get } from "svelte/store";
    import { jwtToken } from "$lib/Components/token";
    import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";
    import { page } from "$app/stores";
  let active_loan = false;
  let focused = false;
  let formModal = false;
  
  let loans=[
    {
      avatarLink: "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
      farmerType: "Dairy",
      farmername: "test",
      phone: "1234567890",
      points: "0",
      rank: "Iron",
      requestTime: "2024-01-27T21:11:55.623Z",
      request_id: "4",
      requestedMax: 260000,
      requestedMin: 210000,
      status: "pending",
      description: "test",
    },
    {
      "request_id": "2",
      "requestedMin": 6000,
      "requestedMax": 8000,
      "requestTime": "2024-01-22T23:56:46.446Z",
      "status": "interviewed",
      "rank": null,
      "points": "1234",
      "farmerType": "Dairy",
      "farmername": "hojoborolo",
      "avatarLink": "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
      "phone": "123",
      "description": "test"
    }
  ]
  loans=$page.data.request_farmers;

  let value;

  let pagination_page = 0;

  async function addLoan() {
    active_loan = true;
  }

  function previous() {
    pagination_page--;
  }
  function next() {
    if (pagination_page < loans.length / 10 - 1) {
      pagination_page++;
    }
  }
  let openRow=-1;
  
  let details;
  let values=[10000,10000,500000];

  const toggleRow = (i) => {
    if(loans[i].status=="interviewed") {
      value=(loans[i].requestedMin+loans[i].requestedMax)/2;
      details=loans[i];
      values=[loans[i].requestedMin,(loans[i].requestedMin+loans[i].requestedMax)/2,loans[i].requestedMax];
      return;
    }
    openRow = openRow === i ? null : i
  }

  async function nextStage(i) {
    console.log(get(jwtToken));
    let request={
      "loan_id": i,
    }
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/loan/response/farmer/next`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
        body: JSON.stringify(request)
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    location.reload();
}
  async function reject(i) {
    console.log(get(jwtToken));
    let request={
      "loan_id": i,
    }
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/loan/response/farmer/reject`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
        body: JSON.stringify(request)
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    location.reload();
  }

  async function finalize(i) {
    console.log(get(jwtToken));
    let request={
      "loan_id": i,
      "amount": value,
    }
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/loan/response/farmer/accept `, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
        body: JSON.stringify(request)
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    location.reload();
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
    <Tabs style="underline" contentClass="p-4 bg-divider_col rounded-lg dark:bg-gray-800 mt-4 h-4/5">
      <TabItem open title="Farmer" >
        <Table shadow>
          <TableHead>
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg rounded-tl-xl w-1/4"
              >Name</TableHeadCell
            >
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
            >Phone</TableHeadCell>
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
              >Type</TableHeadCell
            >
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
              >Rank</TableHeadCell
            >
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg "
              >Points</TableHeadCell
            >
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
              >Min Amount</TableHeadCell
            >
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg "
              >Max Amount</TableHeadCell
            >
            <TableHeadCell
              class="text-custom_font-table_header font-bold text-center bg-sidebar_bg rounded-tr-xl"
              >Status</TableHeadCell
            >
          </TableHead>
          {#if loans.length==0}
            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
              <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                  <div class="flex flex-col items-center justify-center ">
                      <span class="text-custom_font-table_header text-xl">No Previous Loans</span>
                      <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                  </div>
              </TableBodyCell>
          </TableBodyRow>
          {:else}
            {#each loans as loan,i}
              <TableBodyRow
                class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
                on:click={() => toggleRow(i)}
                on:dblclick={() => toggleRow(i)}
              >
                <TableBodyCell class="text-custom_font-table-header"
                  >
                <div class="flex flex-row items-center">
                  <Avatar
                    class="w-7 h-7 me-2"
                    src={loan.avatarLink}
                    alt="avatar"
                  />
                  {loan.farmername}
                </div>
                  </TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                >{loan.phone}</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                  >{loan.farmerType}</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                  >{loan.rank}</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                  >{loan.points}</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                  >{loan.requestedMin}</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                  >{loan.requestedMax}</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                  >{loan.status[0].toUpperCase()+loan.status.slice(1,loan.status.length)}</TableBodyCell
                >
              </TableBodyRow>
              {#if openRow === i}
                   <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md" >
                    <TableBodyCell colspan="8" class="p-0">
                      <div class="flex flex-row w-full min-w-full space-x-5"  transition:slide={{ duration: 300, axis: 'y' }} >
                        <div class="grow p-2 h-full">
                          <span class="text-custom_font-table_header ms-4 mt-2">Loan Description</span>
                          <div class="px-2 py-3 border rounded-xl m-2 grow w-full h-24 flex-1">
                            <!-- <ImagePlaceholder /> -->
                            {loan.description}
                          </div>
                        </div>  
                        <div class="flex flex-col p-2 space-y-4 me-2">
                          <Button
                            class="mt-7 w-full rounded-br-xl rounded-tr-xl"
                            color="primary"
                            on:click={() => {if(confirm("Are you sure you want to go to the next stage?")) nextStage(loan.request_id);}}
                            size="md"
                            >
                            Next Stage
                          </Button>
                          <Button
                            class="w-full rounded-br-xl rounded-tr-xl"
                            color="red"
                            size="md"
                            on:click={() => {if(confirm("Are you sure you want to reject the request?")) reject(loan.request_id);}}
                            >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </TableBodyCell>
                  </TableBodyRow>
              {/if}
            {/each}
          {/if}
        </Table>
      </TabItem>
      <TabItem title="SME">

      </TabItem>
    </Tabs>
    <Modal title={"Loan Request of "+details?.farmername} open={!!details} autoclose outsideclose >
      <div class="flex items-center pb-4 w-full">
            <Avatar class="w-48 h-48 ring-border_custom me-12" border/>
            <Table divClass="grow relative overflow-x-auto">
                <TableBody>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="w-56 text-custom_font-deep font-bold">Name</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{details.farmername}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Type</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{details.farmerType}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Points</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{details.points}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Agent</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{details.rank}</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
        <span class="ms-1 text-custom_font-table_header">Loan Description</span>
        <div class="px-2 py-3 border rounded-xl  grow w-full h-24">
          <!-- <ImagePlaceholder /> -->
          {details.description}
        </div>
        <span class="ms-1 mt-3 text-custom_font-table_header">Finalize Amount</span>
        <TripleSlider bind:value={value} values={values} min={details.requestedMin} max={details.requestedMax} minSlide={details.requestedMin-1000} maxSlide={details.requestedMax+1000} />
        <div class="flex flex-col p-2 space-y-4">
                          <Button
                            class="mt-7 w-full rounded-br-xl rounded-tr-xl"
                            color="primary"
                            on:click={() => {if(confirm("Are you sure you want to finalize the loan?")) finalize(details.request_id);}}
                            size="md"
                            >
                            Confirm
                          </Button>
                          <Button
                            class="w-full rounded-br-xl rounded-tr-xl"
                            color="red"
                            size="md"
                            on:click={() => {if(confirm("Are you sure you want to reject the request?")) reject(details.request_id);}}
                            >
                            Reject
                          </Button>
                        </div>
    </Modal>
   
  </div>
</div>
