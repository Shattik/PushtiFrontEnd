<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import AdminProduct from "../AdminProduct.svelte";
    import { Search, Modal, Label, Input, Button } from 'flowbite-svelte';
    import { PlusSolid } from "svelte-awesome-icons";
  
    let focused = false;
    let value = "";

    let unitPriceVal, taxVal;
    let newName, newUnit, newPrice, newTax, newLink;
  
  
    // let inventory = [ {name: "KUE", quantity: 3, price: 23}, {name: "Khaan", quantity: 3, price: 23}, {name: "Zaura", quantity: 3, price: 23} ]
    // let data = $page.data;
    // // let inventory = $page.data;
    // console.log(data);
    // let mainInventory = data.inventory;
    let mainInventory = [ {name: "KUE", unitPrice: 23, unit: "kg", tax: 2, imageLink: "https://media.istockphoto.com/id/1297005860/photo/raw-milk-being-poured-into-container.jpg?s=612x612&w=0&k=20&c=5Xumh49_zYs9GjLkGpZXM41tS17K8M-svN9jLMv0JpE=", id: 1}, 
                            {name: "Khaan", unitPrice: 23, unit: "piece", tax:4, imageLink: "https://media.istockphoto.com/id/1297005860/photo/raw-milk-being-poured-into-container.jpg?s=612x612&w=0&k=20&c=5Xumh49_zYs9GjLkGpZXM41tS17K8M-svN9jLMv0JpE=", id: 2}, 
                            {name: "Zaura", unitPrice: 23, unit: "ltr", tax:5, imageLink: "https://media.istockphoto.com/id/1297005860/photo/raw-milk-being-poured-into-container.jpg?s=612x612&w=0&k=20&c=5Xumh49_zYs9GjLkGpZXM41tS17K8M-svN9jLMv0JpE=", id: 3}]
    let inventory;
  
    let index = 0;
    let openModal = false;
    let openModalAdd = false;

    async function editProduct() {
        console.log("paisi");
    }
    
    $:inventory = mainInventory.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())); 
    $:if(unitPriceVal < 0) {
        unitPriceVal = 0;
    }
    $:if(taxVal < 0) {
        taxVal = 0;
    }
    $:if(newPrice < 0) {
        newPrice = 0;
    }
    $:if(newTax < 0) {
        newTax = 0;
    }
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
      <div class="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-7 mt-10 mb-5">
        {#each inventory as { name, tax, unitPrice, unit, imageLink, id }, i}
        <div on:click={() => {index = i;
                            unitPriceVal = inventory[index].unitPrice;
                            taxVal = inventory[index].tax;
                            openModal = true;}}>
          <AdminProduct
            {name}
            {tax}
            {unitPrice}
            {unit}
            img={imageLink}
            {id}
          />
        </div>
        {/each}
        <div class = "group w-full h-[509px] bg-gray-300/30 rounded-lg p-10" on:click={
            () => {
                newName = "";
                newUnit = "";
                newPrice = "";
                newTax = "";
                newLink = "";
                openModalAdd = true;
        }}>
            <div class="grid grid-cols-1 place-items-center border-gray-500 group-hover:border-logo-1 border-dashed border-4 w-full h-full">
                <PlusSolid class="w-24 h-24 text-gray-500 group-hover:text-logo-1"></PlusSolid>
            </div>
        </div>
      </div>
    </div>
  </div>
  <Modal bind:open={openModal} size="md" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit|preventDefault={editProduct}>
      <h3 class="mb-4 text-xl font-medium text-gray-900 text-center dark:text-white">Edit {inventory[index].name}</h3>
      <Label class="space-y-2">
        <span>Unit Price</span>
        <Input type="number" bind:value={unitPriceVal} required />
      </Label>
      <Label class="space-y-2">
        <span>Tax</span>
        <Input type="number" bind:value={taxVal} required />
      </Label>
      <Button type="submit" class="w-full1">Confirm</Button>
    </form>
  </Modal>
  <Modal bind:open={openModalAdd} size="md" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit|preventDefault={editProduct}>
      <h3 class="mb-4 text-xl font-medium text-gray-900 text-center dark:text-white">Add New Product</h3>
      <Label class="space-y-2">
        <span>Name</span>
        <Input type="number" bind:value={newName} required />
      </Label>
      <Label class="space-y-2">
        <span>Unit</span>
        <Input type="text" bind:value={newUnit} required />
      </Label>
      <Label class="space-y-2">
        <span>Unit Price</span>
        <Input type="number" bind:value={newPrice} required />
      </Label>
      <Label class="space-y-2">
        <span>Tax</span>
        <Input type="number" bind:value={newTax} required />
      </Label>
      <Label class="space-y-2">
        <span>Image Link</span>
        <Input type="text" bind:value={newLink} required />
      </Label>
      <Button type="submit" class="w-full1">Confirm</Button>
    </form>
  </Modal>
  