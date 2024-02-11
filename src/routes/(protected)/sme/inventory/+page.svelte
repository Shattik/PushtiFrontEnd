<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import ProductCard from "../../ProductCard.svelte";
    import { Search } from "flowbite-svelte";
  
    import { page } from "$app/stores";
  
    let focused = false;
    let value = "";
  
    // let inventory = [ {name: "KUE", quantity: 3, price: 23}, {name: "Khaan", quantity: 3, price: 23}, {name: "Zaura", quantity: 3, price: 23} ]
    let data = $page.data;
    // let inventory = $page.data;
    console.log(data);
    let mainInventory = data.inventory;
    let inventory;
  
    $: inventory = mainInventory.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
  </script>
  
  <div class="flex flex-row">
    {#if focused}
      <Sidebar bind:focused />
    {:else}
      <RolledSidebar bind:focused />
    {/if}
    <div class="w-full h-screen p-5">
      <Header page="Inventory" />
      <Search placeholder="Search Products" bind:value></Search>
      <div
        class="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-7 mt-10 mb-5"
      >
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
  