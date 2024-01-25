<script>
  import LoginNavbar from './LoginNavbar.svelte';

  import  Carousel  from '$lib/Components/Carousel.svelte';
  import images from '$lib/jsons/carousel.json';
  
  let index = 0;

</script>

<div class="flex flex-col h-screen" >
  <LoginNavbar/>

  <Carousel {images} duration = "5000" let:Controls let:Indicators  on:change={() => (index=(index+1)%3)}>
    <Indicators />
    <Controls class="z-20"/>
  </Carousel>

  <div class="rounded h-full absolute bg-sidebar_bg text-logo-1 dark:bg-gray-700 dark:text-white p-2 my-2 flex items-center justify-center opacity-90 w-1/4">
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
    background-color: bg-body_custom;
  }
</style>

<svelte:head>
    <style>
        body {
          overflow: hidden;
        }
    </style>
</svelte:head>	
