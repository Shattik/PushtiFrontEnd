<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger} from 'flowbite-svelte';
  import { Button } from 'flowbite-svelte';
  import logo from '$lib/images/logo.png';

  
</script>

<Navbar class="px-2 sm:px-4 py-2.5 w-full z-20 top-0 start-0 border-b bg-sidebar_bg" >
    <NavBrand href="/">
      <img src={logo} class="me-3 h-12 sm:h-9" alt="Pushti Logo" />
    </NavBrand>
    <NavHamburger />
    <NavUl class="flex  items-center " ulClass="flex flex-col p-1.5 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
      <NavLi href="/login" class="items-center"><Button outline size='xs' class="bg-sidebar_bg border-sidebar_bg font-bold text-logo-1 hover:text-logo-1 hover:bg-sidebar_bg text-1xl hover:border-logo-1 focus-within:ring-sidebar-bg focus-within:ring-opacity-50">Login</Button></NavLi>
      <NavLi href="/register" active={true}><Button outline size='xs' class="bg-sidebar_bg border-logo-1 font-bold text-logo-1 hover:text-white hover:bg-logo-1 text-1xl hover:border-logo-1 focus-within:ring-logo-1 focus-within:ring-sidebar-bg focus-within:ring-opacity-50">Sign Up</Button></NavLi>
    </NavUl>
  </Navbar>


