import { get } from "svelte/store";
import { jwtToken } from "$lib/Components/token.js";
import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";

export const ssr = false;

export async function load() {
  console.log("load");
  console.log(get(jwtToken));
  const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/vendor/inventory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: get(jwtToken),
    },
  });
  console.log(response);
  const arr = await response.json();
  // data is an object of {inventory: []}
  let data = { inventory: arr };
  console.log(data);
  return data;
}
