import { get } from "svelte/store";
import { jwtToken } from "$lib/Components/token.js";
import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";
export const ssr = false;

export async function load() {
    console.log("load");
    console.log(get(jwtToken));
    let response = await fetch(`${PUBLIC_API_GATEWAY_URL}/sme/sell/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
    });
    console.log(response);
    const sell = await response.json();
    response = await fetch(`${PUBLIC_API_GATEWAY_URL}/sme/buy/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: get(jwtToken),
        },
    });
    console.log(response);
    const buy = await response.json();
    console.log(sell);
    console.log(buy);
    let data = { sell: sell, buy: buy };
    return data;
}
