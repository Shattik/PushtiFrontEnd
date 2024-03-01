<script>
    import { goto } from "$app/navigation";
    import { GradientButton } from 'flowbite-svelte';
</script>

<center class="grid grid-cols-1 place-items-center h-screen w-screen">
    <div>
        <h1 class="text-7xl mb-5 text-[#318B43]">: ' (</h1>
        <h1 class="text-3xl mb-5 text-[#318B43]">Oops, something went wrong!</h1>
        <h3 class="text-2xl mb-5 text-[#27C848]">Please try again later</h3>
        <GradientButton color="green" class="text-lg" on:click={() => goto("/")}>Go back to home</GradientButton>
    </div>
</center>