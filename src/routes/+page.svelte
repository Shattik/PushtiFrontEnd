<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { Card, Button } from 'flowbite-svelte';
  import { fade } from 'svelte/transition';
  import logo from '$lib/images/logo.png';

  const images = ["/images/home1.png", "/images/home2.png", "/images/home3.png"]

  let currentIndex = 0;
  let currentImage = images[currentIndex];
  let show = true;

  onMount(() => {
		  const interval = setInterval(() => {
      if(show == false){
			  currentIndex = (currentIndex + 1) % images.length;
        currentImage = images[currentIndex];
        show = true;
      }
      else{
        show = false;
      }
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="relative px-8">
  <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
    <NavBrand href="/">
      <img src={logo} class="me-3 h-6 sm:h-9" alt="Pushti Logo" />
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/" active={true}>Sign Up</NavLi>
      <NavLi href="/about">Login</NavLi>
    </NavUl>
  </Navbar>
</div>
{#if show}
<div style="background-image: url({currentImage}); background-size: cover; background-repeat: no-repeat; height: 100vh;" in:fade out:fade={{delay: 1500}}>
</div>
{/if}
<Card class="text-center fixed inset-0 flex items-center justify-center" size="lg" padding="xl">
  <h1 class="mb-2 text-5xl font-bold text-gray-900 dark:text-white text-[#3ec948]">Pushti</h1>
  <p class="mb-5 text-base text-gray-500 sm:text-2xl dark:text-gray-400 text-[#90b07d]">Ensuring Nutrition</p>
  <br />
  <p class="mb-5 text-base text-gray-500 sm:text-2xl dark:text-gray-400">Join us for a better future</p>
  <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
    <Button class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-base px-10 py-5 text-center me-2 mb-2">Get Started
      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Button>
  </div>
</Card>  
