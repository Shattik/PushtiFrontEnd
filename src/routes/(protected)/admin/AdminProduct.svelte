<script>
    import {
      Kbd,
      Table,
      TableBody,
      TableBodyCell,
      TableBodyRow,
      Button,
    } from "flowbite-svelte";
  
    import ProductCard from "$lib/Components/ProductCard.svelte";
  
    export let name = "Beaf Meat";
    export let tax = 3;
    export let unitPrice = 100;
    export let unit = "kg";
    export let img =
      "https://media.post.rvohealth.io/wp-content/uploads/2020/08/beef-update-732x549-thumbnail.jpg";
    export let id = 0;

  </script>
  
  <div class="space-y-4 w-full">
    <ProductCard {img} class="max-w-full aspect-[5/3]" imgsClass="rounded-t-lg h-64">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-[#308140] dark:text-white text-center"
      >
        {name}
      </h5>
  
      <hr class="mt-3 border-divider_col shadow" />
      <hr class="mb-3 border-divider_col shadow" />
  
      <Table divClass="overflow-clip">
        <TableBody>
          <TableBodyRow>
            <TableBodyCell class="text-lg text-[#45B577]">Unit Price:</TableBodyCell>
            <TableBodyCell class="px-2"
              ><Button class="w-16 text-md" color="green">{unitPrice}</Button
              ></TableBodyCell
            >
            <TableBodyCell class="text-lg text-[#45B577]">Tk</TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell class="text-lg text-[#45B577]"
              >Tax:</TableBodyCell
            >
            <TableBodyCell class="px-2"
              ><Button class="w-16 text-md" color="green">{tax}</Button
              ></TableBodyCell
            >
            <TableBodyCell class="text-lg text-[#45B577]">%</TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </Table>
    </ProductCard>
  </div>
  