<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { Card, Button } from 'flowbite-svelte';
  import { fade } from 'svelte/transition';
  import logo from '$lib/images/logo.png';

  import  Carousel  from '$lib/Components/Carousel.svelte';
  import images from '$lib/jsons/carousel.json';
  // const images = [
  //   {
  //     src: "/images/home1.png"
  //   },
  //   {
  //     src: "/images/home2.png"
  //   }, 
  //   {
  //     src:"/images/home3.png"
  //   }
  // ]

  let currentIndex = 0;
  let currentImage = images[currentIndex];
  let show = true;

  let index = 0;
  let image;

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

  // document.body.style.overflow = "hidden";
</script>

<div class="flex flex-col h-screen" >
  <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b bg-[#EDFFE5]" >
    <NavBrand href="/">
      <img src={logo} class="me-3 h-12 sm:h-9" alt="Pushti Logo" />
    </NavBrand>
    <!-- <div class="flex md:order-2">
    <Button size="sm">Get started</Button>
    <NavHamburger />
  </div> -->
    <NavUl class="flex  items-center">
      <NavLi href="/about" class="items-center"><Button outline size='xs' class="bg-[#EDFFE5] border-[#EDFFE5] font-bold text-[#27C848] hover:text-[#27C848] hover:bg-[#EDFFE5] text-1xl hover:border-[#27C848]">Login</Button></NavLi>
      <NavLi href="/" active={true}><Button outline size='xs' class="bg-[#EDFFE5] border-[#27C848] font-bold text-[#27C848] hover:text-white hover:bg-[#27C848] text-1xl hover:border-[#27C848]">Sign Up</Button></NavLi>
    </NavUl>
  </Navbar>


  <Carousel {images} let:Controls let:Indicators duration = "5000" on:change={() => (index=(index+1)%3)}>
    <Indicators />
    <Controls class="z-20"/>
  </Carousel>

  <div class="rounded h-full absolute bg-[#EDFFE5] text-[#27C848] dark:bg-gray-700 dark:text-white p-2 my-2 flex items-center justify-center opacity-90 w-1/4">
    <div class="p-2 text-2xl font-bold z-10">
      {#if index==0}
        <p>Ensuring Nutrition</p>
      {/if}
      {#if index==1}
        <p>Ensuring Nutrition1</p>
      {/if}
      {#if index==2}
        <p>Ensuring Nutrition2</p>
      {/if}
    </div>
    </div>
</div>

<style>
  :global(body){
    overflow-x: hidden;
  }
</style>

<!-- 
{#if show}
<div style="background-image: url({currentImage}); background-size: cover; background-repeat: no-repeat; height: 100vh;" in:fade out:fade={{delay: 1500}}>
</div>
{/if}
<Card class="text-center fixed inset-0 flex items-center justify-center" size="lg" padding="xl">
  <h1 class="mb-2 text-5xl font-bold dark:text-white text-[#3ec948]">Pushti</h1>
  <p class="mb-5 text-base sm:text-2xl dark:text-gray-400 text-[#90b07d]">Ensuring Nutrition</p>
  <br />
  <p class="mb-5 text-base text-gray-500 sm:text-2xl dark:text-gray-400">Join us for a better future</p>
  <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
    <Button class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-base px-10 py-5 text-center me-2 mb-2">Get Started
      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Button>
  </div>
</Card>   -->
