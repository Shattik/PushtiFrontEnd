<script>
  import { Sidebar, SidebarWrapper, SidebarBrand, SidebarItem, SidebarGroup } from 'flowbite-svelte';
  import { ChartPieSolid, EnvelopeSolid, HandHoldingDollarSolid, MoneyCheckDollarSolid, TrophySolid } from 'svelte-awesome-icons';
  import { page } from '$app/stores';
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';

  let site = {
    name: 'Pushti',
    href: '/',
    img: '/miniIcon.png'
  };

  $: activeUrl = $page.url.pathname;
</script>



<Sidebar class="w-64 h-screen" {activeUrl}>
  <SidebarWrapper class="h-screen fixed">
    <SidebarGroup>
      <SidebarBrand {site} />
      <SidebarItem label="Dashboard" href="/farmer/Dashboard" {spanClass}>
        <svelte:fragment slot="icon">
          <ChartPieSolid class="w-7 h-7 me-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Loan History" href="/farmer/loans" {spanClass}>
        <svelte:fragment slot="icon">
          <HandHoldingDollarSolid class="w-7 h-7 me-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Transactions" href="/farmer/transactions" {spanClass}>
        <svelte:fragment slot="icon">
          <MoneyCheckDollarSolid class="w-7 h-7 me-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Leaderboards" href="/farmer/leaderboard" {spanClass}>
        <svelte:fragment slot="icon">
          <TrophySolid class="w-7 h-7 me-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Support" href="/farmer/support" {spanClass}>
        <svelte:fragment slot="icon">
          <EnvelopeSolid class="w-7 h-7 me-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>