import { get } from "svelte/store";
import { jwtToken } from "$lib/Components/token.js"

let apiGatewayUrl = "http://localhost:4001";
export const ssr = false;

export async function load() {
    console.log("load");
    console.log(get(jwtToken));
    const response = await fetch(`${apiGatewayUrl}/farmer/dashboard`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": get(jwtToken)
        },
    });
    console.log(response);
    const data = await response.text();
    console.log(data);
}
