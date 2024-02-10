<script>
  import Sidebar from "../Sidebar.svelte";
  import RolledSidebar from "../RolledSidebar.svelte";
  import Header from "../../Header.svelte";
  import ProductCard from "../../ProductCard.svelte";

  import { page } from "$app/stores";

  let focused = false;

  // let inventory = [ {name: "KUE", quantity: 3, price: 23}, {name: "Khaan", quantity: 3, price: 23}, {name: "Zaura", quantity: 3, price: 23} ]
  let data = $page.data;
  // let inventory = $page.data;
  console.log(data);
  let inventory = data.inventory;
</script>

<div class="flex flex-row">
  {#if focused}
    <Sidebar bind:focused />
  {:else}
    <RolledSidebar bind:focused />
  {/if}
  <div class="w-full h-screen p-5">
    <Header page="Inventory" />

    <div class="grid grid-cols-5 gap-7">
      {#each inventory as { name, amount, unitPrice, unit, imageLink }, i}
        <ProductCard
          {name}
          quantity={amount}
          {unitPrice}
          {unit}
          img={imageLink}
        />
      {/each}
    </div>
  </div>
</div>
