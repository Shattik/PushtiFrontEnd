<script>
    import { Label, Input, ButtonGroup, InputAddon, Button, Alert, Card, Avatar, Radio, Select } from 'flowbite-svelte';
    import { AddressCardSolid, IdBadgeSolid, KeySolid, UsersSlashSolid, CalendarDaySolid, EnvelopeOpenSolid, PhoneSolid, HouseChimneySolid} from 'svelte-awesome-icons';
    import LoginNavbar from '../LoginNavbar.svelte';
    import { redirect, text } from '@sveltejs/kit';

    /**
     * @type {{ error: any; }}
     */
    export let res;
    let nid = '';
    let password = '';
    let dob=new Date();
    let accountType="";
    let farmerType="";
    let email="";
    let name="";
    let permanentAddress="";
    let mobile="";
    let division="";
    let district="";
    let upazilla="";
    let union="";
    let confirmPassword="";
    let divisions=[
        {value:"Dhaka", name:"Dhaka"},
        {value:"Chittagong", name:"Chittagong"},
        {value:"Rajshahi", name:"Rajshahi"},
        {value:"Khulna", name:"Khulna"},
        {value:"Barisal", name:"Barisal"},
        {value:"Sylhet", name:"Sylhet"},
        {value:"Rangpur", name:"Rangpur"},
        {value:"Mymensingh", name:"Mymensingh"},
    ];
    let districts=[
        {value:"Dhaka", name:"Dhaka"},
        {value:"Chittagong", name:"Chittagong"},
        {value:"Rajshahi", name:"Rajshahi"},
        {value:"Khulna", name:"Khulna"},
        {value:"Barisal", name:"Barisal"},
        {value:"Sylhet", name:"Sylhet"},
        {value:"Rangpur", name:"Rangpur"},
        {value:"Mymensingh", name:"Mymensingh"},
    ];
    let upazillas=[
        {value:"Dhaka", name:"Dhaka"},
        {value:"Chittagong", name:"Chittagong"},
        {value:"Rajshahi", name:"Rajshahi"},
        {value:"Khulna", name:"Khulna"},
        {value:"Barisal", name:"Barisal"},
        {value:"Sylhet", name:"Sylhet"},
        {value:"Rangpur", name:"Rangpur"},
        {value:"Mymensingh", name:"Mymensingh"},
    ];
    let unions=[
        {value:"Dhaka", name:"Dhaka"},
        {value:"Chittagong", name:"Chittagong"},
        {value:"Rajshahi", name:"Rajshahi"},
        {value:"Khulna", name:"Khulna"},
        {value:"Barisal", name:"Barisal"},
        {value:"Sylhet", name:"Sylhet"},
        {value:"Rangpur", name:"Rangpur"},
        {value:"Mymensingh", name:"Mymensingh"},
    ];


    // async onMount(){
    //     const response = await fetch('/api/getDivisions', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     divisions = await response.json();
    // }

    async function handleSubmit() {
        // let data;
        // // Perform login logic here
        // try {
        //     // Send authentication request to backend
        //     const response = await fetch('/api/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ nid, password })
        //     });
        //     data = await response.json();
        // } catch (error) {
        //     console.error('An error occurred during login:', error);
        //     res = { error: 'An error occurred during login. Please try again later.' };
        // }
        // if(data?.success){
        //     redirect(302,data.redirectURL);
        // }
        // else if(data?.error){
        //     res = { error: data?.error };
        // }
        console.log(nid, password, dob, accountType, farmerType, email, name, permanentAddress, mobile, division);
        res={error:"Invalid Credentials"};

    }
