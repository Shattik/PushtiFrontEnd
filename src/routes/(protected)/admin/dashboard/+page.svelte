<script>
  import { format } from 'date-fns';
    import Header from "../../Header.svelte";
    import { onMount } from "svelte";
    import {
      Avatar,
      Button,
      Card,
      Progressbar,
      Table,
      TableBody,
      TableBodyCell,
      TableBodyRow,
    } from "flowbite-svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Sidebar from "../Sidebar.svelte";
    import { sineOut } from "svelte/easing";
    import { twJoin } from "tailwind-merge";
    import { StarRegular } from "svelte-awesome-icons";
    import { SvelteComponent } from "svelte";
    import Pie from "../../pie.svelte";
    import Bar from "../../bar.svelte";
    import Scatter from "../../Scatter.svelte";
    import { page } from "$app/stores";
    import { avatar } from "$lib/Components/avatar.js";
  
    /** @type { SvelteComponent } */
    let card;
    let page_data = $page.data;
    console.log(page_data);
  
    let admin = {
      name: page_data.basicData.name,
      email: page_data.basicData.email,
      phone: page_data.basicData.phone,
      avatarLink: page_data.basicData.avatarLink,
      permanentAddress: page_data.basicData.permanentAddress,
      dob: format(new Date(page_data.basicData.dob).toLocaleDateString(), "d MMMM, yyyy"),
    };
  
    let countSummary = {
      farmers: page_data.countSummary.totalFarmers,
      smes: page_data.countSummary.totalSmes,
      vendors: page_data.countSummary.totalVendors,
    };

    avatar.set(page_data.basicData.avatarLink);
  
    //   let progress=0;
    let focused = false;
    //   let textColor="text-rank-"+farmer.rank.toLowerCase();
    //   let nextRankColor="text-rank-"+farmer.next_rank.toLowerCase();
    //   let hex="-[#ffd700]";
  
    onMount(async () => {
      //   progress=farmer.points/(farmer.points+farmer.more_points)*100;
      //   card=card;
    });
  
  </script>
  
  <div class="hidden">
    <p class="text-rank-gold bg-rank-gold">Gold</p>
  </div>
  
  <div class="flex flex-row">
    {#if focused}
      <Sidebar bind:focused />
    {:else}
      <RolledSidebar bind:focused />
    {/if}
    <div class="w-full h-screen p-5">
      <Header page="Dashboard"/>
      <Card class="max-w-full w-full bg-body_custom" padding="md" horizontal>
        <div class="flex items-center pb-4 w-full">
          <Avatar bind:src={admin.avatarLink} class="w-48 h-48 ring-border_custom me-12" border/>
          <div class="grow flex flex-col">
            <Table divClass="grow relative overflow-x-auto">
              <TableBody>
                <TableBodyRow
                  class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl"
                >
                  <TableBodyCell class="w-96 text-custom_font-deep font-bold"
                    >Name</TableBodyCell
                  >
                  <TableBodyCell class="text-custom_font-light"
                    >{admin.name}</TableBodyCell
                  >
                </TableBodyRow>
                <!-- <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl">
                            <TableBodyCell class="text-custom_font-deep font-bold">NID</TableBodyCell>
                            <TableBodyCell class="text-custom_font-light">{admin.nid}</TableBodyCell>
                        </TableBodyRow> -->
                <TableBodyRow
                  class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl"
                >
                  <TableBodyCell class="text-custom_font-deep font-bold"
                    >Email</TableBodyCell
                  >
                  <TableBodyCell class="text-custom_font-light"
                    >{admin.email}</TableBodyCell
                  >
                </TableBodyRow>
                <TableBodyRow
                  class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl"
                >
                  <TableBodyCell class="text-custom_font-deep font-bold"
                    >Phone</TableBodyCell
                  >
                  <TableBodyCell class="text-custom_font-light"
                    >{admin.phone}</TableBodyCell
                  >
                </TableBodyRow>
                <TableBodyRow
                  class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl"
                >
                  <TableBodyCell class="text-custom_font-deep font-bold"
                    >Permanent Address</TableBodyCell
                  >
                  <TableBodyCell class="text-custom_font-light"
                    >{admin.permanentAddress}</TableBodyCell
                  >
                </TableBodyRow>
                <TableBodyRow
                  class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl"
                >
                  <TableBodyCell class="text-custom_font-deep font-bold"
                    >Date of Birth</TableBodyCell
                  >
                  <TableBodyCell class="text-custom_font-light"
                    >{admin.dob}</TableBodyCell
                  >
                </TableBodyRow>

              </TableBody>
            </Table>
            <div class="flex flex-row items-center w-full space-x-48 mt-10 ml-10">
              <div
                class="border-4 border-custom_font-reddish text-center rounded-xl w-48 text-md text-custom_font-reddish"
              >
                <p class="mt-2">No. of Farmers</p>
                <p class="mt-3 mb-2 text-xl">{countSummary.farmers}</p>
              </div>
              <div
                class="border-4 border-custom_font-reddish text-center rounded-xl w-48 text-md text-custom_font-reddish"
              >
                <p class="mt-2">No. of SMEs</p>
                <p class="mt-3 mb-2 text-xl">{countSummary.smes}</p>
              </div>
              <div
                class="border-4 border-custom_font-reddish text-center rounded-xl w-48 text-md text-custom_font-reddish"
              >
                <p class="mt-2">No. of Vendors</p>
                <p class="mt-3 mb-2 text-xl">{countSummary.vendors}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

  
      <hr class="mt-3 border-divider_col shadow" />
      <hr class="mb-3 border-divider_col shadow" />
  
      <!-- Insert chart for card here -->
    </div>
  </div>
  