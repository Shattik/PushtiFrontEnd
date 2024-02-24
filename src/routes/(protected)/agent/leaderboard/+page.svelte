<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import { Avatar, Button, Search, TabItem, Table, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tabs } from 'flowbite-svelte';

    import { page } from "$app/stores";
    import { ChevronLeftSolid, ChevronRightSolid, MedalSolid, UsersSlashSolid } from "svelte-awesome-icons";

    let focused = false;
    let value = "";

    let pagination_page_farmer = 0,
    pagination_page_sme = 0, pagination_page_vendor = 0, pagination_page_union = 0;

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

    function previousVendor() {
        pagination_page_vendor--;
    }
    function previousUnion() {
        pagination_page_union--;
    }
    function nextVendor() {
        pagination_page_vendor++;
    }
    function nextUnion() {
        pagination_page_union++;
    }

    let data = $page.data;
    let unionLeaderboard = data.unionLeaderboard;
    let farmerLeaderboard = data.farmerLeaderboard;
    let smeLeaderboard = data.smeLeaderboard;
    let vendorLeaderboard = data.vendorLeaderboard;
    let selfRank = data.selfUnionRank[0];
    let unionIndex = unionLeaderboard.findIndex((x)=> x.name==selfRank.name);
    console.log(selfRank);
    console.log(selfRank.name==unionLeaderboard[0].name)
</script>

