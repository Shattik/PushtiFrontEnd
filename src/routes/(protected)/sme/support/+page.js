import { get } from "svelte/store";
import { jwtToken } from "$lib/Components/token.js";
import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";

export const ssr = false;

export async function load() {
    console.log("load");
    console.log(get(jwtToken));
    console.log("Bhai req ditasi");
    const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/sme/inbox`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
    });
    const arr = await response.json();
    console.log(arr);
    const data = { inbox: arr };
    return data;
}
