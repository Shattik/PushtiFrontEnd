<script>
    import { Card, Kbd, Table, TableBody, TableBodyCell, TableBodyRow, Button } from 'flowbite-svelte';

    export let name = "Beaf Meat";
    export let quantity = 10;
    export let unitPrice = 100;
    export let unit = "kg";
    export let img = "https://media.post.rvohealth.io/wp-content/uploads/2020/08/beef-update-732x549-thumbnail.jpg";
  </script>
  
  <div  class="space-y-4 w-full">
    <Card {img} class="max-w-full">
      <h5 class="mb-2 text-3xl font-bold tracking-tight text-[#308140] dark:text-white text-center">{name}</h5>

      <hr class="mt-3 border-divider_col shadow"/>
    <hr class="mb-3 border-divider_col shadow"/>

    <Table divClass="overflow-clip">
    <TableBody>
        <TableBodyRow>
          <TableBodyCell class="text-xl text-[#45B577]">Amount:</TableBodyCell>
          <TableBodyCell><Button class="w-20 text-lg" color="green">{quantity}</Button></TableBodyCell>
          <TableBodyCell class="text-xl text-[#45B577]">{unit}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell class="text-xl text-[#45B577]">Unit Price:</TableBodyCell>
          <TableBodyCell><Button class="w-20 text-lg" color="green">{unitPrice}</Button></TableBodyCell>
          <TableBodyCell class="text-xl text-[#45B577]">Tk</TableBodyCell>
        </TableBodyRow>
    </TableBody>
    </Table>

    </Card>
  </div>