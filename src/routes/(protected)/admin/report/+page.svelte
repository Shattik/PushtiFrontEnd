<script>
  import { format } from "date-fns";
  import Header from "../../Header.svelte";
  import Loading from "../../../loading.svelte";
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
  import { get } from "svelte/store";
  import { jwtToken } from "$lib/Components/token.js";

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
  let loading=false;
  let leaderboardType ="Division";
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
    loading=true;
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

    const response2 = await fetch(`${PUBLIC_API_GATEWAY_URL}/admin/reports/division`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
        body: JSON.stringify({division_id:division})
    });
    console.log(response2);
    const data = await response2.json();
    console.log(data);
    page_data.generalStats = data.divisionStats;
    generalLeaderboard = data.divisionLeaderboard;
    leaderboardType = "District";
    console.log(generalLeaderboard);  
    console.log(page_data.generalStats);
    loading=false;
  }

  async function getUpazillas() {
    loading=true;
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
    const response2 = await fetch(`${PUBLIC_API_GATEWAY_URL}/admin/report/district`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
        body: JSON.stringify({district_id:district})
    });
    console.log(response2);
    const data = await response2.json();
    console.log(data);
    page_data.generalStats = data.districtStats;
    generalLeaderboard = data.districtLeaderboard;
    leaderboardType = "Upazilla";
    console.log(generalLeaderboard);  
    console.log(page_data.generalStats);
    loading=false;  
  }

  async function getUnions() {
    loading=true;
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
    const response2 = await fetch(`${PUBLIC_API_GATEWAY_URL}/admin/report/upazilla`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
        body: JSON.stringify({upazilla_id:district})
    });
    console.log(response2);
    const data = await response2.json();
    console.log(data);
    page_data.generalStats = data.upazillaStats;
    generalLeaderboard = data.upazillaLeaderboard;
    leaderboardType = "Union";
    loading=false;
  }

  let agent;
  let taxDataAmountList, taxDataMonthList;

  async function getUnionDetails() {
    loading=true;
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/admin/report/union`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
        body: JSON.stringify({union_id:union})
    });
    console.log(response);
    const data = await response.json();
    agent = {
      name: data.agentDashboardData.basicData.name,
      nid: data.agentDashboardData.basicData.nid,
      email: data.agentDashboardData.basicData.email,
      union: data.agentDashboardData.basicData.unionName,
      farmers: data.agentDashboardData.unionDetails[0].noFarmers,
      smes: data.agentDashboardData.unionDetails[0].noSme,
      vendors: data.agentDashboardData.unionDetails[0].noVendors,
      avatarLink: data.agentDashboardData.basicData.avatarLink,
    };
    console.log(data);
    let totalLoan =
      parseInt(data.agentDashboardData.unionDetails[0].totalFarmerLoan) +
      parseInt(data.agentDashboardData.unionDetails[0].totalSmeLoan);
    let totalBuy = parseInt(data.agentDashboardData.unionDetails[0].totalBuy);
    let totalSell = parseInt(data.agentDashboardData.unionDetails[0].totalSell);
    let totalTax = parseInt(data.agentDashboardData.unionDetails[0].totalTax);
    pieData = [
      parseInt(data.agentDashboardData.unionDetails[0].availableBudget),
      parseInt(data.agentDashboardData.unionDetails[0].totalFarmerLoan),
      parseInt(data.agentDashboardData.unionDetails[0].totalSmeLoan),
    ];

    barData = [totalLoan, totalBuy, totalSell, totalTax];
    // page_data.generalStats = data.unionStats;
    // generalLeaderboard = data.unionLeaderboard;
    let taxData = data.agentDashboardData.taxData;

  let taxDataJson = [{ month: "", amount: 0 }];

  taxData.forEach((/** @type {{ month: any; taxAmount: any; }} */ data) => {
    const obj = { month: data.month, amount: data.taxAmount };
    taxDataJson = [obj, ...taxDataJson];
  });

  taxDataJson.pop();

  console.log(taxDataJson);

  // taxDataMonthList is an array of months, converted from the taxDataJson array
  taxDataMonthList = taxDataJson.map(
    (/** @type {{ month: any; amount: any; }} */ data) => data.month
  );

  // taxDataAmountList is an array of amounts, converted from the taxDataJson array(need to convert to number, first convert to string, then to number)
    taxDataAmountList = taxDataJson.map(
        (/** @type {{ month: any; amount: any; }} */ data) => parseInt(String(data.amount))
    );

    // reverse taxDataMonthList and taxDataAmountList
    taxDataMonthList = taxDataMonthList.reverse();
    taxDataAmountList = taxDataAmountList.reverse();

    console.log(taxDataAmountList);
    leaderboardType = "Agent";
    loading=false;
  }

  let pagination_page_general = 0;

  function previousGeneral() {
    pagination_page_general--;
  }
  function nextGeneral() {
    pagination_page_general++;
  }

  let generalLeaderboard = page_data.generalLeaderboard;

  let totalLoan; 
  $:totalLoan=
    page_data.generalStats.totalFarmerLoan +
    page_data.generalStats.totalSmeLoan;
  let pieData;
  $:pieData = [
    parseInt(page_data.generalStats.availableBudget),
    parseInt(page_data.generalStats.totalFarmerLoan),
    parseInt(page_data.generalStats.totalSmeLoan),
  ];
  let barData;
  $:barData = [
    totalLoan,
    page_data.generalStats.totalBuy,
    page_data.generalStats.totalSell,
    page_data.generalStats.totalTax,
  ];
  $:console.log(barData);
  $:console.log(pieData);
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

  <div class="flex flex-col w-full h-screen p-5">
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
          disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
        </Label>
      {/if}
      {#if upazilla}
        <Label class="space-y-2">
          <span class="font-bold">Union</span>
          <Select class="mt-2" items={unions} bind:value={union} on:change={() => {
              getUnionDetails();
            }}
            required 
            disabled={loading}/>
        </Label>
      {/if}
    </div>

    <hr class="mt-3 border-divider_col shadow" />
    <hr class="mb-3 border-divider_col shadow" />
    {#if loading}
      <Loading/>
    {:else if leaderboardType == "Agent"}
      <Card class="max-w-full w-full bg-body_custom" padding="md" horizontal>
        <div class="flex items-center pb-4 w-full">
          <Avatar class="w-48 h-48 ring-border_custom me-12" src={agent.avatarLink} border />
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
                    >{agent.name}</TableBodyCell
                  >
                </TableBodyRow>
                <!-- <TableBodyRow class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl">
                            <TableBodyCell class="text-custom_font-deep font-bold">NID</TableBodyCell>
                            <TableBodyCell class="text-custom_font-light">{agent.nid}</TableBodyCell>
                        </TableBodyRow> -->
                <TableBodyRow
                  class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl"
                >
                  <TableBodyCell class="text-custom_font-deep font-bold"
                    >Email</TableBodyCell
                  >
                  <TableBodyCell class="text-custom_font-light"
                    >{agent.email}</TableBodyCell
                  >
                </TableBodyRow>
                <TableBodyRow
                  class="border-b-2 border-divider_col bg-body_custom drop-shadow-md text-xl"
                >
                  <TableBodyCell class="text-custom_font-deep font-bold"
                    >Union</TableBodyCell
                  >
                  <TableBodyCell class="text-custom_font-light"
                    >{agent.union}</TableBodyCell
                  >
                </TableBodyRow>
              </TableBody>
            </Table>
            <div class="flex flex-row items-center w-full space-x-48 mt-10 ml-10">
              <div
                class="border-4 border-custom_font-reddish text-center rounded-xl w-48 text-md text-custom_font-reddish"
              >
                <p class="mt-2">No. of Farmers</p>
                <p class="mt-3 mb-2 text-xl">{agent.farmers}</p>
              </div>
              <div
                class="border-4 border-custom_font-reddish text-center rounded-xl w-48 text-md text-custom_font-reddish"
              >
                <p class="mt-2">No. of SMEs</p>
                <p class="mt-3 mb-2 text-xl">{agent.smes}</p>
              </div>
              <div
                class="border-4 border-custom_font-reddish text-center rounded-xl w-48 text-md text-custom_font-reddish"
              >
                <p class="mt-2">No. of Vendors</p>
                <p class="mt-3 mb-2 text-xl">{agent.vendors}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

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
      <div class="flex flex-row w-full max-w-full items-center">
        <Card class="max-w-full w-full bg-body_custom mb-5 h-[32rem]">
          <p class="text-3xl font-bold text-custom_font-deep mb-5">
            Monthly Tax Income
          </p>
          <Scatter labels={taxDataMonthList} data={taxDataAmountList} />
        </Card>
      </div>
    {:else}
    <!-- Insert chart for card here -->
      <div class="flex flex-row w-full max-w-full items-center space-x-5">
        <Card class="max-w-full w-1/2 bg-body_custom mb-5 h-[32rem]">
          <p class="text-3xl font-bold text-custom_font-deep mb-5">
            Budget Status
          </p>
          <Pie bind:data={pieData} />
        </Card>
        <Card class="max-w-full w-full bg-body_custom mb-5 h-[32rem]">
          <p class="text-3xl font-bold text-custom_font-deep mb-5">Statistics</p>
          <Bar bind:data={barData} />
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
            {#if leaderboardType == "Union"}
              <TableHeadCell
                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/3"
                >Agent Name</TableHeadCell
              >
              <TableHeadCell
                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/3"
                >Union Name</TableHeadCell
              >
            {:else}
              <TableHeadCell
                class="text-custom_font-table_header font-bold text-left bg-sidebar_bg w-1/2"
                >{leaderboardType} Name</TableHeadCell
              >
            {/if}
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
            {#each generalLeaderboard.slice(pagination_page_general * 10, (pagination_page_general + 1) * 10 + 1) as { name, avatarLink, points, rank,agentname }, i}
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
                {#if leaderboardType == "Union"}
                  <TableBodyCell
                    class="text-custom_font-table-header flex flex-row items-center"
                  >
                    <Avatar
                      class="w-10 h-10"
                      src={avatarLink}
                      alt="avatar"
                    />
                    <span class="ml-2">{agentname}</span>
                  </TableBodyCell>
                  <TableBodyCell
                    class="text-custom_font-table-header items-center"
                  >
                    {name}
                  </TableBodyCell>
                {:else}
                  <TableBodyCell
                    class="text-custom_font-table-header items-center"
                  >
                    {name}
                  </TableBodyCell>
                {/if}
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
    {/if}
  </div>
</div>
