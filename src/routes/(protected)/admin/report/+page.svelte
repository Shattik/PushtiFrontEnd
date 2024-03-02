<script>
  import { format } from "date-fns";
  import Header from "../../Header.svelte";
  import { onMount } from "svelte";
  import {
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
  import {
    Label,
    Input,
    ButtonGroup,
    InputAddon,
    Button,
    Alert,
    Card,
    Avatar,
    Radio,
    Select,
  } from "flowbite-svelte";

  import {
    Search,
    TabItem,
    TableHead,
    TableHeadCell,
    Tabs,
  } from "flowbite-svelte";
  import {
    ChevronLeftSolid,
    ChevronRightSolid,
    MedalSolid,
    UsersSlashSolid,
  } from "svelte-awesome-icons";

  import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";

  /** @type { SvelteComponent } */
  let card;
  let page_data = $page.data;
  console.log(page_data);

  //   let progress=0;
  let focused = false;

  let division = "";
  let district = "";
  let upazilla = "";
  let union = "";
  let divisions = [{ value: "", name: "" }];

  let districts = [{ value: "", name: "" }];

  let upazillas = [{ value: "", name: "" }];
  let unions = [{ value: "", name: "" }];

  onMount(async () => {
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/register/sme`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let divisions_array = await response.json();

    console.log(divisions_array.divisions);
    let division_json = [{ value: "", name: "" }];

    divisions_array.divisions.forEach(
      (/** @type {{ id: any; name: any; }} */ element) => {
        const obj = { value: element.id, name: element.name };
        // division_json.push(obj);
        // prepend the new division to the array
        division_json = [obj, ...division_json];
      }
    );

    division_json.pop();

    // sort the array by value
    division_json.sort((a, b) => (a.value > b.value ? 1 : -1));

    divisions = division_json;
  });

  async function getDistricts() {
    const req_body = { division };
    console.log("req_body", req_body);
    const response = await fetch(
      `${PUBLIC_API_GATEWAY_URL}/register/district`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req_body),
      }
    );

    let districts_array = await response.json();

    console.log(districts_array);

    // do same as division
    let district_json = [{ value: "", name: "" }];

    districts_array.forEach(
      (/** @type {{ id: any; name: any; }} */ element) => {
        const obj = { value: element.id, name: element.name };
        // district_json.push(obj);
        // prepend the new district to the array
        district_json = [obj, ...district_json];
      }
    );

    district_json.pop();

    // sort the array by value
    district_json.sort((a, b) => (a.value > b.value ? 1 : -1));

    districts = district_json;

    console.log(districts);
  }

  async function getUpazillas() {
    const req_body = { district };
    console.log("req_body", req_body);
    const response = await fetch(
      `${PUBLIC_API_GATEWAY_URL}/register/upazilla`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req_body),
      }
    );

    let upazillas_array = await response.json();

    console.log(upazillas_array);

    // do same as division
    let upazilla_json = [{ value: "", name: "" }];

    upazillas_array.forEach(
      (/** @type {{ id: any; name: any; }} */ element) => {
        const obj = { value: element.id, name: element.name };
        // upazilla_json.push(obj);
        // prepend the new upazilla to the array
        upazilla_json = [obj, ...upazilla_json];
      }
    );

    upazilla_json.pop();

    // sort the array by value
    upazilla_json.sort((a, b) => (a.value > b.value ? 1 : -1));

    upazillas = upazilla_json;

    console.log(upazillas);
  }

  async function getUnions() {
    const req_body = { upazilla };
    console.log("req_body", req_body);
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/register/union`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req_body),
    });

    let unions_array = await response.json();

    console.log(unions_array);

    // do same as division
    let union_json = [{ value: "", name: "" }];

    unions_array.forEach((/** @type {{ id: any; name: any; }} */ element) => {
      const obj = { value: element.id, name: element.name };
      // union_json.push(obj);
      // prepend the new union to the array
      union_json = [obj, ...union_json];
    });

    union_json.pop();

    // sort the array by value
    union_json.sort((a, b) => (a.value > b.value ? 1 : -1));

    unions = union_json;

    console.log(unions);
  }

  let pagination_page_general = 0;

  function previousGeneral() {
    pagination_page_general--;
  }
  function nextGeneral() {
    pagination_page_general++;
  }

  let generalLeaderboard = page_data.generalLeaderboard;

  let totalLoan =
    page_data.generalStats.totalFarmerLoan +
    page_data.generalStats.totalSmeLoan;
  let pieData = [
    parseInt(page_data.generalStats.availableBudget),
    parseInt(page_data.generalStats.totalFarmerLoan),
    parseInt(page_data.generalStats.totalSmeLoan),
  ];
  let barData = [
    totalLoan,
    page_data.generalStats.totalBuy,
    page_data.generalStats.totalSell,
    page_data.generalStats.totalTax,
  ];
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
    <Header page="Report" />

    <div class="flex flex-row flex-wrap space-x-6">
      <Label class="space-y-2">
        <span class="font-bold">Division</span>
        <Select
          class="mt-2"
          items={divisions}
          bind:value={division}
          on:change={() => {
            district = "";
            upazilla = "";
            union = "";
            getDistricts();
          }}
          required
        />
      </Label>
      {#if division}
        <Label class="space-y-2">
          <span class="font-bold">District</span>
          <Select
            class="mt-2"
            items={districts}
            bind:value={district}
            on:change={() => {
              upazilla = "";
              union = "";
              getUpazillas();
            }}
            required
          />
        </Label>
      {/if}
      {#if district}
        <Label class="space-y-2">
          <span class="font-bold">Upazilla</span>
          <Select
            class="mt-2"
            items={upazillas}
            bind:value={upazilla}
            on:change={() => {
              union = "";
              getUnions();
            }}
            required
          />
        </Label>
      {/if}
      {#if upazilla}
        <Label class="space-y-2">
          <span class="font-bold">Union</span>
          <Select class="mt-2" items={unions} bind:value={union} required />
        </Label>
      {/if}
    </div>

    <hr class="mt-3 border-divider_col shadow" />
    <hr class="mb-3 border-divider_col shadow" />

    <!-- Insert chart for card here -->
    <div class="flex flex-row w-full max-w-full items-center space-x-5">
      <Card class="max-w-full w-1/2 bg-body_custom mb-5 h-[32rem]">
        <p class="text-3xl font-bold text-custom_font-deep mb-5">
          Budget Status
        </p>
        <Pie data={pieData} />
      </Card>
      <Card class="max-w-full w-full bg-body_custom mb-5 h-[32rem]">
        <p class="text-3xl font-bold text-custom_font-deep mb-5">Statistics</p>
        <Bar data={barData} />
      </Card>
    </div>

    <hr class="mt-3 border-divider_col shadow" />
    <hr class="mb-3 border-divider_col shadow" />

    <div>
      <Table shadow>
        <TableHead>
          <TableHeadCell
            class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
            >Rank</TableHeadCell
          >
          <TableHeadCell
            class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/2"
            >Division Name</TableHeadCell
          >
          <TableHeadCell
            class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
            >Points</TableHeadCell
          >
        </TableHead>
        {#if generalLeaderboard.length == 0}
          <TableBodyRow
            class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl"
          >
            <TableBodyCell
              colspan="8"
              class="text-custom_font-table_header items-center rounded-b-xl"
            >
              <div class="flex flex-col items-center justify-center">
                <span class="text-custom_font-table_header text-xl"
                  >No Farmers Found</span
                >
                <UsersSlashSolid class="w-48 h-48 mt-4 text-gray-400" />
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {:else}
          {#each generalLeaderboard.slice(pagination_page_general * 10, (pagination_page_general + 1) * 10 + 1) as { name, avatarLink, points, rank }, i}
            <TableBodyRow
              class="bg-body_custom drop-shadow-md border-b-2 border-divider_col"
            >
              <TableBodyCell class="text-custom_font-table-header text-center">
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
                class="text-custom_font-table-header  flex flex-row items-center"
              >
                {name}
              </TableBodyCell>
              <TableBodyCell class="text-custom_font-table-header text-center"
                >{points}</TableBodyCell
              >
            </TableBodyRow>
          {/each}
          <TableBodyRow
            class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl"
          >
            <TableBodyCell colspan="7">
              <div class="flex flex-row items-center justify-between w-full">
                <Button
                  on:click={previousGeneral}
                  disabled={pagination_page_general == 0}
                  class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
                >
                  <ChevronLeftSolid class="w-4 h-4" />
                  Previous
                </Button>
                <p class="text-custom_font-table_header grow text-center">
                  Showing
                  <span class="font-bold"
                    >{pagination_page_general * 10 + 1}</span
                  >
                  to
                  <span class="font-bold"
                    >{Math.min(
                      generalLeaderboard.length,
                      pagination_page_general * 10 + 10
                    )}</span
                  >
                  of
                  <span class="font-bold">{generalLeaderboard.length}</span>
                  entries
                </p>
                <Button
                  on:click={nextGeneral}
                  disabled={pagination_page_general >=
                    generalLeaderboard.length / 10 - 1}
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
</div>
