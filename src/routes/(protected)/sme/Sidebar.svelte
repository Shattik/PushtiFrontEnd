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
  
    export let focused = false;
  
    $: activeUrl = $page.url.pathname;
  </script>
  
  
  <div role="navigation" on:mouseenter={()=>{focused=true;}} on:mouseleave={()=>{focused=false;}} aria-label="placeholder">
  <Sidebar class="w-64 h-screen fixed bg-sidebar_bg overflow-x-hidden" 
        activeClass="flex items-center w-64 p-2 text-base font-normal text-logo-2 bg-body_custom dark:bg-gray-700 rounded-2xl shadow-inner dark:text-white hover:bg-body_custom dark:hover:bg-gray-700 disabled" 
        nonActiveClass="flex items-center w-64 p-2 text-base font-normal text-logo-2 rounded-2xl hover:text-logo-1 hover:bg-logo-1 hover:font-bold hover:bg-opacity-15 dark:hover:bg-gray-700"
        {activeUrl}>
    <SidebarWrapper class="overflow-x-hidden h-screen fixed w-64 bg-sidebar_bg">
      <SidebarGroup class="w-48">
        <SidebarBrand {site} class="space-x-5 ps-4" imgClass="h-10" spanClass="self-center text-2xl text-logo-1 font-semibold whitespace-nowrap dark:text-white"/>
        <SidebarItem label="Dashboard" href="/farmer/dashboard" {spanClass}>
          <svelte:fragment slot="icon">
            <ChartPieSolid class="w-7 h-7 ms-1.5 me-3 text-logo-1 transition duration-75 dark:text-gray-400 group-hover:text-logo-2 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Loans" href="/farmer/loans" {spanClass}>
          <svelte:fragment slot="icon">
            <HandHoldingDollarSolid class="w-7 h-7 ms-1.5 me-3 text-logo-1 transition duration-75 dark:text-gray-400 group-hover:text-logo-2 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Transactions" href="/farmer/transactions" {spanClass}>
          <svelte:fragment slot="icon">
            <MoneyCheckDollarSolid class="w-7 h-7 ms-1.5 me-3 text-logo-1 transition duration-75 dark:text-gray-400 group-hover:text-logo-2 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Leaderboards" href="/farmer/leaderboard" {spanClass}>
          <svelte:fragment slot="icon">
            <TrophySolid class="w-7 h-7 ms-1.5 me-3 text-logo-1 transition duration-75 dark:text-gray-400 group-hover:text-logo-2 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Support" href="/farmer/support" {spanClass}>
          <svelte:fragment slot="icon">
            <EnvelopeSolid class="w-7 h-7 ms-1.5 me-3 text-logo-1 transition duration-75 dark:text-gray-400 group-hover:text-logo-2 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
  <div class="min-w-64 h-screen" ></div></div>