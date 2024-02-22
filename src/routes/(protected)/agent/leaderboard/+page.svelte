<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import { Avatar, Button, Search, TabItem, Table, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tabs } from 'flowbite-svelte';

    import { page } from "$app/stores";
    import { ChevronLeftSolid, ChevronRightSolid, UsersSlashSolid } from "svelte-awesome-icons";

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
            <TabItem open title="Farmer" >
                <div class="space-y-3">
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                            >Rank</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg w-1/4"
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
                                <TableBodyRow class="border-b-2 border-divider_col">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        {rank}
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
            <TabItem open title="SME" >
                <div class="space-y-3">
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                            >Rank</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg w-1/4"
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
                                <TableBodyRow class="border-b-2 border-divider_col">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        {rank}
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
            <TabItem open title="Vendor" >
                <div class="space-y-3">
                    <Table shadow>
                        <TableHead>
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
                            >Rank</TableHeadCell
                            >
                            <TableHeadCell
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg w-1/4"
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
                                <TableBodyRow class="border-b-2 border-divider_col">
                                    <TableBodyCell class="text-custom_font-table-header text-center">
                                        {rank}
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
                                class="text-custom_font-table_header font-bold text-center bg-sidebar_bg w-1/4"
                            >Name</TableHeadCell
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
                            {#each unionLeaderboard.slice(pagination_page_union*10, (pagination_page_union+1)*10+1) as { name, points, rank }, i}
                                {#if name == selfRank.name}
                                    <TableBodyRow class="bg-logo-1 border-b-2 border-divider_col">
                                        <TableBodyCell class="text-center">
                                            {rank}
                                        </TableBodyCell>
                                        <TableBodyCell class="text-center">{name}</TableBodyCell>
                                        <TableBodyCell class="text-center">{points}</TableBodyCell>
                                    </TableBodyRow>
                                {:else}
                                    <TableBodyRow class="border-b-2 border-divider_col">
                                        <TableBodyCell class="text-center">
                                            {rank}
                                        </TableBodyCell>
                                        <TableBodyCell class="text-center">{name}</TableBodyCell>
                                        <TableBodyCell class="text-center">{points}</TableBodyCell>
                                    </TableBodyRow>
                                {/if}
                            {/each}
                            
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
