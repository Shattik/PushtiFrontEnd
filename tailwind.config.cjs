/** @type {import('tailwindcss').Config}*/
const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
        "./node_modules/svelte-awesome-icons/**/*.{html,js,svelte,ts}",
    ],

    plugins: [require("flowbite/plugin")],

    darkMode: "class",

    theme: {
        extend: {
            colors: {
                // flowbite-svelte
                primary: {
                    50: "#FFF5F2",
                    100: "#FFF1EE",
                    200: "#C8F7DA",
                    300: "#FFD5CC",
                    400: "#FFBCAD",
                    500: "#27C848",
                    600: "#2CB948",
                    700: "#37AA4E",
                    800: "#359B49",
                    900: "#318B43",
                },
                sidebar_bg: "#EDFFE5",
                logo: {
                    1: "#27C848",
                    2: "#2CB948",
                    3: "#37AA4E",
                    4: "#359B49",
                    5: "#318B43",
                    6: "#318241",
                    7: "#327C40",
                    8: "#32643B",
                },
                rank: {
                    gold: "#FFD700",
                    silver: "#C0C0C0",
                    bronze: "#CD7F32",
                },
                body_custom: "#FDFFF5",
                border_custom: "#BFF8A4",
                custom_font: {
                    deep: "#308140B3",
                    light: "#67D895",
                    reddish: "#BD3B3B99",
                    sub_header: "#3CDE8A",
                    table_header: "#667085",
                },
                divider_col: "#2CB94827",
            },
        },
    },
};

module.exports = config;