</script>
<LoginNavbar/>
<div class="grid grid-cols-1 place-items-center w-screen" >
    <Card class="w-1/3 max-w-full my-20">
        <form class="flex flex-col grow space-y-6" on:submit|preventDefault={handleSubmit}>
            {#if res?.error}
                <Alert color="red" border dismissable on:close={()=>{res.error=""}}>
                    <UsersSlashSolid slot="icon" class="w-4 h-4"/>
                    <span class="font-medium">{res.error}</span>
                </Alert>
		    {/if}
            <h3 class="text-3xl text-center font-bold text-logo-2 dark:text-white">Sign Up</h3>
            <div class="grid grid-cols-1 place-items-center w-full">
                <Avatar class="ring-logo-1 ring-opacity-40" size="xl" border />
            </div>
            <Label class="space-y-2">
                <span class="font-bold">NID</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <AddressCardSolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="nid" type="number" placeholder="123456789" bind:value={nid} required/>
                </ButtonGroup>
            </Label>
            <Label class="space-y-2">
                <span class="font-bold">Name</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <IdBadgeSolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="name" placeholder="Name" bind:value={name} required/>
                </ButtonGroup>
            </Label>
            <Label class="space-y-2">
                <span class="font-bold">User Type</span>
                <div class="flex flex-row flex-wrap space-x-6">
                    <Radio name="accountType" bind:group={accountType} value="farmer" class="p-x-2 " required>
                        <span class="text-gray-900 dark:text-white">Farmer</span>
                    </Radio>
                    <Radio name="accountType" bind:group={accountType} value="sme" class="p-x-2" required>
                        <span class="text-gray-900 dark:text-white">SME</span>
                    </Radio>
                    <Radio name="accountType" bind:group={accountType} value="vendor" class="p-x-2" required>
                        <span class="text-gray-900 dark:text-white">Vendor</span>
                    </Radio>
                </div>
            </Label>
            {#if accountType=="farmer"}
                <Label class="space-y-2">
                    <span class="font-bold">Farmer Type</span>
                    <div class="flex flex-row flex-wrap space-x-6">
                        <Radio name="farmerType" bind:group={farmerType} value="Dairy" class="p-x-2" required>
                            <span class="text-gray-900 dark:text-white">Dairy</span>
                        </Radio>
                        <Radio name="farmerType" bind:group={farmerType} value="Poultry" class="p-x-2" required>
                            <span class="text-gray-900 dark:text-white">Poultry</span>
                        </Radio>
                    </div>
                </Label>
            {/if}
            <Label class="space-y-2">
                <span class="font-bold">Date of Birth</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <CalendarDaySolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="dob" type="date" bind:value={dob} required/>
                </ButtonGroup>
            </Label>
            <div class="flex flex-row flex-wrap space-x-6">
                <Label class="space-y-2">
                    <span class="font-bold">Division</span>
                    <Select class="mt-2" items={divisions} bind:value={division} on:change={()=>{district=""; upazilla="";union="";}} required/>
                </Label>
                {#if division}
                <Label class="space-y-2">
                    <span class="font-bold">District</span>
                    <Select class="mt-2" items={districts} bind:value={district} on:change={()=>{upazilla="";union="";}} required/>
                </Label>
                {/if}
                {#if district}
                <Label class="space-y-2">
                    <span class="font-bold">Upazilla</span>
                    <Select class="mt-2" items={upazillas} bind:value={upazilla} on:change={()=>{union="";}} required/>
                </Label>
                {/if}
                {#if upazilla}
                <Label class="space-y-2">
                    <span class="font-bold">Union</span>
                    <Select class="mt-2" items={unions} bind:value={union} required/>
                </Label>
                {/if}   
            </div>
            <Label class="space-y-2">
                <span class="font-bold">Permanent Address</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <HouseChimneySolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="permanentAddress" placeholder="Permanent Address" bind:value={permanentAddress} required/>
                </ButtonGroup>
            </Label>
            <Label class="space-y-2">
                <span class="font-bold">Email</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <EnvelopeOpenSolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" type="email" id="email" placeholder="Email" bind:value={email} />
                </ButtonGroup>
            </Label>
            <Label class="space-y-2">
                <span class="font-bold">Phone</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <PhoneSolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" type="tel" id="phone" placeholder="01234567890" bind:value={mobile} required/>
                </ButtonGroup>
            </Label>
            <Label class="space-y-2">
                <span class="font-bold">Your password</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <KeySolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="pass" type="password" bind:value={password} required/>
                </ButtonGroup>
            </Label>
            <Label class="space-y-2">
                <span class="font-bold">Confirm Your password</span>
                <ButtonGroup class="w-full">
                    <InputAddon class="bg-logo-2 text-white">
                        <KeySolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input class="focus:border-logo-1 focus:ring-logo-1" id="pass" type="password" bind:value={confirmPassword} required/>
                </ButtonGroup>
            </Label>
            <Button type="submit" class="w-full bg-logo-1 text-white font-bold">Login to your account</Button>
            <div class="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                Not registered? <a href="/register" class="text-logo-1 hover:underline dark:text-primary-500"> Create account </a>
            </div>
        </form>
    </Card>
</div>
