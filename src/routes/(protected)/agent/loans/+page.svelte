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
    import { load } from "./+page.js";
  let active_loan = false;
  let focused = false;
  let formModal = false;
  
  let farmer_loans=[
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
  let sme_loans=[
    {
        "request_id": "1",
        "requestedMin": null,
        "requestedMax": null,
        "requestTime": null,
        "description": null,
        "status": "interviewed",
        "rank": null,
        "points": "0",
        "smename": "oi",
        "avatarLink": "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
        "phone": null
    }
  ]
  farmer_loans=$page.data.request_farmers;
  sme_loans=$page.data.request_smes;
  let filtered_farmer_loans=farmer_loans;
  let filtered_sme_loans=sme_loans;
  let value;

  let pagination_page_farmer = 0, pagination_page_sme = 0;

  function previousFarmer() {
    pagination_page_farmer--;
  }
  function previousSME() {
    pagination_page_sme--;
  }
  function nextFarmer() {
      pagination_page_farmer++;
  }

  function nextSME() {
      pagination_page_sme++;
  }
  let farmerOpenRow=-1,smeOpenRow=-1;
  
  let detailsFarmer,detailsSME;
  let values=[10000,10000,500000];

  const toggleRowFarmer = (i) => {
    if(filtered_farmer_loans[i].status=="interviewed") {
      value=(filtered_farmer_loans[i].requestedMin+filtered_farmer_loans[i].requestedMax)/2;
      detailsFarmer=filtered_farmer_loans[i];
      values=[filtered_farmer_loans[i].requestedMin,(filtered_farmer_loans[i].requestedMin+filtered_farmer_loans[i].requestedMax)/2,filtered_farmer_loans[i].requestedMax];
      return;
    }
    farmerOpenRow = farmerOpenRow === i ? null : i
  }
  const toggleRowSME = (i) => {
    if(filtered_sme_loans[i].status=="interviewed") {
      value=(filtered_sme_loans[i].requestedMin+filtered_sme_loans[i].requestedMax)/2;
      detailsSME=filtered_sme_loans[i];
      values=[filtered_sme_loans[i].requestedMin,(filtered_sme_loans[i].requestedMin+filtered_sme_loans[i].requestedMax)/2,filtered_sme_loans[i].requestedMax];
      return;
    }
    smeOpenRow = smeOpenRow === i ? null : i
  }

  async function nextFarmerStage(i) {
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
    let dat=await load();
    farmer_loans=dat.request_farmers;
    farmerOpenRow=-1;
    // location.reload();
}
async function nextSMEStage(i) {
    console.log(get(jwtToken));
    let request={
      "loan_id": i,
    }
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/loan/response/sme/next`, {
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
    let dat=await load();
    sme_loans=dat.request_smes;
    smeOpenRow=-1;
    // location.reload();
}
  async function rejectFarmer(i) {
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
    let dat=await load();
    farmer_loans=dat.request_farmers;
    farmerOpenRow=-1;
  }

  async function rejectSME(i) {
    console.log(get(jwtToken));
    let request={
      "loan_id": i,
    }
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/loan/response/sme/reject`, {
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
    let dat=await load();
    sme_loans=dat.request_sme;
    smeOpenRow=-1;
  }

  async function finalizeFarmer(i) {
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
    let dat=await load();
    farmer_loans=dat.request_farmers;
    farmerOpenRow=-1;
  }


  async function finalizeSME(i) {
    console.log(get(jwtToken));
    let request={
      "loan_id": i,
      "amount": value,
    }
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/loan/response/sme/accept `, {
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
    let dat=await load();
    sme_loans=dat.request_sme;
    smeOpenRow=-1;
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
          {#if farmer_loans.length==0}
            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
              <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                  <div class="flex flex-col items-center justify-center ">
                      <span class="text-custom_font-table_header text-xl">No Pending Loans</span>
                      <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                  </div>
              </TableBodyCell>
          </TableBodyRow>
          {:else if filtered_farmer_loans.length==0}
            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
              <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                  <div class="flex flex-col items-center justify-center ">
                      <span class="text-custom_font-table_header text-xl">No loans matching The filters</span>
                      <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                  </div>
              </TableBodyCell>
          </TableBodyRow>
          {:else}
            {#each filtered_farmer_loans as loan,i}
              <TableBodyRow
                class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
                on:click={() => toggleRowFarmer(i)}
                on:dblclick={() => toggleRowFarmer(i)}
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
              {#if farmerOpenRow === i}
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
                            on:click={() => {if(confirm("Are you sure you want to go to the next stage?")) nextFarmerStage(loan.request_id);}}
                            size="md"
                            >
                            Next Stage
                          </Button>
                          <Button
                            class="w-full rounded-br-xl rounded-tr-xl"
                            color="red"
                            size="md"
                            on:click={() => {if(confirm("Are you sure you want to reject the request?")) rejectFarmer(loan.request_id);}}
                            >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </TableBodyCell>
                  </TableBodyRow>
              {/if}
            {/each}
            <TableBodyRow class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl">
                        <TableBodyCell colspan="8">
                                <div class="flex flex-row items-center justify-between w-full">
                                    <Button on:click={previousFarmer} disabled={pagination_page_farmer==0} class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                        <ChevronLeftSolid class="w-4 h-4"/>
                                        Previous
                                    </Button>
                                    <p class="text-custom_font-table_header grow text-center">
                                        Showing 
                                        <span class="font-bold">{pagination_page_farmer*10+1}</span> 
                                        to 
                                        <span class="font-bold">{Math.min(filtered_farmer_loans.length,pagination_page_farmer*10+10)}</span> 
                                        of 
                                        <span class="font-bold">{filtered_farmer_loans.length}</span> 
                                        entries
                                    </p>
                                    <Button on:click={nextFarmer} disabled={pagination_page_farmer>=filtered_farmer_loans.length/10-1 } class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                        Next
                                        <ChevronRightSolid class="w-4 h-4"/>
                                    </Button>
                                </div>
                        </TableBodyCell>
                    </TableBodyRow>
          {/if}
        </Table>
      </TabItem>
      <TabItem title="SME">
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
          {#if sme_loans.length==0}
            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
              <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                  <div class="flex flex-col items-center justify-center ">
                      <span class="text-custom_font-table_header text-xl">No Pending Loans</span>
                      <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                  </div>
              </TableBodyCell>
          </TableBodyRow>

          {:else if filtered_sme_loans.length==0}
            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
              <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                  <div class="flex flex-col items-center justify-center ">
                      <span class="text-custom_font-table_header text-xl">No loans matching The filters</span>
                      <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                  </div>
              </TableBodyCell>
          </TableBodyRow>
          {:else}
            {#each filtered_sme_loans as loan,i}
              <TableBodyRow
                class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
                on:click={() => toggleRowSME(i)}
                on:dblclick={() => toggleRowSME(i)}
              >
                <TableBodyCell class="text-custom_font-table-header"
                  >
                <div class="flex flex-row items-center">
                  <Avatar
                    class="w-7 h-7 me-2"
                    src={loan.avatarLink}
                    alt="avatar"
                  />
                  {loan.smename}
                </div>
                  </TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center"
                >{loan.phone}</TableBodyCell
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
              {#if smeOpenRow === i}
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
                            on:click={() => {if(confirm("Are you sure you want to go to the next stage?")) nextSMEStage(loan.request_id);}}
                            size="md"
                            >
                            Next Stage
                          </Button>
                          <Button
                            class="w-full rounded-br-xl rounded-tr-xl"
                            color="red"
                            size="md"
                            on:click={() => {if(confirm("Are you sure you want to reject the request?")) rejectSME(loan.request_id);}}
                            >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </TableBodyCell>
                  </TableBodyRow>
              {/if}
            {/each}
            <TableBodyRow class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl">
                        <TableBodyCell colspan="7">
                                <div class="flex flex-row items-center justify-between w-full">
                                    <Button on:click={previousSME} disabled={pagination_page_sme==0} class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                        <ChevronLeftSolid class="w-4 h-4"/>
                                        Previous
                                    </Button>
                                    <p class="text-custom_font-table_header grow text-center">
                                        Showing 
                                        <span class="font-bold">{pagination_page_sme*10+1}</span> 
                                        to 
                                        <span class="font-bold">{Math.min(filtered_sme_loans.length,pagination_page_sme*10+10)}</span> 
                                        of 
                                        <span class="font-bold">{filtered_sme_loans.length}</span> 
                                        entries
                                    </p>
                                    <Button on:click={nextSME} disabled={pagination_page_sme>=filtered_sme_loans.length/10-1 } class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom">
                                        Next
                                        <ChevronRightSolid class="w-4 h-4"/>
                                    </Button>
                                </div>
                        </TableBodyCell>
                    </TableBodyRow>
          {/if}
        </Table>
      </TabItem>
    </Tabs>
    <Modal title={"Loan Request of "+detailsFarmer?.farmername} open={!!detailsFarmer} autoclose outsideclose >
      <div class="flex items-center pb-4 w-full">
            <Avatar class="w-48 h-48 ring-border_custom me-12" border/>
            <Table divClass="grow relative overflow-x-auto">
                <TableBody>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="w-56 text-custom_font-deep font-bold">Name</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{detailsFarmer.farmername}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Type</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{detailsFarmer.farmerType}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Points</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{detailsFarmer.points}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Agent</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{detailsFarmer.rank}</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
        <span class="ms-1 text-custom_font-table_header">Loan Description</span>
        <div class="px-2 py-3 border rounded-xl  grow w-full h-24">
          <!-- <ImagePlaceholder /> -->
          {detailsFarmer.description}
        </div>
        <span class="ms-1 mt-3 text-custom_font-table_header">Finalize Amount</span>
        <TripleSlider bind:value={value} values={values} min={detailsFarmer.requestedMin} max={detailsFarmer.requestedMax} minSlide={detailsFarmer.requestedMin-1000} maxSlide={detailsFarmer.requestedMax+1000} />
        <div class="flex flex-col p-2 space-y-4">
                          <Button
                            class="mt-7 w-full rounded-br-xl rounded-tr-xl"
                            color="primary"
                            on:click={() => {if(confirm("Are you sure you want to finalize the loan?")) finalizeFarmer(detailsFarmer.request_id);}}
                            size="md"
                            >
                            Confirm
                          </Button>
                          <Button
                            class="w-full rounded-br-xl rounded-tr-xl"
                            color="red"
                            size="md"
                            on:click={() => {if(confirm("Are you sure you want to reject the request?")) rejectFarmer(detailsFarmer.request_id);}}
                            >
                            Reject
                          </Button>
                        </div>
    </Modal>
    <Modal title={"Loan Request of "+detailsSME?.smename} open={!!detailsSME} autoclose outsideclose >
      <div class="flex items-center pb-4 w-full">
            <Avatar class="w-48 h-48 ring-border_custom me-12" border/>
            <Table divClass="grow relative overflow-x-auto">
                <TableBody>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="w-56 text-custom_font-deep font-bold">Name</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{detailsSME.smename}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Points</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{detailsSME.points}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow class="border-b-2 border-divider_col drop-shadow-md">
                        <TableBodyCell class="text-custom_font-deep font-bold">Agent</TableBodyCell>
                        <TableBodyCell class="text-custom_font-light">{detailsSME.rank}</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
        <span class="ms-1 text-custom_font-table_header">Loan Description</span>
        <div class="px-2 py-3 border rounded-xl  grow w-full h-24">
          <!-- <ImagePlaceholder /> -->
          {detailsSME.description}
        </div>
        <span class="ms-1 mt-3 text-custom_font-table_header">Finalize Amount</span>
        <TripleSlider bind:value={value} values={values} min={detailsSME.requestedMin} max={detailsSME.requestedMax} minSlide={detailsSME.requestedMin-1000} maxSlide={detailsSME.requestedMax+1000} />
        <div class="flex flex-col p-2 space-y-4">
                          <Button
                            class="mt-7 w-full rounded-br-xl rounded-tr-xl"
                            color="primary"
                            on:click={() => {if(confirm("Are you sure you want to finalize the loan?")) finalizeSME(detailsSME.request_id);}}
                            size="md"
                            >
                            Confirm
                          </Button>
                          <Button
                            class="w-full rounded-br-xl rounded-tr-xl"
                            color="red"
                            size="md"
                            on:click={() => {if(confirm("Are you sure you want to reject the request?")) rejectSME(detailsSME.request_id);}}
                            >
                            Reject
                          </Button>
                        </div>
    </Modal>
  </div>
</div>
