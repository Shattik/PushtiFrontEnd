<script>
    import Sidebar from "../Sidebar.svelte";
    import RolledSidebar from "../RolledSidebar.svelte";
    import Header from "../../Header.svelte";
    import { Avatar, Button, Indicator, Label, Modal, Search, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, Tabs } from 'flowbite-svelte';
    import { flip } from 'svelte/animate';
    import { scale } from 'svelte/transition';
    import { page} from "$app/stores";
    import { get } from "svelte/store";
    import { jwtToken } from "$lib/Components/token.js";
    import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";
    import { EnvelopeOpenTextSolid, MoneyBillTransferSolid, HandHoldingDollarSolid } from "svelte-awesome-icons";
    import { onMount } from "svelte";

    let farmerMessages=$page.data.farmerTickets;
    let smeMessages=$page.data.smeTickets;
    let vendorMessages=$page.data.vendorTickets;
    let agentMessages=$page.data.agentTickets;
    let filteredFarmerMessages = farmerMessages;
    let filteredSmeMessages = smeMessages;
    let filteredVendorMessages = vendorMessages;
    let filteredAgentMessages = agentMessages;
    let selectedFarmerIndex = -1;
    let selectedSmeIndex = -1;
    let selectedVendorIndex = -1;
    let selectedAgentIndex = -1;
    let focused = false;
    let farmerValue = "";
    let smeValue = "";
    let vendorValue = "";
    let agentValue = "";
    let showModal = false;
    let subject="";
    let details="";
    let comment="";
    $: filteredFarmerMessages = farmerMessages.filter((message) => (message.subject.toLowerCase().includes(farmerValue.toLowerCase())||message.details.toLowerCase().includes(farmerValue.toLowerCase()) || message.name.toLowerCase().includes(farmerValue.toLowerCase()) || message.UnionParishad.toLowerCase().includes(farmerValue.toLowerCase()) || message.Upazilla.toLowerCase().includes(farmerValue.toLowerCase()) || message.District.toLowerCase().includes(farmerValue.toLowerCase()) || message.Division.toLowerCase().includes(farmerValue.toLowerCase())));
    $: filteredSmeMessages = smeMessages.filter((message) => (message.subject.toLowerCase().includes(smeValue.toLowerCase())||message.details.toLowerCase().includes(smeValue.toLowerCase()) || message.name.toLowerCase().includes(smeValue.toLowerCase()) || message.UnionParishad.toLowerCase().includes(smeValue.toLowerCase()) || message.Upazilla.toLowerCase().includes(smeValue.toLowerCase()) || message.District.toLowerCase().includes(smeValue.toLowerCase()) || message.Division.toLowerCase().includes(smeValue.toLowerCase())));
    $: filteredVendorMessages = vendorMessages.filter((message) => (message.subject.toLowerCase().includes(vendorValue.toLowerCase())||message.details.toLowerCase().includes(vendorValue.toLowerCase()) || message.name.toLowerCase().includes(vendorValue.toLowerCase()) || message.UnionParishad.toLowerCase().includes(vendorValue.toLowerCase()) || message.Upazilla.toLowerCase().includes(vendorValue.toLowerCase()) || message.District.toLowerCase().includes(vendorValue.toLowerCase()) || message.Division.toLowerCase().includes(vendorValue.toLowerCase())));
    $: filteredAgentMessages = agentMessages.filter((message) => (message.subject.toLowerCase().includes(agentValue.toLowerCase())||message.details.toLowerCase().includes(agentValue.toLowerCase()) || message.name.toLowerCase().includes(agentValue.toLowerCase()) || message.UnionParishad.toLowerCase().includes(agentValue.toLowerCase()) || message.Upazilla.toLowerCase().includes(agentValue.toLowerCase()) || message.District.toLowerCase().includes(agentValue.toLowerCase()) || message.Division.toLowerCase().includes(agentValue.toLowerCase())));

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

    function setheight(){
        const tabContent=document.querySelector("#tabContent");
        tabContent.parentElement.style.height="100%";
    }

    async function makeRead(id){
        const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/admin/support/update-ticket/make-read`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: get(jwtToken),
            },
            body: JSON.stringify({ticketId:id})
        }
        );--
    }

    onMount(()=>{
        setheight();
    });

</script>


<div class="flex flex-row">
    {#if focused}
        <Sidebar bind:focused />
    {:else}
        <RolledSidebar bind:focused />
    {/if}
    
    <div class="flex flex-col w-full max-h-screen pt-5 pb-1 px-5 overflow-hidden">
        <Header page="Support Inbox" />
        <Tabs
            style="underline"
            contentClass="p-4 bg-divider_col rounded-lg dark:bg-gray-800 mt-4 h-full"
        >
            <TabItem open title="Farmer" class="h-full" on:click={setheight}>
                <div class="grow flex flex-col h-full overflow-hidden " id="tabContent">
                    <div class="flex flex-row grow my-2 divide-x-2 divide-border_custom overflow-hidden">
                        <div class="min-w-96 max-w-96 overflow-y-auto divide-y-2 divide-border_custom overflow-auto pe-4">
                            <Search class="mb-4" bind:value={farmerValue} placeholder="Search" on:keydown={(e)=>selectedFarmerIndex=-1}/>
                            {#each filteredFarmerMessages as message,index (message.ticketId)}
                                <div class="p-6 { index==selectedFarmerIndex ? 'bg-gradient-to-b from-[#37D858] via-[#27C848] to-[#308140B3]':''} space-y-1 flex" on:click={()=> {selectedFarmerIndex=(index==selectedFarmerIndex) ? -1 : index;comment="";}} role="button" aria-pressed="false" tabindex={index} on:keydown={(e)=>{if(e.key=="Enter")selectedFarmerIndex=(index==selectedFarmerIndex) ? -1 : index; comment="";}} animate:flip transition:scale>
                                    <Avatar class="w-12 h-12 ring-border_custom mt-7 me-4" src={message.avatarLink}/>
                                    <div class="flex flex-col space-y-1 grow">
                                        <Label class="w-full text-right { index==selectedFarmerIndex ? 'text-gray-100':'text-slate-500'} {message.readStatus? 'font-bold':''}">{new Date(message.time).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(message.time).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}</Label>
                                        <div class="w-full relative">
                                            {#if message.readStatus}
                                                <Indicator placement="center-right" size="lg" color="green" class="bg-blue-200" >
                                                    <Indicator size="xs" class="bg-blue-500"/>
                                                </Indicator>
                                            {/if}
                                            <Label class="truncate ... text-xl w-full {message.readStatus? 'font-bold':''} { index==selectedFarmerIndex ? 'text-white':'text-logo-1'}">{message.name}</Label>
                                        </div>
                                        <Label class="truncate ... text-md w-full {message.readStatus? 'font-bold':''} { index==selectedFarmerIndex ? 'text-white':'text-logo-1'}">{message.subject}</Label>
                                        <Label class="line-clamp-3 w-full {message.readStatus? 'font-bold':''} { index==selectedFarmerIndex ? 'text-gray-50':'text-slate-800'}">{message.details}</Label>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        <div class="w-full h-full bg-primary-50 overflow-auto  rounded-lg">
                            {#if selectedFarmerIndex==-1}
                                <div class="flex flex-col h-full items-center justify-center " in:scale>
                                    <span class="text-custom_font-table_header text-xl">Select a Support Ticket to see details</span>
                                    <EnvelopeOpenTextSolid class="w-48 h-48 mt-10 text-gray-400"/>
                                </div>
                            {:else}
                                <div class="flex flex-col space-y-4 p-5 pt-10 pb-6 h-full" in:scale>
                                    <div class="max-w-full w-full">
                                        <div class="flex items-center pb-4 w-full">
                                            <Avatar class="w-36 h-36 ring-border_custom me-6" src={filteredFarmerMessages[selectedFarmerIndex].avatarLink} border />
                                            <Table divClass="grow relative overflow-x-auto " >
                                            <TableBody>
                                                <TableBodyRow
                                                class="border-b-2 border-divider_col bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 w-40 text-custom_font-reddish font-bold"
                                                    >Name</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredFarmerMessages[selectedFarmerIndex].name}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                                <TableBodyRow
                                                class="border-b-2 border-divider_col bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-reddish font-bold"
                                                    >Address</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredFarmerMessages[selectedFarmerIndex].UnionParishad+", "+filteredFarmerMessages[selectedFarmerIndex].Upazilla+", "+filteredFarmerMessages[selectedFarmerIndex].District+", "+filteredFarmerMessages[selectedFarmerIndex].Division}}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                                <TableBodyRow
                                                class="border-b-2 border-divider_col bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-reddish font-bold"
                                                    >Rank</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredFarmerMessages[selectedFarmerIndex].rank}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                                <TableBodyRow
                                                class="bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-reddish font-bold"
                                                    >Points</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredFarmerMessages[selectedFarmerIndex].points}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                            </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                    <Label class="text-lg font-bold text-custom_font-reddish">{filteredFarmerMessages[selectedFarmerIndex].subject}</Label>
                                    <Label class="text-xs text-custom_font-table_header ">{new Date(filteredFarmerMessages[selectedFarmerIndex].time).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(filteredFarmerMessages[selectedFarmerIndex].time).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})} ({timeSince(filteredFarmerMessages[selectedFarmerIndex].time)})</Label>
                                    <Label class="text-md text-custom_font-table_header text-custom_font-reddish">Details :</Label>
                                    <Label class="text-sm text-custom_font-table_header grow">{filteredFarmerMessages[selectedFarmerIndex].details}</Label>
                                    <div class = "flex flex-row space-x-4">
                                        <Button size="sm" class=" w-full text-center font-bold"><MoneyBillTransferSolid class="w-7 h-4 me-2"/> Transaction History</Button> 
                                        <Button size="sm" class="w-full text-center font-bold"><HandHoldingDollarSolid class="w-7 h-4 me-2"/> Loan History</Button>
                                    </div>
                                    {#if filteredFarmerMessages[selectedFarmerIndex].status=="pending"}
                                        <form class="flex flex-row space-x-4">
                                            <input class="grow bg-gray-200 rounded-lg indent-3 text-sm" bind:value={comment}  placeholder="Your Comment" required>
                                            <Button type="submit" size="sm" class=" w-1/6 text-center font-bold bg-red-500 hover:bg-red-600">Close Ticket</Button>
                                        </form>
                                    {:else}
                                        <Label class="text-sm text-custom_font-reddish ">Your Comment : <span class="font-bold">{filteredFarmerMessages[selectedFarmerIndex].comment}</span></Label>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </TabItem>
            <TabItem title="SME" class="h-full" on:click={setheight}>
                <div class="grow flex flex-col h-full overflow-hidden " id="tabContent">
                    <div class="flex flex-row grow my-2 divide-x-2 divide-border_custom overflow-hidden">
                        <div class="min-w-96 max-w-96 overflow-y-auto divide-y-2 divide-border_custom overflow-auto pe-4">

                            <Search class="mb-4" bind:value={smeValue} placeholder="Search" on:keydown={(e)=>selectedSmeIndex=-1}/>
                            {#each filteredSmeMessages as message,index (message.ticketId)}
                                <div class="p-6 { index==selectedSmeIndex ? 'bg-gradient-to-b from-[#37D858] via-[#27C848] to-[#308140B3]':''} space-y-1" on:click={()=> {selectedSmeIndex=(index==selectedSmeIndex) ? -1 : index;comment="";}} role="button" aria-pressed="false" tabindex={index} on:keydown={(e)=>{if(e.key=="Enter")selectedSmeIndex=(index==selectedSmeIndex) ? -1 : index; comment="";}} animate:flip transition:scale>
                                    <Label class="w-full text-right { index==selectedSmeIndex ? 'text-gray-100':'text-slate-500'}">{new Date(message.time).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(message.time).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})}</Label>
                                    <Label class="truncate ... text-lg font-bold w-full  { index==selectedSmeIndex ? 'text-white':'text-logo-1'}">{message.subject}</Label>
                                    <Label class="line-clamp-3 w-full { index==selectedSmeIndex ? 'text-gray-50':'text-slate-800'}">{message.details}</Label>
                                </div>
                            {/each}
                        </div>
                        <div class="w-full h-full bg-primary-50 overflow-auto rounded-lg">
                            {#if selectedSmeIndex==-1}
                                <div class="flex flex-col h-full items-center justify-center " in:scale>
                                    <span class="text-custom_font-table_header text-xl">Select a Support Ticket to see details</span>
                                    <EnvelopeOpenTextSolid class="w-48 h-48 mt-10 text-gray-400"/>
                                </div>
                            {:else}
                                <div class="flex flex-col space-y-4 p-5 pt-10 pb-6 h-full" in:scale>
                                    <div class="max-w-full w-full">
                                        <div class="flex items-center pb-4 w-full">
                                            <Avatar class="w-36 h-36 ring-border_custom me-6" src={filteredSmeMessages[selectedSmeIndex].avatarLink} border />
                                            <Table divClass="grow relative overflow-x-auto " >
                                            <TableBody>
                                                <TableBodyRow
                                                class="border-b-2 border-divider_col bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 w-40 text-custom_font-reddish font-bold"
                                                    >Name</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredSmeMessages[selectedSmeIndex].name}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                                <TableBodyRow
                                                class="border-b-2 border-divider_col bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-reddish font-bold"
                                                    >Address</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredSmeMessages[selectedSmeIndex].UnionParishad+", "+filteredSmeMessages[selectedSmeIndex].Upazilla+", "+filteredSmeMessages[selectedSmeIndex].District+", "+filteredSmeMessages[selectedSmeIndex].Division}}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                                <TableBodyRow
                                                class="border-b-2 border-divider_col bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-reddish font-bold"
                                                    >Rank</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredSmeMessages[selectedSmeIndex].rank}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                                <TableBodyRow
                                                class="bg-transparent drop-shadow-md"
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-reddish font-bold"
                                                    >Points</TableBodyCell
                                                >
                                                <TableBodyCell class="py-2 text-custom_font-table_header"
                                                    >{filteredSmeMessages[selectedSmeIndex].points}</TableBodyCell
                                                >
                                                </TableBodyRow>
                                            </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                    <Label class="text-lg font-bold text-custom_font-reddish">{filteredSmeMessages[selectedSmeIndex].subject}</Label>
                                    <Label class="text-xs text-custom_font-table_header ">{new Date(filteredSmeMessages[selectedSmeIndex].time).toLocaleTimeString([],{hour:"numeric",minute:"numeric"})+", "+new Date(filteredSmeMessages[selectedSmeIndex].time).toLocaleDateString([],{day:"numeric", month:"long",year:"numeric"})} ({timeSince(filteredSmeMessages[selectedSmeIndex].time)})</Label>
                                    <Label class="text-md text-custom_font-table_header text-custom_font-reddish">Details :</Label>
                                    <Label class="text-sm text-custom_font-table_header grow">{filteredSmeMessages[selectedSmeIndex].details}</Label>
                                    <div class = "flex flex-row space-x-4">
                                        <Button size="sm" class=" w-full text-center font-bold"><MoneyBillTransferSolid class="w-7 h-4 me-2"/> Transaction History</Button> 
                                        <Button size="sm" class="w-full text-center font-bold"><HandHoldingDollarSolid class="w-7 h-4 me-2"/> Loan History</Button>
                                    </div>
                                    {#if filteredSmeMessages[selectedSmeIndex].status=="pending"}
                                        <form class="flex flex-row space-x-4">
                                            <input class="grow bg-gray-200 rounded-lg indent-3 text-sm" bind:value={comment}  placeholder="Your Comment" required>
                                            <Button type="submit" size="sm" class=" w-1/6 text-center font-bold bg-red-500 hover:bg-red-600">Close Ticket</Button>
                                        </form>
                                    {:else}
                                        <Label class="text-sm text-custom_font-reddish ">Your Comment : <span class="font-bold">{filteredSmeMessages[selectedSmeIndex].comment}</span></Label>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </TabItem>
</Tabs>
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
            <Button class="bg-logo-1">Create</Button>
        </div>
    </div>
</Modal>