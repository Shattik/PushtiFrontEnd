<script>
  import Sidebar from "../Sidebar.svelte";
  import RolledSidebar from "../RolledSidebar.svelte";
  import Header from "../../Header.svelte";
  import ProductCard from "../../ProductCard.svelte";

  let focused = false;

  let inventory = [ {name: "KUE", quantity: 3, price: 23}, {name: "Khaan", quantity: 3, price: 23}, {name: "Zaura", quantity: 3, price: 23} ]
</script>

<div class="flex flex-row">
    {#if focused}
      <Sidebar bind:focused />
    {:else}
      <RolledSidebar bind:focused />
    {/if}
    <div class="w-full h-screen p-5">
        <Header page="Inventory" />

        <div class="grid grid-cols-4 gap-7">
            {#each inventory as { name, quantity, price }, i}
                <ProductCard name={name} quantity={quantity} unitPrice={price} />
	        {/each}
        </div>
    </div>
</div>