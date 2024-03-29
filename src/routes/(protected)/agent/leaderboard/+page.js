import { get } from "svelte/store";
import { jwtToken } from "$lib/Components/token.js";
import { PUBLIC_API_GATEWAY_URL } from "$env/static/public";

export const ssr = false;

export async function load() {
  console.log("load");
  console.log(get(jwtToken));
  const response = await fetch(`${PUBLIC_API_GATEWAY_URL}/agent/leaderboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: get(jwtToken),
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}
