import { get } from "svelte/store";
import { jwtToken } from "$lib/Components/token.js";
import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";
export const ssr = false;

export async function load() {
    console.log("load");
    console.log(get(jwtToken));
    const response = await fetch(
        `${PUBLIC_API_GATEWAY_URL}/farmer/sell/history`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: get(jwtToken),
            },
        }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    return { data };
}
