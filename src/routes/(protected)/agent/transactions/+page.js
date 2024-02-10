import { get } from "svelte/store";
import { jwtToken } from "$lib/Components/token.js";
import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";
export const ssr = false;

export async function load() {
    console.log("load");
    console.log(get(jwtToken));
    let response = await fetch(
        `${PUBLIC_API_GATEWAY_URL}/agent/buy/history/farmer`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: get(jwtToken),
            },
        }
    );
    console.log(response);
    const farmer = await response.json();
    response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/buy/history/sme`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
    });
    const sme = await response.json();
    console.log(farmer);
    console.log(sme);
    let data = { farmer, sme };
    return data;
}
