<script>
  import {
    Label,
    Input,
    ButtonGroup,
    InputAddon,
    Button,
    Alert,
    Card,
    Avatar,
    Radio,
    Select,
  } from "flowbite-svelte";
  import {
    AddressCardSolid,
    IdBadgeSolid,
    KeySolid,
    UsersSlashSolid,
    CalendarDaySolid,
    EnvelopeOpenSolid,
    PhoneSolid,
    HouseChimneySolid,
  } from "svelte-awesome-icons";
  import LoginNavbar from "../LoginNavbar.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  /**
   * @type {{ error: any; }}
   */
  export let res;
  let apiGatewayUrl = "http://localhost:4001";
  let nid = "";
  let password = "";
  let dob = new Date();
  let accountType = "";
  let farmerType = "";
  let email = "";
  let name = "";
  let permanentAddress = "";
  let mobile = "";
  let division = "";
  let district = "";
  let upazilla = "";
  let union = "";
  let confirmPassword = "";
  let divisions = [{ value: "", name: "" }];

  let districts = [{ value: "", name: "" }];

  let upazillas = [{ value: "", name: "" }];
  let unions = [{ value: "", name: "" }];

  onMount(async () => {
    const response = await fetch(`${apiGatewayUrl}/register/sme`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let divisions_array = await response.json();

    console.log(divisions_array.divisions);
    let division_json =[{ value: "", name: "" } ];
    
    divisions_array.divisions.forEach((/** @type {{ id: any; name: any; }} */ element) => {
      const obj = { value: element.id, name: element.name };
      // division_json.push(obj);
      // prepend the new division to the array
      division_json = [obj, ...division_json];
    });

    division_json.pop();

    // sort the array by value
    division_json.sort((a, b) => (a.value > b.value ? 1 : -1));
    
    divisions = division_json;

  });

  async function getDistricts() {
    const req_body = { division };
    console.log("req_body", req_body);
    const response = await fetch(`${apiGatewayUrl}/register/district`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req_body),
    });

    let districts_array = await response.json();

    console.log(districts_array);

    // do same as division
    let district_json = [{ value: "", name: "" }];

    districts_array.forEach((/** @type {{ id: any; name: any; }} */ element) => {
      const obj = { value: element.id, name: element.name };
      // district_json.push(obj);
      // prepend the new district to the array
      district_json = [obj, ...district_json];
    });

    district_json.pop();

    // sort the array by value
    district_json.sort((a, b) => (a.value > b.value ? 1 : -1));

    districts = district_json;

    console.log(districts);
  }

  async function getUpazillas() {
    const req_body = { district };
    console.log("req_body", req_body);
    const response = await fetch(`${apiGatewayUrl}/register/upazilla`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req_body),
    });

    let upazillas_array = await response.json();

    console.log(upazillas_array);

    // do same as division
    let upazilla_json = [{ value: "", name: "" }];

    upazillas_array.forEach((/** @type {{ id: any; name: any; }} */ element) => {
      const obj = { value: element.id, name: element.name };
      // upazilla_json.push(obj);
      // prepend the new upazilla to the array
      upazilla_json = [obj, ...upazilla_json];
    });

    upazilla_json.pop();

    // sort the array by value
    upazilla_json.sort((a, b) => (a.value > b.value ? 1 : -1));

    upazillas = upazilla_json;

    console.log(upazillas);
  }

  async function getUnions() {
    const req_body = { upazilla };
    console.log("req_body", req_body);
    const response = await fetch(`${apiGatewayUrl}/register/union`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req_body),
    });

    let unions_array = await response.json();

    console.log(unions_array);

    // do same as division
    let union_json = [{ value: "", name: "" }];

    unions_array.forEach((/** @type {{ id: any; name: any; }} */ element) => {
      const obj = { value: element.id, name: element.name };
      // union_json.push(obj);
      // prepend the new union to the array
      union_json = [obj, ...union_json];
    });

    union_json.pop();

    // sort the array by value
    union_json.sort((a, b) => (a.value > b.value ? 1 : -1));

    unions = union_json;

    console.log(unions);
  }

  async function handleSubmit() {

    if (password != confirmPassword) {
      res = { error: "Passwords do not match" };
      return;
    }

    // construct requestObj using the form data
    const requestObj = {
      nid,
      password,
      dob,
      accountType,
      farmerType,
      email,
      name,
      permanentAddress,
      mobile,
      union,
    };

    console.log(requestObj);

    let data;
    // Perform login logic here
    try {
        // Send authentication request to backend
        const response = await fetch(`${apiGatewayUrl}/register/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObj)
        });
        data = await response.json();
        console.log(response);
    } catch (error) {
        console.error('An error occurred during login:', error);
        res = { error: 'An error occurred during login. Please try again later.' };
    }
    if(data?.success){
        goto(data.redirectUrl);
    }
    else if(data?.error){
        res = { error: data?.error };
    } else {
      res = { error: "Invalid Credentials" };
    }
    // console.log(
    //   nid,
    //   password,
    //   dob,
    //   accountType,
    //   farmerType,
    //   email,
    //   name,
    //   permanentAddress,
    //   mobile,
    //   division
    // );
    // res = { error: "Invalid Credentials" };
  }
</script>

<LoginNavbar />
<div class="grid grid-cols-1 place-items-center w-screen">
  <Card class="w-1/3 max-w-full my-20">
    <form
      class="flex flex-col grow space-y-6"
      on:submit|preventDefault={handleSubmit}
    >
      {#if res?.error}
        <Alert
          color="red"
          border
          dismissable
          on:close={() => {
            res.error = "";
          }}
        >
          <UsersSlashSolid slot="icon" class="w-4 h-4" />
          <span class="font-medium">{res.error}</span>
        </Alert>
      {/if}
      <h3 class="text-3xl text-center font-bold text-logo-2 dark:text-white">
        Sign Up
      </h3>
      <div class="grid grid-cols-1 place-items-center w-full">
        <Avatar class="ring-logo-1 ring-opacity-40" size="xl" border />
      </div>
      <Label class="space-y-2">
        <span class="font-bold">NID</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <AddressCardSolid
              class="w-4 h-4 text-white-500 dark:text-gray-400"
            />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            id="nid"
            type="number"
            placeholder="123456789"
            bind:value={nid}
            required
          />
        </ButtonGroup>
      </Label>
      <Label class="space-y-2">
        <span class="font-bold">Name</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <IdBadgeSolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            id="name"
            placeholder="Name"
            bind:value={name}
            required
          />
        </ButtonGroup>
      </Label>
      <Label class="space-y-2">
        <span class="font-bold">User Type</span>
        <div class="flex flex-row flex-wrap space-x-6">
          <Radio
            name="accountType"
            bind:group={accountType}
            value="farmer"
            class="p-x-2 "
            required
          >
            <span class="text-gray-900 dark:text-white">Farmer</span>
          </Radio>
          <Radio
            name="accountType"
            bind:group={accountType}
            value="sme"
            class="p-x-2"
            required
          >
            <span class="text-gray-900 dark:text-white">SME</span>
          </Radio>
          <Radio
            name="accountType"
            bind:group={accountType}
            value="vendor"
            class="p-x-2"
            required
          >
            <span class="text-gray-900 dark:text-white">Vendor</span>
          </Radio>
        </div>
      </Label>
      {#if accountType == "farmer"}
        <Label class="space-y-2">
          <span class="font-bold">Farmer Type</span>
          <div class="flex flex-row flex-wrap space-x-6">
            <Radio
              name="farmerType"
              bind:group={farmerType}
              value="Dairy"
              class="p-x-2"
              required
            >
              <span class="text-gray-900 dark:text-white">Dairy</span>
            </Radio>
            <Radio
              name="farmerType"
              bind:group={farmerType}
              value="Poultry"
              class="p-x-2"
              required
            >
              <span class="text-gray-900 dark:text-white">Poultry</span>
            </Radio>
          </div>
        </Label>
      {/if}
      <Label class="space-y-2">
        <span class="font-bold">Date of Birth</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <CalendarDaySolid
              class="w-4 h-4 text-white-500 dark:text-gray-400"
            />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            id="dob"
            type="date"
            bind:value={dob}
            required
          />
        </ButtonGroup>
      </Label>
      <div class="flex flex-row flex-wrap space-x-6">
        <Label class="space-y-2">
          <span class="font-bold">Division</span>
          <Select
            class="mt-2"
            items={divisions}
            bind:value={division}
            on:change={() => {
              district = "";
              upazilla = "";
              union = "";
              getDistricts();
            }}
            required
          />
        </Label>
        {#if division}
          <Label class="space-y-2">
            <span class="font-bold">District</span>
            <Select
              class="mt-2"
              items={districts}
              bind:value={district}
              on:change={() => {
                upazilla = "";
                union = "";
                getUpazillas();
              }}
              required
            />
          </Label>
        {/if}
        {#if district}
          <Label class="space-y-2">
            <span class="font-bold">Upazilla</span>
            <Select
              class="mt-2"
              items={upazillas}
              bind:value={upazilla}
              on:change={() => {
                union = "";
                getUnions();
              }}
              required
            />
          </Label>
        {/if}
        {#if upazilla}
          <Label class="space-y-2">
            <span class="font-bold">Union</span>
            <Select class="mt-2" items={unions} bind:value={union} required />
          </Label>
        {/if}
      </div>
      <Label class="space-y-2">
        <span class="font-bold">Permanent Address</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <HouseChimneySolid
              class="w-4 h-4 text-white-500 dark:text-gray-400"
            />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            id="permanentAddress"
            placeholder="Permanent Address"
            bind:value={permanentAddress}
            required
          />
        </ButtonGroup>
      </Label>
      <Label class="space-y-2">
        <span class="font-bold">Email</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <EnvelopeOpenSolid
              class="w-4 h-4 text-white-500 dark:text-gray-400"
            />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            type="email"
            id="email"
            placeholder="Email"
            bind:value={email}
          />
        </ButtonGroup>
      </Label>
      <Label class="space-y-2">
        <span class="font-bold">Phone</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <PhoneSolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            type="tel"
            id="phone"
            placeholder="01234567890"
            bind:value={mobile}
            required
          />
        </ButtonGroup>
      </Label>
      <Label class="space-y-2">
        <span class="font-bold">Your password</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <KeySolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            id="pass"
            type="password"
            bind:value={password}
            required
          />
        </ButtonGroup>
      </Label>
      <Label class="space-y-2">
        <span class="font-bold">Confirm Your password</span>
        <ButtonGroup class="w-full">
          <InputAddon class="bg-logo-2 text-white">
            <KeySolid class="w-4 h-4 text-white-500 dark:text-gray-400" />
          </InputAddon>
          <Input
            class="focus:border-logo-1 focus:ring-logo-1"
            id="confirm_pass"
            type="password"
            bind:value={confirmPassword}
            required
          />
        </ButtonGroup>
      </Label>
      <Button
        type="submit"
        class="w-full bg-logo-1 text-white font-bold focus-within:ring-sidebar-bg focus-within:ring-opacity-50"
        >Create Your Account</Button
      >
      <div
        class="text-sm text-center font-medium text-gray-500 dark:text-gray-300"
      >
        Already registered? <a
          href="/login"
          class="text-logo-1 hover:underline dark:text-primary-500"
        >
          Log In
        </a>
      </div>
    </form>
  </Card>
</div>
