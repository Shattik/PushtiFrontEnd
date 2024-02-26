<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import { Button, Label, Modal, Search } from 'flowbite-svelte';
    import { flip } from 'svelte/animate';
    import { scale, fade } from 'svelte/transition';
    import { page} from "$app/stores";
    import { get } from "svelte/store";
    import { jwtToken } from "$lib/Components/token.js";
    import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";
    import { EnvelopeOpenTextSolid, PenToSquareSolid } from "svelte-awesome-icons";

    let messages=$page.data.inbox;
    let filteredMessages = messages;
    let selectedIndex = 0;
    let focused = false;
    let value = "";
    let showModal = false;
    let subject="";
    let details="";
    $: filteredMessages = messages.filter((message) => (message.subject.toLowerCase().includes(value.toLowerCase())||message.details.toLowerCase().includes(value.toLowerCase())));
    function timeSince(date) {
        // Get the current timestamp in milliseconds
        const now = Date.now();

        // Calculate the difference in milliseconds between the given time and now
        const diff = now - new Date(date);

        if(diff<1000) return "Just Now";

        // Define an array of units and their corresponding milliseconds
        const units = [
            { name: "year", value: 31536000000 },
            { name: "month", value: 2592000000 },
            { name: "week", value: 604800000 },
            { name: "day", value: 86400000 },
            { name: "hour", value: 3600000 },
            { name: "minute", value: 60000 },
            { name: "second", value: 1000 },
        ];

        // Find the appropriate unit based on the difference
        let unit = units.find((unit) => diff >= unit.value);

        // Calculate the number of units based on the difference
        const amount = Math.floor(diff / unit.value);

        // Handle pluralization
        const plural = amount > 1 ? "s" : "";

        // Return the formatted string
        return `${amount} ${unit.name}${plural} ago`;
    }

    async function addMessage(){
        let newMessage = {
            subject:subject,
            details:details,
            time:Date.now(),
            status:"pending"
        }
        const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/vendor/send-ticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: get(jwtToken),
            },
            body: JSON.stringify({subject:subject,details:details}),
        });
        if (response.ok)messages = [newMessage,...messages];
        else alert("Failed to create a new ticket");
        value="";
        subject="";
        details="";
        showModal=false;
    }
</script>


<div class="flex flex-row">
    {#if focused}
        <Sidebar bind:focused />
    {:else}
        <RolledSidebar bind:focused />
    {/if}
    <div class="flex flex-col w-full max-h-screen pt-5 pb-1 px-5 overflow-hidden">
        <Header page="Support Inbox" />
        <div class="grow flex flex-col h-full overflow-hidden ">
            <div class="flex flex-row space-x-4 ">
                <Button class="w-44" on:click={()=> showModal=true}>
                    <PenToSquareSolid class="w-5 h-5" />
                    <span class="ml-2">Create Ticket</span>
                </Button>
                <Search bind:value placeholder="Search" on:keydown={(e)=>selectedIndex=-1}/>
            </div>
            <div class="flex flex-row grow my-5 divide-x-2 divide-border_custom overflow-hidden">
                <div class="min-w-96 max-w-96 overflow-y-auto divide-y-2 divide-border_custom overflow-auto">
                    {#each filteredMessages as message,index (message.id)}
                        <div class="p-6 { index==selectedIndex ? 'bg-gradient-to-b from-[#37D858] via-[#27C848] to-[#308140B3]':''} space-y-1" on:click={()=> selectedIndex=(index==selectedIndex) ? -1 : index} role="button" aria-pressed="false" tabindex={index} on:keydown={(e)=>{if(e.key=="Enter")selectedIndex=(index==selectedIndex) ? -1 : index}} animate:flip transition:scale>
                            <Label class="w-full text-right { index==selectedIndex ? 'text-gray-100':'text-slate-500'}">{new Date(message.time).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(message.time).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}</Label>
                            <Label class="truncate ... text-lg font-bold w-full  { index==selectedIndex ? 'text-white':'text-logo-1'}">{message.subject}</Label>
                            <Label class="line-clamp-3 w-full { index==selectedIndex ? 'text-gray-50':'text-slate-800'}">{message.details}</Label>
                        </div>
                    {/each}
                </div>
                <div class="w-full h-full bg-primary-50 overflow-auto">
                    {#if selectedIndex==-1}
                        <div class="flex flex-col h-full items-center justify-center " in:scale>
                            <span class="text-custom_font-table_header text-xl">Select a Support Ticket to see details</span>
                            <EnvelopeOpenTextSolid class="w-48 h-48 mt-10 text-gray-400"/>
                        </div>
                    {:else}
                        <div class="flex flex-col space-y-4 p-5 py-10 h-full" in:scale>
                            <Label class="text-2xl font-bold text-custom_font-reddish">{filteredMessages[selectedIndex].subject}</Label>
                            <Label class="text-md text-custom_font-table_header ">{new Date(filteredMessages[selectedIndex].time).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(filteredMessages[selectedIndex].time).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})} ({timeSince(filteredMessages[selectedIndex].time)})</Label>
                            <Label class="text-xl text-custom_font-table_header text-custom_font-reddish">Details :</Label>
                            <Label class="text-lg text-custom_font-table_header grow">{filteredMessages[selectedIndex].details}</Label>
                            <Label class="text-xl text-custom_font-reddish ">Status : <span class="font-bold">{filteredMessages[selectedIndex].status}</span></Label>
                        </div>
                        
                    {/if}
                </div>
            </div>
        </div> 
    </div>
</div> 

<Modal bind:open={showModal} title="Add a new Support Ticket">
    <div class="flex flex-col space-y-4">
        <Label class="text-xl text-custom_font-table_header">Subject</Label>
        <input type="text" class="w-full border border-border_custom p-2 rounded-md" bind:value={subject}/>
        <Label class="text-xl text-custom_font-table_header">Details</Label>
        <textarea class="w-full border border-border_custom p-2 rounded-md" rows="6" bind:value={details}></textarea>
        <div class="flex flex-row justify-end space-x-4">
            <Button class="bg-red-500" on:click={()=> {showModal=false, subject="", details="";} }>Cancel</Button>
            <Button class="bg-logo-1" on:click={addMessage}>Create</Button>
        </div>
    </div>
</Modal>