<script>
  import LoginNavbar from './LoginNavbar.svelte';
  import { GradientButton } from 'flowbite-svelte';
  import { ArrowRightSolid } from 'svelte-awesome-icons';

  import  Carousel  from '$lib/Components/Carousel.svelte';
  import images from '$lib/jsons/carousel.json';
  
  let index = 0;

</script>

<div class="flex flex-col h-screen" >
  <LoginNavbar/>

  <Carousel {images} duration = "5000" let:Controls let:Indicators bind:index={index}>
    <Indicators />
    <Controls class="z-20"/>
  </Carousel>

  <div class="rounded h-full absolute bg-sidebar_bg text-logo-1 dark:bg-gray-700 dark:text-white p-2 my-2 flex items-center justify-center opacity-90 w-1/4">
    <div class="p-2 text-2xl font-bold z-10">
      {#if index==0}
        <p class="text-xl">Welcome to</p>
        <p class="text-5xl">Pushti</p>
        <p class="text-2xl text-logo-6 mt-7">Embark on a new journey</p>
      {/if}
      {#if index==1}
        <p class="text-xl">Take</p>
        <p class="text-5xl">Loan</p>
        <p class="text-2xl text-logo-6 mt-7">Build your own business</p>
      {/if}
      {#if index==2}
        <p class="text-xl">Make</p>
        <p class="text-5xl">Profit</p>
        <p class="text-2xl text-logo-6 mt-7">Repay loan at the same time</p>
      {/if}
      {#if index==3}
        <p class="text-xl">Join the</p>
        <p class="text-5xl">Revolution</p>
        <GradientButton class="mt-7 text-xl" color="greenToBlue" href="/register">Join us now <ArrowRightSolid class="ml-2" /></GradientButton>
      {/if}
    </div>
    </div>
</div>

<style>
  :global(body){
    background-color: #EDFFE5;
  }
</style>

<svelte:head>
    <style>
        body {
          overflow: hidden;
        }
    </style>
</svelte:head>	
