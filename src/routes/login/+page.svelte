<script>
    import { Label, Input, ButtonGroup, InputAddon, Button, Alert, Card, Avatar } from 'flowbite-svelte';
    import { AddressCardSolid, KeySolid, UsersSlashSolid } from 'svelte-awesome-icons';
    import LoginNavbar from '../LoginNavbar.svelte';
    import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
    import { jwtToken } from '$lib/Components/token.js';
    import { PUBLIC_API_GATEWAY_URL } from '$env/static/public';
    
    let res={error:""};
    let nid = '';
    let password = '';

    async function handleSubmit() {
        let data;
        let request = {
            "nid": nid,
            "password": password
        };
        console.log(request);
        // Perform login logic here
        try {
            // Send authentication request to backend
            const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/login/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            data = await response.json();
            console.log(response);
            console.log(data);
            jwtToken.set(data.token);
        } catch (error) {
            console.error('An error occurred during login:', error);
            res = { error: 'An error occurred during login. Please try again later.' };
        }
        console.log(data.success);
        console.log(data.message);
        console.log(res)
        if(data?.success){
            goto(data.redirectUrl);
        }
        else if(!data?.success){
            res = { error: data?.message };
        }

    }
</script>
<LoginNavbar/>
<div class="grid grid-cols-1 place-items-center h-full w-screen" >
    <Card class="w-1/4 max-w-full my-16">
        <form class="flex flex-col space-y-6" on:submit|preventDefault={handleSubmit}>
            {#if res?.error}
                <Alert color="red" border dismissable on:close={()=>{res.error=""}}>
                    <UsersSlashSolid slot="icon" class="w-4 h-4"/>
                    <span class="font-medium">{res.error}</span>
                </Alert>
		    {/if}
            <h3 class="text-xl text-center font-bold text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div class="grid grid-cols-1 place-items-center w-full">
                <Avatar class="ring-logo-1 ring-opacity-40" size="xl" border />
            </div>
            <Label class="space-y-2">
                <span class="font-bold">NID</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <AddressCardSolid class="w-4 h-4 text-white dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="nid" type="number" placeholder="123456789" bind:value={nid} required/>
                </ButtonGroup>
            </Label>
            <Label class="space-y-2">
                <span class="font-bold">Your password</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <KeySolid class="w-4 h-4 text-white dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="pass" type="password" bind:value={password} required/>
                </ButtonGroup>
            </Label>
            <Button type="submit" class="w-full bg-logo-1 text-white font-bold focus-within:ring-sidebar-bg focus-within:ring-opacity-50">Log In to your account</Button>
            <div class="text-sm text-center font-medium text-gray-500 dark:text-gray-300 ">
                Not registered? <a href="/register" class="text-logo-1 hover:underline dark:text-primary-500"> Create account </a>
            </div>
    </form>
    </Card>
</div>