<div class="flex flex-row">
    {#if focused}
        <Sidebar bind:focused />
    {:else}
        <RolledSidebar bind:focused />
    {/if}
    <div class="w-full h-screen p-5">
        <Header page="Leaderboard" />
        <Tabs style="underline" contentClass="p-4 bg-divider_col rounded-lg dark:bg-gray-800 mt-4 h-5/5">
            <TabItem title="Farmer" >
                <div class="space-y-3">
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                            >Rank</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/2"
                            >Name</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                                >Points</TableHeadCell
                            >
                        </TableHead>
                        {#if farmerLeaderboard.length==0}
                            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
                                <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                                    <div class="flex flex-col items-center justify-center ">
                                        <span class="text-custom_font-table_header text-xl">No Farmers Found</span>
                                        <UsersSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                                    </div>
                                </TableBodyCell>
                            </TableBodyRow>
                        {:else}
                            {#each farmerLeaderboard.slice(pagination_page_farmer*10, (pagination_page_farmer+1)*10+1) as { name,avatarLink, points, rank }, i}
                                <TableBodyRow class="bg-body_custom drop-shadow-md border-b-2 border-divider_col">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        {#if rank==1}
                                            <MedalSolid class="w-5 h-5 text-rank-gold m-auto"/>
                                        {:else if rank==2}
                                            <MedalSolid class="w-5 h-5 text-rank-silver m-auto"/>
                                        {:else if rank==3}
                                            <MedalSolid class="w-5 h-5 text-rank-bronze m-auto"/>
                                        {:else}
                                            {rank}
                                        {/if}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header  flex flex-row items-center">
                                        <Avatar
                                        class="w-7 h-7 me-2"
                                        src={avatarLink}
                                        alt="avatar"
                                        />
                                        {name}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header text-center">{points}</TableBodyCell>
                                </TableBodyRow>
                            {/each}
                            <TableBodyRow
                            class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl"
                            >
                            <TableBodyCell colspan="7">
                                <div class="flex flex-row items-center justify-between w-full">
                                <Button
                                    on:click={previousFarmer}
                                    disabled={pagination_page_farmer == 0}
                                    class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
                                >
                                    <ChevronLeftSolid class="w-4 h-4" />
                                    Previous
                                </Button>
                                <p class="text-custom_font-table_header grow text-center">
                                    Showing
                                    <span class="font-bold">{pagination_page_farmer * 10 + 1}</span
                                    >
                                    to
                                    <span class="font-bold"
                                    >{Math.min(
                                        farmerLeaderboard.length,
                                        pagination_page_farmer * 10 + 10
                                    )}</span
                                    >
                                    of
                                    <span class="font-bold">{farmerLeaderboard.length}</span>
                                    entries
                                </p>
                                <Button
                                    on:click={nextFarmer}
                                    disabled={pagination_page_farmer >=
                                    farmerLeaderboard.length / 10 - 1}
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
            </TabItem>
            <TabItem title="SME" >
                <div class="space-y-3">
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                            >Rank</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/2"
                            >Name</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                                >Points</TableHeadCell
                            >
                        </TableHead>
                        {#if smeLeaderboard.length==0}
                            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
                                <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                                    <div class="flex flex-col items-center justify-center ">
                                        <span class="text-custom_font-table_header text-xl">No SMEs Found</span>
                                        <UsersSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                                    </div>
                                </TableBodyCell>
                            </TableBodyRow>
                        {:else}
                            {#each smeLeaderboard.slice(pagination_page_sme*10, (pagination_page_sme+1)*10+1) as { name,avatarLink, points, rank }, i}
                                <TableBodyRow class="bg-body_custom drop-shadow-md border-b-2 border-divider_col">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        {#if rank==1}
                                            <MedalSolid class="w-5 h-5 text-rank-gold m-auto"/>
                                        {:else if rank==2}
                                            <MedalSolid class="w-5 h-5 text-rank-silver m-auto"/>
                                        {:else if rank==3}
                                            <MedalSolid class="w-5 h-5 text-rank-bronze m-auto"/>
                                        {:else}
                                            {rank}
                                        {/if}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header flex flex-row items-center">
                                        <Avatar
                                        class="w-7 h-7 me-2"
                                        src={avatarLink}
                                        alt="avatar"
                                        />
                                        {name}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header text-center">{points}</TableBodyCell>
                                </TableBodyRow>
                            {/each}
                            <TableBodyRow
                            class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl"
                            >
                            <TableBodyCell colspan="7">
                                <div class="flex flex-row items-center justify-between w-full">
                                <Button
                                    on:click={previousSME}
                                    disabled={pagination_page_sme == 0}
                                    class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
                                >
                                    <ChevronLeftSolid class="w-4 h-4" />
                                    Previous
                                </Button>
                                <p class="text-custom_font-table_header grow text-center">
                                    Showing
                                    <span class="font-bold">{pagination_page_sme * 10 + 1}</span
                                    >
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
                                    on:click={nextSME}
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
            </TabItem>
            <TabItem title="Vendor" >
                <div class="space-y-3">
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                            >Rank</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/2"
                            >Name</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                                >Points</TableHeadCell
                            >
                        </TableHead>
                        {#if vendorLeaderboard.length==0}
                            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
                                <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                                    <div class="flex flex-col items-center justify-center ">
                                        <span class="text-custom_font-table_header text-xl">No Vendors Found</span>
                                        <UsersSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                                    </div>
                                </TableBodyCell>
                            </TableBodyRow>
                        {:else}
                            {#each vendorLeaderboard.slice(pagination_page_vendor*10, (pagination_page_vendor+1)*10+1) as { name,avatarLink, points, rank }, i}
                                <TableBodyRow class="bg-body_custom drop-shadow-md border-b-2 border-divider_col">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        {#if rank==1}
                                            <MedalSolid class="w-5 h-5 text-rank-gold m-auto"/>
                                        {:else if rank==2}
                                            <MedalSolid class="w-5 h-5 text-rank-silver m-auto"/>
                                        {:else if rank==3}
                                            <MedalSolid class="w-5 h-5 text-rank-bronze m-auto"/>
                                        {:else}
                                            {rank}
                                        {/if}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header flex flex-row items-center">
                                        <Avatar
                                        class="w-7 h-7 me-2"
                                        src={avatarLink}
                                        alt="avatar"
                                        />
                                        {name}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header text-center">{points}</TableBodyCell>
                                </TableBodyRow>
                            {/each}
                            <TableBodyRow
                            class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl"
                            >
                            <TableBodyCell colspan="7">
                                <div class="flex flex-row items-center justify-between w-full">
                                <Button
                                    on:click={previousVendor}
                                    disabled={pagination_page_vendor == 0}
                                    class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
                                >
                                    <ChevronLeftSolid class="w-4 h-4" />
                                    Previous
                                </Button>
                                <p class="text-custom_font-table_header grow text-center">
                                    Showing
                                    <span class="font-bold">{pagination_page_vendor * 10 + 1}</span
                                    >
                                    to
                                    <span class="font-bold"
                                    >{Math.min(
                                        vendorLeaderboard.length,
                                        pagination_page_vendor * 10 + 10
                                    )}</span
                                    >
                                    of
                                    <span class="font-bold">{vendorLeaderboard.length}</span>
                                    entries
                                </p>
                                <Button
                                    on:click={nextVendor}
                                    disabled={pagination_page_vendor >=
                                    vendorLeaderboard.length / 10 - 1}
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
            </TabItem>
            <TabItem open title="Union" >
                <div class="space-y-3">
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                            >Rank</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/6"
                            >Name</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/3"
                            >Agent</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                                >Points</TableHeadCell
                            >
                        </TableHead>
                        {#if unionLeaderboard.length==0}
                            <TableBodyRow class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl">
                                <TableBodyCell colspan="8" class="text-custom_font-table_header items-center rounded-b-xl">
                                    <div class="flex flex-col items-center justify-center ">
                                        <span class="text-custom_font-table_header text-xl">No Unions Found</span>
                                        <UsersSlashSolid class="w-48 h-48 mt-4 text-gray-400"/>
                                    </div>
                                </TableBodyCell>
                            </TableBodyRow>
                        {:else}
                            {#if pagination_page_union*10>unionIndex}
                                <TableBodyRow class="bg-gradient-to-b from-5% via-[#27C848] via-30% to-[#308140B3] to-[#C8F7DA] to-90% ">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                         {#if unionLeaderboard[unionIndex].rank==1}
                                                <MedalSolid class="w-5 h-5 text-rank-gold m-auto"/>
                                        {:else if unionLeaderboard[unionIndex].rank==2}
                                            <MedalSolid class="w-5 h-5 text-rank-silver m-auto"/>
                                        {:else if unionLeaderboard[unionIndex].rank==3}
                                            <MedalSolid class="w-5 h-5 text-rank-bronze m-auto"/>
                                        {:else}
                                            {unionLeaderboard[unionIndex].rank}
                                        {/if}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header ">{unionLeaderboard[unionIndex].name}</TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header flex flex-row items-center">
                                        <Avatar
                                        class="w-7 h-7 me-2"
                                        src={unionLeaderboard[unionIndex].avatarLink}
                                        alt="avatar"
                                        />
                                        {unionLeaderboard[unionIndex].agentname}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header text-center">{unionLeaderboard[unionIndex].points}</TableBodyCell>
                                </TableBodyRow>
                                {#if pagination_page_union*10!=unionIndex+1}
                                <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                                    <TableBodyCell class="text-center text-custom_font-table-header">
                                        ...
                                    </TableBodyCell>
                                    <TableBodyCell class="text-center text-custom_font-table-header">...</TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        ...
                                    </TableBodyCell>
                                    <TableBodyCell class="text-center text-custom_font-table-header">...</TableBodyCell>
                                </TableBodyRow>
                                {/if}
                            {/if}
                            {#each unionLeaderboard.slice(pagination_page_union*10, (pagination_page_union+1)*10+1) as { name, points, rank, agentname, avatarLink }, i}
                                {#if name == selfRank.name}
                                    <TableBodyRow class="bg-gradient-to-b from-[#67D895] via-[#27C848] to-[#308140B3] ">
                                        <TableBodyCell class="text-white font-bold text-center">
                                            {#if rank==1}
                                                <MedalSolid class="w-5 h-5 text-rank-gold m-auto"/>
                                            {:else if rank==2}
                                                <MedalSolid class="w-5 h-5 text-rank-silver m-auto"/>
                                            {:else if rank==3}
                                                <MedalSolid class="w-5 h-5 text-rank-bronze m-auto"/>
                                            {:else}
                                                {rank}
                                            {/if}
                                        </TableBodyCell>
                                        <TableBodyCell class="text-white font-bold ">{name}</TableBodyCell>
                                        <TableBodyCell class="text-white font-bold flex flex-row items-center">
                                            <Avatar
                                            class="w-7 h-7 me-2"
                                            src={avatarLink}
                                            alt="avatar"
                                            />
                                            {agentname}
                                        </TableBodyCell>
                                        <TableBodyCell class="text-white font-bold text-center">{points}</TableBodyCell>
                                    </TableBodyRow>
                                {:else}
                                    <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                                        <TableBodyCell class="text-center text-custom_font-table-header">
                                            {#if rank==1}
                                                <MedalSolid class="w-5 h-5 text-rank-gold m-auto"/>
                                            {:else if rank==2}
                                                <MedalSolid class="w-5 h-5 text-rank-silver m-auto"/>
                                            {:else if rank==3}
                                                <MedalSolid class="w-5 h-5 text-rank-bronze m-auto"/>
                                            {:else}
                                                {rank}
                                            {/if}
                                        </TableBodyCell>
                                        <TableBodyCell class=" text-custom_font-table-header">{name}</TableBodyCell>
                                        <TableBodyCell class="text-custom_font-table-header flex flex-row items-center">
                                            <Avatar
                                            class="w-7 h-7 me-2"
                                            src={avatarLink}
                                            alt="avatar"
                                            />
                                            {agentname}
                                        </TableBodyCell>
                                        <TableBodyCell class="text-center text-custom_font-table-header">{points}</TableBodyCell>
                                    </TableBodyRow>
                                {/if}
                            {/each}
                            {#if pagination_page_union*10+10<=unionIndex}
                                {#if pagination_page_union*10+10!=unionIndex}
                                <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md">
                                    <TableBodyCell class="text-center text-custom_font-table-header">
                                        ...
                                    </TableBodyCell>
                                    <TableBodyCell class="text-center text-custom_font-table-header">...</TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        ...
                                    </TableBodyCell>
                                    <TableBodyCell class="text-center text-custom_font-table-header">...</TableBodyCell>
                                </TableBodyRow>
                                {/if}
                                <TableBodyRow class="bg-gradient-to-b from-[#C8F7DA] from-5% via-[#27C848] via-30% to-[#308140B3] to-90% ">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        {#if unionLeaderboard[unionIndex].rank==1}
                                                <MedalSolid class="w-5 h-5 text-rank-gold m-auto"/>
                                        {:else if unionLeaderboard[unionIndex].rank==2}
                                            <MedalSolid class="w-5 h-5 text-rank-silver m-auto"/>
                                        {:else if unionLeaderboard[unionIndex].rank==3}
                                            <MedalSolid class="w-5 h-5 text-rank-bronze m-auto"/>
                                        {:else}
                                            {unionLeaderboard[unionIndex].rank}
                                        {/if}
                                        {unionLeaderboard[unionIndex].rank}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header ">{unionLeaderboard[unionIndex].name}</TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header flex flex-row items-center">
                                        <Avatar
                                        class="w-7 h-7 me-2"
                                        src={unionLeaderboard[unionIndex].avatarLink}
                                        alt="avatar"
                                        />
                                        {unionLeaderboard[unionIndex].agentname}
                                    </TableBodyCell>
                                    <TableBodyCell class="text-custom_font-table-header text-center">{unionLeaderboard[unionIndex].points}</TableBodyCell>
                                </TableBodyRow>
                            {/if}
                            <TableBodyRow
                            class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl"
                            >
                            <TableBodyCell colspan="7">
                                <div class="flex flex-row items-center justify-between w-full">
                                <Button
                                    on:click={previousUnion}
                                    disabled={pagination_page_union == 0}
                                    class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
                                >
                                    <ChevronLeftSolid class="w-4 h-4" />
                                    Previous
                                </Button>
                                <p class="text-custom_font-table_header grow text-center">
                                    Showing
                                    <span class="font-bold">{pagination_page_union * 10 + 1}</span
                                    >
                                    to
                                    <span class="font-bold"
                                    >{Math.min(
                                        unionLeaderboard.length,
                                        pagination_page_union * 10 + 10
                                    )}</span
                                    >
                                    of
                                    <span class="font-bold">{unionLeaderboard.length}</span>
                                    entries
                                </p>
                                <Button
                                    on:click={nextUnion}
                                    disabled={pagination_page_union >=
                                    unionLeaderboard.length / 10 - 1}
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
            </TabItem>
        </Tabs>
    </div>
</div>
