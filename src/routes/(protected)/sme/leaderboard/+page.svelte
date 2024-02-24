<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import {
      Avatar,
      Button,
      Search,
      TabItem,
      Table,
      TableBodyCell,
      TableBodyRow,
      TableHead,
      TableHeadCell,
      Tabs,
    } from "flowbite-svelte";
  
    import { page } from "$app/stores";
    import {
      ChevronLeftSolid,
      ChevronRightSolid,
      MedalSolid,
      UsersSlashSolid,
    } from "svelte-awesome-icons";
  
    let focused = false;
  
    let pagination_page_sme = 0;
  
    function previoussme() {
      pagination_page_sme--;
    }
    function nextsme() {
      pagination_page_sme++;
    }
  
    let data = $page.data;
    let smeLeaderboard = data.leaderboard;
    let selfRank = data.selfRank[0];
    let smeIndex = smeLeaderboard.findIndex((x) => x.nid == selfRank.nid);
    console.log(selfRank);
    console.log(selfRank.nid == smeLeaderboard[0].nid);
  </script>
  
  <div class="flex flex-row">
    {#if focused}
      <Sidebar bind:focused />
    {:else}
      <RolledSidebar bind:focused />
    {/if}
    <div class="w-full h-screen p-5">
      <Header page="Leaderboard" />
  
      <Table shadow>
        <TableHead>
          <TableHeadCell
            class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
            >Rank</TableHeadCell
          >
          <TableHeadCell
            class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/3"
            >Name</TableHeadCell
          >
          <TableHeadCell
            class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
            >Points</TableHeadCell
          >
        </TableHead>
        {#if smeLeaderboard.length == 0}
          <TableBodyRow
            class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl"
          >
            <TableBodyCell
              colspan="8"
              class="text-custom_font-table_header items-center rounded-b-xl"
            >
              <div class="flex flex-col items-center justify-center">
                <span class="text-custom_font-table_header text-xl"
                  >No smes Found</span
                >
                <UsersSlashSolid class="w-48 h-48 mt-4 text-gray-400" />
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {:else}
          {#if pagination_page_sme * 10 > smeIndex}
            <TableBodyRow
              class="bg-gradient-to-b from-5% via-[#27C848] via-30% to-[#308140B3] to-[#C8F7DA] to-90% "
            >
              <TableBodyCell class="text-custom_font-table-header text-center">
                {#if smeLeaderboard[smeIndex].rank == 1}
                  <MedalSolid class="w-5 h-5 text-rank-gold m-auto" />
                {:else if smeLeaderboard[smeIndex].rank == 2}
                  <MedalSolid class="w-5 h-5 text-rank-silver m-auto" />
                {:else if smeLeaderboard[smeIndex].rank == 3}
                  <MedalSolid class="w-5 h-5 text-rank-bronze m-auto" />
                {:else}
                  {smeLeaderboard[smeIndex].rank}
                {/if}
              </TableBodyCell>
              <TableBodyCell
                class="text-custom_font-table-header flex flex-row items-center"
              >
                <Avatar
                  class="w-7 h-7 me-2"
                  src={smeLeaderboard[smeIndex].avatarLink}
                  alt="avatar"
                />
                {smeLeaderboard[smeIndex].name}
              </TableBodyCell>
              <TableBodyCell class="text-custom_font-table-header text-center"
                >{smeLeaderboard[smeIndex].points}</TableBodyCell
              >
            </TableBodyRow>
            {#if pagination_page_sme * 10 != smeIndex + 1}
              <TableBodyRow
                class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
              >
                <TableBodyCell class="text-center text-custom_font-table-header">
                  ...
                </TableBodyCell>
                <TableBodyCell class="text-center text-custom_font-table-header"
                  >...</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center">
                  ...
                </TableBodyCell>
                <TableBodyCell class="text-center text-custom_font-table-header"
                  >...</TableBodyCell
                >
              </TableBodyRow>
            {/if}
          {/if}
          {#each smeLeaderboard.slice(pagination_page_sme * 10, (pagination_page_sme + 1) * 10 + 1) as { name, points, rank, avatarLink }, i}
            {#if name == selfRank.name}
              <TableBodyRow
                class="bg-gradient-to-b from-[#67D895] via-[#27C848] to-[#308140B3] "
              >
                <TableBodyCell class="text-white font-bold text-center">
                  {#if rank == 1}
                    <MedalSolid class="w-5 h-5 text-rank-gold m-auto" />
                  {:else if rank == 2}
                    <MedalSolid class="w-5 h-5 text-rank-silver m-auto" />
                  {:else if rank == 3}
                    <MedalSolid class="w-5 h-5 text-rank-bronze m-auto" />
                  {:else}
                    {rank}
                  {/if}
                </TableBodyCell>
                <TableBodyCell
                  class="text-white font-bold flex flex-row items-center"
                >
                  <Avatar class="w-7 h-7 me-2" src={avatarLink} alt="avatar" />
                  {name}
                </TableBodyCell>
                <TableBodyCell class="text-white font-bold text-center"
                  >{points}</TableBodyCell
                >
              </TableBodyRow>
            {:else}
              <TableBodyRow
                class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
              >
                <TableBodyCell class="text-center text-custom_font-table-header">
                  {#if rank == 1}
                    <MedalSolid class="w-5 h-5 text-rank-gold m-auto" />
                  {:else if rank == 2}
                    <MedalSolid class="w-5 h-5 text-rank-silver m-auto" />
                  {:else if rank == 3}
                    <MedalSolid class="w-5 h-5 text-rank-bronze m-auto" />
                  {:else}
                    {rank}
                  {/if}
                </TableBodyCell>
                <TableBodyCell
                  class="text-custom_font-table-header flex flex-row items-center"
                >
                  <Avatar class="w-7 h-7 me-2" src={avatarLink} alt="avatar" />
                  {name}
                </TableBodyCell>
                <TableBodyCell class="text-center text-custom_font-table-header"
                  >{points}</TableBodyCell
                >
              </TableBodyRow>
            {/if}
          {/each}
          {#if pagination_page_sme * 10 + 10 <= smeIndex}
            {#if pagination_page_sme * 10 + 10 != smeIndex}
              <TableBodyRow
                class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
              >
                <TableBodyCell class="text-center text-custom_font-table-header">
                  ...
                </TableBodyCell>
                <TableBodyCell class="text-center text-custom_font-table-header"
                  >...</TableBodyCell
                >
                <TableBodyCell class="text-custom_font-table-header text-center">
                  ...
                </TableBodyCell>
                <TableBodyCell class="text-center text-custom_font-table-header"
                  >...</TableBodyCell
                >
              </TableBodyRow>
            {/if}
            <TableBodyRow
              class="bg-gradient-to-b from-[#C8F7DA] from-5% via-[#27C848] via-30% to-[#308140B3] to-90% "
            >
              <TableBodyCell class="text-custom_font-table-header text-center">
                {#if smeLeaderboard[smeIndex].rank == 1}
                  <MedalSolid class="w-5 h-5 text-rank-gold m-auto" />
                {:else if smeLeaderboard[smeIndex].rank == 2}
                  <MedalSolid class="w-5 h-5 text-rank-silver m-auto" />
                {:else if smeLeaderboard[smeIndex].rank == 3}
                  <MedalSolid class="w-5 h-5 text-rank-bronze m-auto" />
                {:else}
                  {smeLeaderboard[smeIndex].rank}
                {/if}
                {smeLeaderboard[smeIndex].rank}
              </TableBodyCell>
              <TableBodyCell class="text-custom_font-table-header "
                >{smeLeaderboard[smeIndex].name}</TableBodyCell
              >
              <TableBodyCell
                class="text-custom_font-table-header flex flex-row items-center"
              >
                <Avatar
                  class="w-7 h-7 me-2"
                  src={smeLeaderboard[smeIndex].avatarLink}
                  alt="avatar"
                />
                {smeLeaderboard[smeIndex].agentname}
              </TableBodyCell>
              <TableBodyCell class="text-custom_font-table-header text-center"
                >{smeLeaderboard[smeIndex].points}</TableBodyCell
              >
            </TableBodyRow>
          {/if}
          <TableBodyRow
            class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl"
          >
            <TableBodyCell colspan="7">
              <div class="flex flex-row items-center justify-between w-full">
                <Button
                  on:click={previoussme}
                  disabled={pagination_page_sme == 0}
                  class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
                >
                  <ChevronLeftSolid class="w-4 h-4" />
                  Previous
                </Button>
                <p class="text-custom_font-table_header grow text-center">
                  Showing
                  <span class="font-bold">{pagination_page_sme * 10 + 1}</span>
                  to
                  <span class="font-bold"
                    >{Math.min(
                      smeLeaderboard.length,
                      pagination_page_sme * 10 + 10
                    )}</span
                  >
                  of
                  <span class="font-bold">{smeLeaderboard.length}</span>
                  entries
                </p>
                <Button
                  on:click={nextsme}
                  disabled={pagination_page_sme >=
                    smeLeaderboard.length / 10 - 1}
                  class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
                >
                  Next
                  <ChevronRightSolid class="w-4 h-4" />
                </Button>
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/if}
      </Table>
    </div>
  </div>
  