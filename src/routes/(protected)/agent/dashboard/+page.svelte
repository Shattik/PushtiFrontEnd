<script>
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

  /** @type { SvelteComponent } */
  let card;
  let page_data = $page.data;
  console.log(page_data);

  let agent = {
    name: page_data.basicData.name,
    nid: page_data.basicData.nid,
    email: page_data.basicData.email,
    union: page_data.basicData.unionName,
    farmers: page_data.unionDetails[0].noFarmers,
    smes: page_data.unionDetails[0].noSme,
    vendors: page_data.unionDetails[0].noVendors,
    next_rank: "Platinum",
    benefits: ["Free insurance", "Free seeds"],
  };

  let taxData = page_data.taxData;

  let taxDataJson = [{ month: "", amount: 0 }];

  taxData.forEach((/** @type {{ month: any; taxAmount: any; }} */ data) => {
    const obj = { month: data.month, amount: data.taxAmount };
    taxDataJson = [obj, ...taxDataJson];
  });

  taxDataJson.pop();

  console.log(taxDataJson);

  // taxDataMonthList is an array of months, converted from the taxDataJson array
  let taxDataMonthList = taxDataJson.map(
    (/** @type {{ month: any; amount: any; }} */ data) => data.month
  );

  // taxDataAmountList is an array of amounts, converted from the taxDataJson array(need to convert to number, first convert to string, then to number)
    let taxDataAmountList = taxDataJson.map(
        (/** @type {{ month: any; amount: any; }} */ data) => parseInt(String(data.amount))
    );

    // reverse taxDataMonthList and taxDataAmountList
    taxDataMonthList = taxDataMonthList.reverse();
    taxDataAmountList = taxDataAmountList.reverse();
  

  //   let progress=0;
  let focused = false;
  //   let textColor="text-rank-"+farmer.rank.toLowerCase();
  //   let nextRankColor="text-rank-"+farmer.next_rank.toLowerCase();
  //   let hex="-[#ffd700]";

  onMount(async () => {
    //   progress=farmer.points/(farmer.points+farmer.more_points)*100;
    //   card=card;
  });

  let totalLoan =
    parseInt(page_data.unionDetails[0].totalFarmerLoan) +
    parseInt(page_data.unionDetails[0].totalSmeLoan);
  let totalBuy = parseInt(page_data.unionDetails[0].totalBuy);
  let totalSell = parseInt(page_data.unionDetails[0].totalSell);
  let totalTax = parseInt(page_data.unionDetails[0].totalTax);

  let pieData = [
    parseInt(page_data.unionDetails[0].availableBudget),
    parseInt(page_data.unionDetails[0].totalFarmerLoan),
    parseInt(page_data.unionDetails[0].totalSmeLoan),
  ];
  let barData = [totalLoan, totalBuy, totalSell, totalTax];
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
    <Header page="Dashboard" />
    <Card class="max-w-full w-full bg-body_custom" padding="md" horizontal>
      <div class="flex items-center pb-4 w-full">
        <Avatar class="w-48 h-48 ring-border_custom me-12" border />
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

    <!-- <hr class="mt-3 border-divider_col shadow"/>
      <hr class="mb-3 border-divider_col shadow"/> -->

    <!-- <Card bind:this={card} class="max-w-full w-full bg-body_custom">
          <div class="flex flex-row justify-between items-center mb-3">
              
              <h1 class= {twJoin("text-xl font-bold", textColor)}>{farmer.rank}</h1>
              <h1 class="text-xl text-custom_font-deep font-bold ms-1">{farmer.points} Points</h1>
          </div>
          <Progressbar {progress} animate tweenDuration={1500} easing={sineOut} size="h-3"  class="mb-3 bg-primary-200" labelInside labelInsideClass="h-3 text-transparent text-xs font-medium text-center p-0.5 leading-none rounded-full bg-rank-{farmer.rank.toLowerCase()}"/>
          <p class="text-lg text-custom_font-deep font-medium">{farmer.more_points} points to <span class={twJoin("text-lg font-medium", nextRankColor)}>{farmer.next_rank}</span></p>
          <p class="my-3"><span class={twJoin("text-xl font-medium", textColor)}>Your Rewards</span></p>
          {#each farmer.benefits as benefit}
          <div class="flex flex-row">
              <StarRegular class="w-6 h-6 me-3 mb-4 text-rank-{farmer.rank.toLowerCase()}"/>
              <p class="text-lg text-custom_font-deep font-medium">{benefit}</p>
          </div>
          {/each}
      </Card> -->

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
  </div>
</div>
