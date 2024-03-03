<script>
  import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    Table,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import {
    LinkSlashSolid,
    ChevronLeftSolid,
    ChevronRightSolid,
    SlidersSolid,
    DownloadSolid,
  } from "svelte-awesome-icons";
  import { slide } from "svelte/transition";
  import { name, phone } from "$lib/Components/avatar.js";
  import { get } from "svelte/store";

  import pdfmake from "pdfmake/build/pdfmake";
  import pdfFonts from "pdfmake/build/vfs_fonts";
  pdfmake.vfs = pdfFonts.pdfMake.vfs;
  export let transactions = [
    {
      transactionid: "3",
      farmername: "hojoborolo",
      avatarLink: "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
      phone: "123",
      total: "100",
      totalTax: "100",
      totalDeduction: "0",
      cashback: "0",
      timestamp: "2024-02-08T12:41:56.854Z",
      status: "approved",
      buyitems: [
        {
          tid: 3,
          productname: "Cow Milk",
          unit: "kg",
          quantity: 5,
          tax: 10,
          totalPrice: 300,
        },
        {
          tid: 3,
          productname: "Goat Milk",
          unit: "kg",
          quantity: 10,
          tax: 12,
          totalPrice: 350,
        },
      ],
    },
    {
      transactionid: "2",
      farmername: "hojoborolo",
      avatarLink: "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
      phone: "123",
      total: "100",
      totalTax: "100",
      totalDeduction: "0",
      cashback: "0",
      timestamp: "2024-02-08T12:40:51.698Z",
      status: "rejected",
      buyitems: [
        {
          tid: 2,
          productname: "Cow Milk",
          unit: "kg",
          quantity: 5,
          tax: 10,
          totalPrice: 300,
        },
        {
          tid: 2,
          productname: "Goat Milk",
          unit: "kg",
          quantity: 10,
          tax: 12,
          totalPrice: 350,
        },
      ],
    },
    {
      transactionid: "1",
      farmername: "hojoborolo",
      avatarLink: "https://cdn.imgchest.com/files/myd5cjx9pj4.png",
      phone: "123",
      total: "100",
      totalTax: "100",
      totalDeduction: "0",
      cashback: "0",
      timestamp: "2023-12-05T18:05:17.000Z",
      status: "approved",
      buyitems: [
        {
          tid: 1,
          productname: "Cow Milk",
          unit: "kg",
          quantity: 5,
          tax: null,
          totalPrice: null,
        },
        {
          tid: 1,
          productname: "Goat Milk",
          unit: "kg",
          quantity: 2,
          tax: null,
          totalPrice: null,
        },
      ],
    },
  ];
  let openRow = -1;
  let pagination_page = 0;
  let length = transactions.length;
  let filtered_transactions = transactions;
  const placement = "bottom-start";
  export let transactionPerPage = 10;
  export let tableTitle = "Buy History";
  export let userType = "farmer";
  $: if (transactions.length != length) {
    filtered_transactions = transactions;
    length = transactions.length;
  }
  const toggleRowTransaction = (i) => {
    openRow = openRow === i ? -1 : i;
  };
  function previousTransaction() {
    pagination_page--;
  }
  function nextTransaction() {
    pagination_page++;
  }
  async function printBuyReceipt(transaction) {
    console.log("in print buy", transaction);
    let buyer =
      userType == "vendor" ? transaction.vendorname : transaction.smename;
    let def = {
      content: [
        {
          // Company logo (replace with your logo image path)
          image: "logo",
          width: 150,
          height: 0,
          margin: [0, 10, 20, 10],
        },
        {
          // Receipt information
          text: "Transaction #: " + transaction.transactionid,
          bold: true,
          margin: [0, 20, 0, 0],
        },
        {
          text:
            "Transaction Time: " +
            new Date(transaction.timestamp).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            }) +
            ", " +
            new Date(transaction.timestamp).toLocaleDateString([], {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          margin: [0, 5, 0, 10],
        },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [" - Agent - ", { text: " - Buyer - ", alignment: "right" }],
              [
                get(name) + ",",
                {
                  text: buyer + ",",
                  alignment: "right",
                },
              ],
              [
                "Phone: " + get(phone),
                { text: "Phone: " + transaction.phone, alignment: "right" },
              ],
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return 0;
            },
            vLineWidth: function (i) {
              return 0;
            },
          },
        },

        // Table for items
        {
          table: {
            headerRows: 1,
            widths: ["*", 80, "auto", 30],
            body: [
              [
                "Item Name",
                { text: "Unit Price", alignment: "right" },
                { text: "Quantity", alignment: "right" },
                { text: "Total Price", alignment: "right" },
              ],
              ...transaction.sellitems.map((item) => {
                return [
                  item.productname,
                  {
                    text: item.total / item.quantity + " Tk/" + item.unit,
                    style: { alignment: "right" },
                  },
                  { text: item.quantity, style: { alignment: "right" } },
                  { text: item.total, style: { alignment: "right" } },
                ];
              }),
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return 1;
            },
            vLineWidth: function (i) {
              return 1;
            },
          },
          margin: [0, 20, 0, 20],
        },
        // Subtotal, deductions, and cashback
        {
          table: {
            headerRows: 1,
            widths: ["*", 70],
            body: [
              [
                "Subtotal",
                {
                  text: transaction.total + " Tk",
                  style: { alignment: "right" },
                },
              ],
              [
                "Cashback",
                {
                  text: transaction.cashback + " Tk",
                  style: { alignment: "right" },
                },
              ],
              [
                "Payable Amount",
                {
                  text:
                    parseInt(transaction.total) -
                    parseInt(transaction.cashback) +
                    " Tk",
                  style: { alignment: "right" },
                },
              ],
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return i === 0 || i === 2 || i === 3 ? 2 : 0;
            },
            vLineWidth: function (i) {
              return 0;
            },
            margin: [0, 40, 20, 0],
          },
        },
      ],
      pageSize: "a5",
      images: {
        logo: "data:image/png;base64,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",
      },
    };
    console.log("def", def);

    // create the window before the callback
    var win = window.open("", "_blank");
    {
      // pass the "win" argument
      await pdfmake.createPdf(def).open({}, win);
    }
  }
  async function printSellReceipt(transaction) {
    let def = {
      content: [
        {
          // Company logo (replace with your logo image path)
          image: "logo",
          width: 150,
          height: 0,
          margin: [0, 10, 20, 10],
        },
        {
          // Receipt information
          text: "Transaction #: " + transaction.transactionid,
          bold: true,
          margin: [0, 20, 0, 0],
        },
        {
          text:
            "Transaction Time: " +
            new Date(transaction.timestamp).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            }) +
            ", " +
            new Date(transaction.timestamp).toLocaleDateString([], {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          margin: [0, 5, 0, 10],
        },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [" - Agent - ", { text: " - Seller - ", alignment: "right" }],
              [
                get(name) + ",",
                {
                  text:
                    userType == "farmer"
                      ? transaction.farmername + ","
                      : transaction.smename,
                  alignment: "right",
                },
              ],
              [
                "Phone: " + get(phone),
                { text: "Phone: " + transaction.phone, alignment: "right" },
              ],
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return 0;
            },
            vLineWidth: function (i) {
              return 0;
            },
          },
        },

        // Table for items
        {
          table: {
            headerRows: 1,
            widths: ["*", 80, "auto", 30, "auto"],
            body: [
              [
                "Item Name",
                { text: "Unit Price", alignment: "right" },
                { text: "Quantity", alignment: "right" },
                { text: "Total Price", alignment: "right" },
                { text: "Tax", alignment: "right" },
              ],
              ...transaction.buyitems.map((item) => {
                return [
                  item.productname,
                  {
                    text: item.totalPrice / item.quantity + " Tk/" + item.unit,
                    style: { alignment: "right" },
                  },
                  { text: item.quantity, style: { alignment: "right" } },
                  { text: item.totalPrice, style: { alignment: "right" } },
                  { text: item.tax, style: { alignment: "right" } },
                ];
              }),
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return 1;
            },
            vLineWidth: function (i) {
              return 1;
            },
          },
          margin: [0, 20, 0, 20],
        },
        // Subtotal, deductions, and cashback
        {
          table: {
            headerRows: 1,
            widths: ["*", 70],
            body: [
              [
                "Subtotal",
                {
                  text: transaction.total + " Tk",
                  style: { alignment: "right" },
                },
              ],
              [
                "Total Tax",
                {
                  text: transaction.totalTax + " Tk",
                  style: { alignment: "right" },
                },
              ],
              [
                "Due Deduction",
                {
                  text: transaction.totalDeduction + " Tk",
                  style: { alignment: "right" },
                },
              ],
              [
                "Cashback",
                {
                  text: transaction.cashback + " Tk",
                  style: { alignment: "right" },
                },
              ],
              [
                "Payable Amount",
                {
                  text:
                    parseInt(transaction.total) -
                    parseInt(transaction.totalDeduction) -
                    parseInt(transaction.totalTax) +
                    parseInt(transaction.cashback) +
                    " Tk",
                  style: { alignment: "right" },
                },
              ],
            ],
          },
          layout: {
            hLineWidth: function (i) {
              return i === 0 || i === 4 || i === 5 ? 2 : 0;
            },
            vLineWidth: function (i) {
              return 0;
            },
            margin: [0, 40, 20, 0],
          },
        },
      ],
      pageSize: "a5",
      images: {
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAACfCAYAAAAF1DpBAAAAAXNSR0IArs4c6QAAIABJREFUeF7sXQlYVFXfP3fYGVAEGWRTUVwK1DQSs68CzQrU3N4QBevN3BWsLG1TUatXWywBcy1LIQFzKRXaBK33LdC0DDAVBBe2GQQUGEAY5n7PucydzlzuzNyBuXcucO7z8AAz557ld7bf+Z//QgD8YAQwAhgBjABGACOAEcAIYAS6IAJEF6wzrjJGACOAEcAIYAQwAhgBjABGAGAiiwcBRgAjgBHACGAEMAIYAYxAl0QAE9ku2W240hgBjABGACOAEcAIYAQwApjI4jGAEcAIYAQwAhgBjABGACPQJRHARLZLdhuuNEYAI4ARwAhgBDACGAGMACayeAxgBDACGAGMAEYAI4ARwAh0SQQwke2S3YYrjRHACGAEMAIYAYwARgAjgIksHgMYAYwARgAjgBHACGAEMAJdEoEeSWRJkiRKGuVjy1SKtd427h952/c7TRAE2SV7EFcaI4ARwAhgBDACGAGMQA9FoMcR2bqWupA1xVuzTlX/Rne5eob7JMlyr+h5vg4eST10HOBmYwQwAhgBjABGACOAEehyCPQYIkuSpHViaXLRlxVHfetUSthRKgCANQBArflRPec5HTznMXOkr72soMv1JK4wRgAjgBHACGAEMAIYgR6GQLcnslCNIKfur1VvFm3dVNokt9f0by0AoJfmb0hkJQCAZgCArbedh3qFT1TWjL6TniEIoqGHjQfcXIwARgAjgBHACGAEMAJdBoFuTWTLmssefOf6nrOnqn+DRBU+NGml/4a/4Xfo55Sk1tvOoznGe+6u6e5PvkwQRGuX6VFcUYwARgAjgBHACGAEMAI9BIFuSWShGsGXFd98klh6YHGdSgnVB+BDqxJQkldG/9Lfwd806YW/VcOlg6wTh6wN97X3zOghYwI3EyOAEcAIYAQwAhgBjECXQKBbEVmoRlDaXDHrjWsfHzpb+xeqA0uTU7RTmN+jUlk0HfX5DPdJtSt8ox/zsfW42CV6FlcSI4ARwAhgBDACGAGMQDdHoFsQWUhgvy3/Ye5NVeX+LxVH1YgU1pzdRxmFrfCJuhHh8uQjHk4ecnNmjvPCCGAEMAIYAYwARgAjgBEwDYEuTWQhgT135+KMHYUH952rvkgZb6ltAVDbgWayTQbLVCEwDZ1/UkOjL0f6X287D9UK7+j9M9yfWEkQRH1HM8XvYQQwAhgBjABGACOAEcAIdByBLktkz1b9OXtH0Vefn6v+S0swNTA0AwLYqu0AaLXrODAsb6K6tbRBmGq5T9TWmX0nvY4DKpgVa5wZRgAjgBHACGAEMAIYAaMIdDkiq6hX9NtWvP/KN2U/0e6zaF1X2FjUaMsaSmUhoYVS2k48bLqzOoZjY3uNrP/PwFVP+jh6aKMsdKI8/CpGACOAEcAIYAQwAhgBjAAHBLoMkS0jScejhV8dS7p5ZGKdSqn1+2pAcqoluKQNAK32AGjUDYC3nQwMdxwEelk5gdJmOfi7oQhogiTog4z2ZgBJLe0FgU6rLWeG+6QbK33mhnvaeV7igD1OghHACGAEMAIYAYwARgAj0AkERE9koR5s0s2jaZ8WJk/XEFh9Hgjg53oJrpfUA6y+fzEY6zwSOFtL20F2tvYvcPT2j+Bo5U/M75i+Z+nymwAAdIAFVIe2eblP1Nk53k+HuxPudZ3oG/wqRgAjgBHACGAEMAIYAYyAAQRES2QpQ67qi8++nf9xalmjHI3EBZuDXu1DYklLSWk9VvgbfkaRTm97D7Bt9FowzHmw0cFQek8Onvt7DYC/kQfmR5cDy4YPKpltH1DB3qMpxmvuu9Pdn/wPDqhgFHacACOAEcAIYAQwAhgBjIDJCIiSyF6pvfZ/m6/sOn6u+i+oB8u8zkeNrtikpdrPnK2l6ugB0yXzBsxglcIaQuto5Y8gsTQZElq0DGYwBZTUwnTwf6iRq03nbecBYryiPpoum7QGE1qTxyd+ASOAEcAIYAQwAhgBjIBeBERFZOvIOtn2K8kXkm4c8+5snz3kOgK8E7AKeDl4dDir2lYl2F9+lCK0nX2GSwepNg9e9dxwh0GpBEFA0osfjABGACOAEcAIYAQwAhiBTiAgCiJLkqTVzmvJh/ffODpNY3RFEz02fViDzYX6r2uGLwbTvCZ1AhbdV6GaQWJpEpv+LJcydCKIzXCf1LDCa+4UHwfPLC4v4zQYAYwARgAjgBHACGAEMALsCFiUyEI92LM1f72zNm/rm2WNctSNVof6K7r/dLDMP9pkNQKuhV1WFoHlBRuZ+rNcX9dx4zXD/cmCGM/ZE70dvW9xzQCnwwhgBDACGAGMAEYAI4AR+AcBixBZkiQlqQXfrjpY+O1716xKodEUrVOKegLgTGyhGsHSQdHgIdeRBvv2XM1f4ErdNVDaoAD1rUptWicrKfXucOdBnFQREP1ZrmMJbQsktLC99jBC2My+ky4u94l6jCAI6PkAPxgBjABGACOAEcAIYAQwAhwREJzInpfnRm86t21HeYPCCRpyqWxbJfccWtHq0qTWKJGF3giW+kcZVCOA5DVT/hv4puxHY75iqTpAQjvN6wlOqgmJJUng6O2fuEhoIXll80ELi2z2tvOwXeEd9d4M90kbCYK4x7HvcDKMAEYAI4ARwAhgBDACPRoBwYjsrYbb3u/lbC28UJlH+17V6sGSElLVbK+yVtmQaGewubmivod6sNEDpgND3gig5HXLld3gXPVfHergYc6DQPwD64xKaDnoz6KEHCXpsF46vm+97TzUrw9YHPuk6/jtHao0fgkjgBHACGAEMAIYAYxAD0KAdyIL9WBTrx4/uPfSwWfrWpS0eyomSaX0R1ut1eCefWszaUXC/2nCq+0OLgQWJk66eQxsubzLLN0IjcaWDY7qLKGlCSytJ8sMe6sjsZ3Y5+HSNQOWPDbA3qPILI3AmWAEMAIYAYwARgAjgBHohgjwSmQrSFK6+9y22yevZ0LfqrQHAjYJJYRWS/aa7VslLXat2nRQBxYSygmy8QYNuaDHA0hgoRqBuR+uhBZGCHujaCuqbsBGWtmwaEdyn/Oc/vWb/RdHEAShI6o2d9twfhgBjABGACOAEcAIYAS6IgK8EVmSJK3X/O895ZmyHEhiuTw6bqpc3VzBlAET1RNk4yXQCIvLM//3NfpUCVDyjBqUodnqlA8AaJcOSoShOgNUa2ALc4tm1gGDMNYmzvOcnv72gCWTubRfiDQkSdoAAOAPHDtQuRniBom22hDhhpJ5RJUCvg/HhR0AwAoA0EAQxB0h6t+ZMqCRoqbdMBt67sDfsA3wB7aLjvgGxw/Ud27FfoPZUdeMCXRcwL/RNUnf+sR2sOvsWkbfiuD+6swk6eLvauY4XJeMPXAMwh96/aPHLq0uRo9H+D9cJ+FvOMZIbAdhDFr8PUbANAQ6u/jrLe1E8U/HNp2LhwQMDeXKll4nOpezjVTyYsAcEDlkKjOKlsGWfXotGey4lmQoDarOAEkGJFK0ARaTxNL5sJJeGGQBqhtw8VX7ZfkxsF9+jItBGGvdna2kTSeCvu7bjyD+cbNgWh93OHUdee/+07d/O5jfcHXo9cZSe2VrI1CqG2F+VN9IJQ5AatX249j2W+1o5UDrPlP93gDfaW1UN7Q2SuD78FG0VMNfVL/DPGS2rvA9SYB0iGpsr5Gb/ey911uC/DWSjQMLlCUrbzSVLipuumXd0NpoW9lcrYb1R0i4ITyptkutHCQQD83fEBuVzMZN4mfv0+Rn773V3dZ1K0EQNR3umC7wooak9m5UN86ra218r7K52knRXN2sVDfYKlsbGxpaGxzr28aSqrK5mt78QWWzdmzA74z6kVa0VHfI5zQ9dmH5mv6iynK3dQVOEgfgbusGZDZu8P8bfvbenwAA9hEEcbcLQN+pKmr6jTWP2+C2U2uz1UCJBExW3KuaDQC4X9FcbWx9b5ZaOUCMm9ztXH+WWbsuIwhCJ/53pypshpeVrcpNmTVn385XFqivN5bCdapZqW6k9wdqjYJrHBwbyJxWy2zctAa8Da0Nqnp1I1wz4HpHj2NqfGv2QLW7rasE5jPQ3kcV3GvEoYH2Pi8SBNG2KFrwIUnSVtFSfSu/vrDv9aZbErg+X28spWqErPntaiizacODy0NjxyWtUGk0a43B4vS1X7NvwbVd7WfvLQmQDq0f22vEAoIgUoWqvznLIUnSobippOJ6Y5n99aZbtnBtrmyuhmszNb81ezZrkfQ4QHgAgJ/BNdTP3qchQOp/GADwPJ83y7wR2aVZb7ZcqMwztsjRwFCT3dlGqvo05F3rIS5+8HPmlbwOiOUNCvBzSTa4ercYqCUk+Lrqe339ytzo9F31o8SZE4nmSmihQdiXFcfA/opjHRp7Pzzw5WAh9WXhZpZ192z6vtLDTyvVjSiZp7FDJdzwby0R0dNAtr5k80pBfRbqMrbpX32n3Ofp0Od6hwAz8aU8ZcGCVHn6LmoTayNX9MM8yKAR2fSRLDpUMfwejn+0ndDFmqOfvTeY3DfkfKhL8MMEQbSYWF1RJidJMrS4qfRgvrLArbK5CuQrC63hJqBZAFEdcdR7h8E5bsGG0v1M1RVuWgMdvFUB0iHqQOmQ0gCp/7MAgAt8LsxCtz3n7sWbOXV/ecL2wg0MzmnNAUOtaKEOGvQ4Zs59rms81SSpxEE90MFbEtonWB7kcn9gL6LXbaHbSpcHpa8nqk7fTZNnOGnmPS3sYFvP9B2Y2NYEZloaMzgPIF7U2hEg9QexvtFx7jZuGyyBAVzn85SFTWmKdNt8ZSGsAtNNJDpXLVHFrlAmvd7bymxcVREeYQ2hLsFuBEHQY0m0bdD0f8O52ov2WTVnaSGVDiczU+VVAVJ/69A+wepQl+ABBEGUmClfbTa8EFmSJHuPOzQNXhUbdaGFNujApE/AEBc/g+9cqMwDe/MPAvgbfe45qoDKBl1T2kHFJFxwUWGSDfQz+DfMsJ3RGTNn6LLrnYBXOmsQpq9vm7NGfz7Ky87rsrk7X19+Z2svvrf5xt7XGAQVxYZrVbgSFeYCKoEnuo+GrfaWEtIyroWZmg5O5DRFxulURcZjmndRo7t2OssGDleGyDydD02KtRIaeJJ/1/8lf3vC/pqpdbd0eohdQ2vDi5l3zm07W3vRXnMIQPubywGHboa+ictlI2U7qKLwGJPqMstmS69zoIEbVoDUXxXa5+H4AOlg6DJP8NsSc/Y/SZKPryuOP52vLDQ0X+nvOB3ykfqxEUBqDrRt/E+fCXUZ97QlNv5UefofqYqMBxD7DBRWfe00Jhhh6xo2YQD1mczGVb1xUMxOmW3f5ebsUy55pcrTyVRFBkwK20STbEi09ZF2Ltn2xDQ6eEXIwppmy8IcxXzQlbdUH0u8dWCa5gAD+wxdr83d/9o1tm28xybKbN1eNudA4YXIFtUXecxJfwmybs6n9QUBc+oX3B8J06PuubSbij4Cq7Py2LeCFjsdn7R0B9H1QE/GtO4um/6sKZuwtgpcDcJM1Z/NHnXUr4+DgyDSSZIk7ZZeiatVtFSz4UO3FT1t0gsfOviZZIAmiGySDlRKgW6WkghZWFWkR3g/cw54NK80eXpaiiJjFvIZU/IEvzI0hpkbP5t0hknWUGyaA6T+thv9YqVdJSAGlGLlKQu/TFOk/ytfWYge8tA5g5IAen5R0mgNGPTfxg66XA9CfA0RZr7tyI3MxrU5ol94ZmjvsbMJgqgVqiLmLIckyWfXFcenaDY1FHP0IMHWV1xIrdE+fMFz1tUpbo8PF3Ljv0vedV1zZWuVooWSPtNBeSCsWpUCY7eCBvpA3+GISRAo/AKk/uqNfrH9CIKoNGe/GsrrWtOto68VvP+MEfUdo30nVH27SDnasbRz2PpXZbZ9E8RY7+LG0nXrira9pVQ30rcD7QRJPBxmtGOJIrN+K7fI7FzfNBc+vBDZP8vzAxb/8gZ04GpMGkK1w1Mqu3M0fA/cFGmFeK00rK5F6fjJn3vByeuZnNoMiWyLnRqQ/xj60xssU7rDPCXD/On6GiIkButBG4QtHRxlMB1UN3ju7zWcdGcvB2e4CqVTeb3h1oxXrr1/RDOQUczMeUrT9i9jjMC+gt9RJBpKZXcMi7MjCAIu+GZ9qsnq3gvy1is0ZRkKwkGPH7R8dFxzkWJppbAM0kz9u9Ev5mCg09C5Zm0gD5lVNlctii9J2oWc4mEp+iT1bLjAOQcXT1TlgnloZHuPSQzQudrZlhrbrNlc51GR+VCiAxfn2R5h8SEuwa8SBNHuNN3ZSvL5PkmSU9cVx3+L9CuXMW1KlXTmteZFLQmGunW7hsbNcrR2hOuOIE/O3YvJW27ujdQUxnbwRvvY2N5gbL9gmyPomiBJCtzi60g4mv3KlQ1MaLCbWJLUnHXnLP01Wn+6XhATLgcVQfpL5IW0my/wcDa1b8gwsdW7gqyQxl3ZoVC0VNNCBVhFWjBFC2307c8daQ6at3acBUj9JZsGrTQb/zRbRmgLz9/OvW9Z5luXuE6ET0PePTfGPdAHAAANYKClN7SU8Uq9+q3t3ksp9nUtpt3ckRISNNu1ApWtzv7XTqLgbe9xcp7X7Ln3WlvIYtXV146VnnpD0w7OkmR9PctFfxaS2el5y41FHGu+HJzhzAeZY6t7fn3B62uL4/+DfGeIwOqTPKALJE2GDREU5gGCXkSt9wW+496b6E1ZAJnzOV6VuXtf2dEXWQz+6MXb1EXcEE5s0iyYHn5uG9InWB3rEw29HojyIUnS/kTV6co0eYajUt2oT1+SXhBRqTsTE3SBpIkCs83GSIG+9JwOzR0EmK43uiijfar9XGbj2rTcJ3rRCKchBzpYluCvkSQ5ZemVuG80urBM4g7rwza2YZvhjzHVK3Qe0Ua27UhShCzsz0iP8NFCNT5Fnt6apsgwdiA1dQ0wVH0UQ2a+qg1+Lz84wmlQx6L3mAgavHVbVxzflK8sZI5hdN9Db1BMLKFHJUf3NRpPVYQs/GSkR9h0sSGRWZOtTCxJhiSWHoNMOxBtG0y5UefQTnQNpW5xvwr8YKi51Op4IbJnFfn9Yk6/Uc6hcVAaW300fM9+jesiKCEbXXDn+oiPL+7xvKCgooB1eIOCARZabNWg1UbNJnFrynvquzbTcs0D9f5WXtzwaaY8e4G5OhES2gnuD4OJHg+DYc6DtW67yprklKuwY/KfwG/Nhtevy8EZNkLpkGVVZW9KKEt+m3Gthk5WfX8b626295jkljnYwabAeLsAHiSym2/srjpbm+vCGF90+ehGYyqx0rfx05/TxJ7GSy2zcZXwJXk21inGvockNk2RIU9VZPRCxoSxMWBMZQAttiP4Gqt2R77nehBptyCz+MhunuL2+J0XPGcNFINVujEwSJKcvvRK3FGNBwhD5A49iMBsua7NKLasY8fP3rv5oyGvc3F7Zaw5nL5Pkacr0xQZtFQKbRc9P00Zw8bK1OfyEZZFlRfjM290aJ+xfxrLyBzfwzm99EqcUnNwgVnqSIfZXE+ao9welId6tix842yPMIsY8RnCeW3RNjJfWcg8SJljf9dXLDr36XlAlb96wILL43qNus8c44IXIqvRka1gXE+ji4V2AVw/dmV42IAJUHorBQC0VCjlbyw98/bz5UoFuuGj14/MSYfiwHqC1kho1a3WpISUUFHDJA+5jji+76EPoI5Quyft1neue4sOnixrko/TfImeUuBHTBF8p/pCbQ9Aq4ElXEgim6ssfGt90baNJmxSnWq7sZcPB8ZL+NCdW1u0TZmvLESvV4xVhbfvNSoUotSTTZWnV6QqMpwR/Vbm4YM3XLp6xrBf1w94yU8o7xsdxYskyclLr8SdQN3idUI/1NRqaNfzIyMSBLuVYBBZU+tszvTUfNrg9/IoISWyW27uaTpbm2vOdvTkvNoJQP7db+bUZ9xDT4gJFJIkpc/9vaZW2apzqyZ0FbX7xwues5qn9g0xy+GVFyJbUVchm5axCPoKRMkrdY2qQY3WGQJHpux+zsvB43eaOH18ce/21KvHH6d979HXryyuQQxJDph6Gdq0rdZqlcpGbb3hwZdemub15DZDvZh4LWn+zsKk7Zo0TMMW2DauwR6MDhYDZFZ9OTgD6onSbTKaV2cS5NZfXbm+OAH6zYSPxUnLkREJvIzRJZfXNypaqo1di3YGSs7vaoisk9is33PrC75dXxz/FGOcG5PGcm53T0gI+3ajX+yzMju3r8XaXkhkZ+XF0psuq8CB57pTBp87A9d6ywgZFIDw/oiIyMK2qt71XzbkPof7hDLotU8sTW7Mqsmx+PrOe0fzXwDrreKGQTFTR0iHio3Ies3Ki4UOglEDa/4R0sMjImRh6kiPcLMcXnkhCeV15e7TMxbDBYl59aSjVDzUxe/y/kmfxEGfjBqi2rrs9FuZFyrzBhi52qdP8bQEltLn6WUtXb9QNePdTPcLvn9UXipGeqjdhI0cMuU/L49eZNRqrpgstt+bf3j/N6U/TWMYBsHs9V0ZdWhwqG0BUNsBQMWP+ucRlMhCn6rriuL3dKgBPLzEF5FdW7TtXr6y0GwHkc40XYwSWeidYOmVuHuKFh2H94au3zsDQXd+FwYEsP3A781B/Rxc0DVJNG2Gxl6z8mK/teDhlVrHNw1cGRPg7J8oBDAiI7LgvUHLvYdLh/PmahDFFAZA+Lz8yL2TVafNqT4hRLeJtYx2ZPadwbGP3O84JFtMFSZJ0uW5v9fINRJZpo9zPqvKemCKkIWBSI9ws3BQs2TCRKCWrO076VA0lMiyGfFodczC/SbOXxcUC+uQr8mj4bkfXzp79U6xE+PUwKaArAVnjCxg/o6Q/+xD6xGc9gw0GqP9xDKrCN8tz4n4FhqYcXoKyAK7fXnHXvm27NR7fJ9oKEILhxkBgJOtFJx76GsroSJd5dYVRKy/Hn9QLKoFPBLZRob7KE7jgI9E0DH6Rr9YWzEFR8isyS5KLEmGB0rakwhsOledSD5g6qp5UusUPKxsGPjyYA97lyKxNYQkyWdm5cV+Y+F6qWN8ouJD+4wzq39JfW0SG5FdN3iFzwOOw9rCafH8QCKbqsi4l9bmQxY/nUeAqTcPXu8/f+zY3qPPdT5r8+UAbYCWXomDAU5gpuY0ZDRWSeYtHrWXdAki+9zXL8nrmpWSFolKdc+qBWX/UIoJN0TbD4PXDv6//kFQT7FeY+xFTE9feLFCqUBd26BXXTqbqbON07nNvq88EhQU1C460vSTC1rKlQo27wPaDtzs/rJNaGioyVf2b+Z+EPFt2alkcxmEGRoFE2QPg/jR63k5cLCVW9xQMm7VtS2/cIjWZWzwmuV7vohswq2ku1l3cqABk8UfDZHlRRe4I40jSbLv0itxlYbCEopB7aQjbbPgO+oAqX/zRr9YF4Ig4CFbNI9SpZw+7+/Xj1qoQloSsMJ77tYJrg+vEaIeYiOy6wfH+o5yHCKU+y3iRNWZ+n3lhztlTC1EP3WBMpjSRkrotsI7esoE1+CTYqt/QklSXVZNDi0oFOpGkpXIvuA5Qz217wRxqxbMP/Yq9EBAPWpCDe5ZqVT3JC0SNaGmpToNSRO3TfR3HXgTGnlpktpOOja3pK5FCYktBJtp2EX/fwcAUr0qYJ5nREAEq4/R6ScX1JQrFdAqHX1QQJvmD1rotjhoKlRLMPk5ePMbr3f/3lGAGMGYnAeXFx5yHQH2PfSBYES2rLG6/4rC9Td4cIjMpbnt0vBGZEuSSrJqcrw7VCkzvwSJrDl96nW2ejl3L2Zvubk32EA+WLeOO8g6B/EXPGd9OLVviCBkjWsV5fduz1x6dQOMh26JftVeb6/wmfvxhD4Pv8K13p1JJzIiq9rk/9LgAIfBcC8U5Mmszi5LLE32wLcsnYabVUd2Rf/opyf0Dv6+07mbOYPjt08r95UfZnrrMHMp3LJb4RPVPKHPOHEbe71wbBVq7KVVDbhn1SJpIVRqNUFafz8zSSG1cRyhmUx1kBSOOzSNJsA6pBPxV0jlNaX/E0+tHRf7gz7Ipp9cQJYrFfp8pFGvzR+0UNpRIgvF9P/KXv7pldqiJdy6rWOpBCeyZG3fFXlv0RFmLLGxaYGCjtIP3P8+LyQ+vuTAxdM1Z0d2rFfM+1ZIn2AQ6xPNSzs7UtOEWwdIPc7S6eywioFpwKLO/9U7/NeNcbJ1umhaFvylVtyr+teSq3GHLERk6YapI2RhH0d6hL/KX0v/yVlkRFb9gf8bfoMdvAQjsop71a8vuboe9RcuBOzdtYx2npSW9Z839oneY0WlWgDBz6n9a+eWG3te0HSEUBJZtn5Xr/CJqp3QZ1wfcwwKXjZPeb3c499HX6Hdb8F6sm58Twx+TPXKw4vQ8LGSGekLJeVKRTuH0YgXA5ifav3oJb3Ch4TrvaKbfmJBXXmDAkp12+mv0G7BVj0c3SvCN6Kxo0D++9zq9b9X/wWN1Xh7oB/a7x/9QjAd2bI2Igt9AHc6KERnQYF6hTuHb+BljH5Wdvj0yarTj4ihnWIisiRJPvDc32v+ULY2cjFkFFLPqrPDydLvayWPEe5hqZH9wumoUpauF1Dcq3p2ydW4NAsRWa3EOsI9bHtkv/BYIQARGZEFewbH+bo5ugmiWgDxhb5k1xXHQzsBIeDuCWXo3LxsHPTSuEDpYNERWRjVbVZeLH2LLbSgCi2veYVPVNWEPuO8zDE4eCEJCJE1WMdBfQaAxMnv6qR57seXwNU7eo17aSAUORHfwmsRvc/0kwuU5UoFMwwbJGfaDbqjOrKw0N9J0ubfP4YVABJAgxj6YXNNxEak2QgA67teDh6S7x/9QjD9yRqyxuXFvHVVYrhy4pPIHpSfPHBI8V20OSZRJ/NQT3ELkcz3msXLXDS1bvl1hTFrr2+LF5jUoJsAeuil/UfD7+mDVZNU4mAvtXKgddvhd/DHVtna2KxUN9Iu1QxFLRJyAW/XNpmNq2rn8A02pvYNX+mLGkqeffXaFkhk0UdIjKhyIzzCPon+8iOCAAAgAElEQVSUhQtp7CUaHVGhiSzE+1rjrfzXCt+/X8+4MsWjAZqWHjdcDsJ8DWl945ium6GAAB2ZA6ifezq0uqNYg6HMzI0hhQBeUwbb2IBfqVb4RF2a0GfcKHPUhZfNkyuRldo6gkMRu3XasencNnDyeqbBtjnZSBWnZhw0TGTbS2SZeapyIr41eTPZf/F76W3y5obv7/73xdImOdTBhZMDfdg8NcDvYTqmL10o2mcuGHR+VD5CS2RhLOZlee/eQSTgFrtG5pPIpshPbk9TfLdIDBLZCFmYKtIj3OSxaI4FgJnH8dtZLfvKqZD3FDnkowwDeaJjn9oIA6SD4zf6rXzJ1KAYcWScpOIK+ELRUjVb0w7BiZmmnSiRpTd3SWLgu+5eRK/bAuPLWlx+XcGza6/HYyJrwc6wBJGFzS1uunV4y/W9MxUt1XAfgj+ooTUXRNjIIZvwhktefKXRR67RNYEOycsWfMlQvej3KN+sAVJ/SYzXvMkye9d0vhrT2XwFJrJ0dWmBAxWeFgrKXh/44o9jnR94srPtge/zQmRz5bkeq3/YzMmxNSSykNDSz4XKPLDs9FsG2+YplZUfm7xXr0ga6q/OSF9YX97m/QAllvTflGh9s/vLUi5eC3699avD/oKT2/64nTtPM9GbWuxa7ZvtW+l6MqU/9IJAf68v3jjbqZdJZNXfP/oFDFHLJMzm6P92eTCuHngpg2umfBLZVHn6B6mKDEH08Yy1N0IWVh3pEe5mLJ0Q339Wdrj1ZNVpIQ8v6Gai1aWXWbv+uvO+DTAwSqeeLDLLOu3K6avylmo/hFiiEt5O5c/xZWbcevWagQs2BjuPEkUIy55IZD8rO9x4suq0KAKiwDFkKSILyyZJcujZ2tyL+coC++KmElDZXN2saKmGh1jtvgXXYvi427oCaLvgaNUW3b2ymXLlpLreWAqU6kYtSWHMC509jeOcMWcylJyihErr114qcaDaNtDBW+UkcbR2bLvx0arXKVrgJaW2vXS7aTxUfvY+TYFOQz6839F/o6mHbnM2lEteFiCyTCEChe2mQbFxAdIhZlkDLU5kv5jxCZBJ++rgH3xgCgASAgBrCSDatlSdQeUplV09NnnvMEOdNu3kgsYKpYKWKMFc6ElJ/zYqkc0n820Ts77ae6GNwMIHvgs7BS6Aqha7VusWOzUgCUpSz5S4tqs3fRJ5yC1w3L6gD3Nm/bp0+ZW6YtoBOKsIXiORFUy1AB4CZuXFCkKajU06PolsVk3O+oSSJF71m421jyZWEbKwa5Ee4UM5puc1mSYWNz3WhZLI6ox9mY3rpZ3DN0AjULM9rxRsybjeVPK0Hp15s5VjJCMtMVjuE5U0sc84el0RqnzWcnoikU0oSYKRrTCRNfPIy7r7q39q+ffnFS3V0LWhvmtlM5dqMDs2tSXqM7i/hLoEJ0R4hMEbH1HseUIAIwIiSzVz48CVEwKd/bPM0WaLE9m1IS+Bh32CtG25WlUEoo+u+KdtthJA2EpUhBWhPR15SmW/Hpu8Fxrq6H0QYy8modQO7FUB0Q763Hd9dGHvxLTCb2G0G4q0ak5nqKSK2pRICQma7VqBylY7D9ikrNRnQa4jP/niofd1dMACv38aHvXgpEeNq7QnGEhkf3jsS176SR94yEC31HUsVTU+ieyp6pwl20uTEkSgWqCaLQvLmu0RbpYrls4uCvMurW5RtlL2j/qkK50tgvk+c7NThfYOfi6mf3SqOQuCB7RlV+J+lrdU/5/A+r/MQwE1p9YMXJgQ7DxSEMMmYzhiImsMIf6/t6RElo/WpVScXJBW+Z0YIkQypcHU/JviFnJmvtesED7aLvY8LUxktZxik98rngFOfpxu7o1hygtBylfk93v1+/eg5bvR55Xxi8ATgx7TpjtR8BPYeGYr8z01sCIkhI0EACsChPiMO/b+Y2/NMJT5vB9Wll29U+ypSUNf7aGnM/W8AbP6rQh+vu3OQPOk5afZ7r5y9FydSsnmmgm9ltBRF4DS2Wb7VnrzR4lv80OuI37b99AHrJMm8Ien8wEJ/BF9xHbkMffJDMEkshCGmbkxUGdCyOtl1q7kk8hm3f7tiYTyr6CfP4u3c7lP1EcT+4yzuJoDSZJDZuXFXtV0htCHGO3cXDYg+r4negXT9TC6hnBNcKbm19HbSg7CcNj0Y4pBC9di9KXT0cfbMuS1kUPs+1/rbKbmeP9UVc6z28uSepSObEJJ0r2smhyhbhyMdtPhwHhfgiAE81pgtEJmSPB52eG0E1WnnzVDVubIQqu2NN9z1itT+oZAIUaPfERCZNUxgTPtQgnTA1KxdRrfRNboZrgoKBpMHw5v/Nqerdm7QUreMWZdda4Hpvg/sWt96CqD/luXnn7z4gVFHiSjbFcLMH+1X2//gSlPbb0F/0lLS7PaY3N0U22L8g3EswF6mtOnzwqJEGXEcc9BBSWzWmvNh1xHfDMgSDozjojTe20R+P3TMGSloVCgqtwnM+wJgtAq5PI9+3oCkT1zJ8dv260kUYQLXe4dPXeiazAMC2zRR36vauPSq3Fw/MMxLRTBZ+qvSWK8oh4OdRvHS5zyeZdW5ypbGwNZjCz5xp5eh5plNq62fLmV60gjeiiRFZVqQXcksnAsam54hFxPDE6BUJfgOzG+0WbxXdqRuSaGdyxAZNn4nPrIiASzGThbnMhGjZwJ4A/9LD25Bpwvz9VHZKlNb/LQJ7bGPb7qNUODYmnWm79cqMyD14gUaWWJGQ8/a3a2karqWpTQ2gw1BGM7qaPSWDRPmuA2OTg62Pd1c1M92GvE2DcClv5hbNDGFyT57C5Kgr7GaEkufKWdcdrxJ3c4+BF+kCAL8szMjYGR1rq1H9kfq3/vvaP0S2ipIBRh09t3y73mPDLRbfyvgnSugULy6wu3rS3eBq+7jR5AzVxXHfWCGK+oR/gisimK9LA0eQZUGRJKdQJCRbePOtCGugTfiPGNHmRmDDucHSayHYbObC8eDoz3IQii1GwZiiQjjVEdnGuW3E+069maAS8OC+71gNlve0QCN6dqWIjIonsK9bc5o3byQmQvVV7yXPXdu2VcUI0aOVMVNXKmdlOZuP9ZdV2zEiUX7TbVKUMmfbw+5BWDoQxf+997X/1cmg1d73AlKsxymP8zPROgE5OyflwzPrbfTJ8ndFQV9GGQXpBut7ooHoa49WVJo6PX8/nojzzHygLMokvCpU8sNNDbVY3P0K3QkG9t3s67SMQ4LtDwkma5b6T/RJdHLH7NbEEii+KqWuk9Z8zjruPbnWbNAT70yvHc32vqla2NbK7vtFbMHMpCyak+l3vtDrwyG1f1xoErp8jsXTM4lCFIkh5KZFuzanLgOmtJgkX3r/pwYHz/7khkM6uzsxNLk9Fw11AlD84XiLsQqj06+/jhwHhbgiCgoKbHPpr9nak7LDgeoieyprjfmj78KbAoaJ5W33Ts3nC2DUI74eEkCPIcmbBjyhaDhhKbzm5beeL6qQ9NXKiYKgBwwqGfsRFsWN9bYQFjhscFxNERM4wOiodPzcqtUynhFScq6WVObKrsL4I/GBrkMkIwotMTiCx0y5SQd0RpAV+p7caGWIhsZnX2L4mlyfQthsWidq0PXOA0ihgF+4aX50TVqfGflx37nyZzen7Duce8iaExQG904Ge0tTtXyTWlbgRd/MT4zn1jbK8HNvPSsA5meuJ21vOflx/5AsGDXve4CgE6WLLua0IGRBCb14LuKpE9W5s7fvON3dAynR5TltJLVkutHCT779uCiaxIbGBET2QvlBe4v/VTnILL6qYhsjBpU3m93H5aChUGmElmdf4f4zkyadeULQZd12w4t21aevGpdsq2LHUyJollvkI5PqYJ7hhZwKIdIf/Zx6WtMM2xwu99d5R+lVPaJKcN0ehXda4fkYkv2Rf8/uCHXEYKps/ZE4isxs0YNAK0uAse0RDZqmx5YlkydBgplLQEneu09FJ1ZESCHdf51NF02TV/hn4hP/qToqWaSdbo+c3mf1q7VtB+NaGHB6Wa8vIA5y/9PSrlo8hwgNS/aZl39IOedm6XOlpnvt5LUaTHpMkzPmFRv+KrSNZ8BSayVVk1OW3OUUXwHA6M9yYIgtMtpgiqy7kKufVFHuuLP2beJtI3H3C+CEVs1XDO7hgWZ0cQBF0+53Z0p4RisYERPZEtqCt3jz32KiciGzVyZnPUyJnQh+aX5fXy4GkpL7Dp0+iQzSDPkf/dMWXLo4YG1+685MjPLqUmc1Qt0Cdmp/RoNZNNZ8PzdPI4dDRs92wuzo/TrqX1zrr5554LlXmUBWertRo0SVVs1yqodwXttVfukxkwIIJgk68nEFnYDzNzY6DUDw1jbJH1aoNvrP8IlyGCSdz1NTKzOrsysTQZRqujjTO4ShzNhtv9Uv8/3xm0crTZMjSQEYw3f0l5bUtR4625lS3VrvXqBnrOUbr4Mhu3eqm1Q5ET4bhrkLT/z862dqV9QJ96DWGFalk0Tr0rW+74yFVVA5XNjcMb1A2eEgBukQD8PUjav6i/bb8rQhprmordQUX6mkPyDFpKbLErRyGJbIo8vSJNkQGDkIhBtQB0VyL7Z8MV743XEm9q5gzE2lI3PVAiC/bft6VHE9listh+Vd5WePIWfG1nrkuiJ7K37t51XfTtMk66olEjZxZHjZw5FgBgd748d/HSk2vWsPhspaU11PXEUNdBpcmztvc3tGAvTl+944+qSwuANWFNWBlVBWYu3uhVInrNBo3DyhcNnTFUn/9ZtE67/vpq+KGi43/UNStpcq4tR21FqpscVWpSQuqTflHEdZrXpP3vjlj1oqmbU2fSYyLbGfRMf1c0RLZNIitDWiDEpoMuqE0hrmNfi/WeRwcJMR1M/IbJCByUn4w7pPhuLYuhqaCbnaBEtuLk32mV3w03GSyeXjgcGO9JEIRgdhA8NaNdtj9V5gz9tCLpCkt5zJsPvqtEjeWeriOb33Bl7NpriTkC6Scb7FPxE1nylsOipNehdNHYo35l/OJXnxj06G44yH4v/yt22cnXYbQl1Iof5oGSSZWnk6zp2zlfOhvK/JmU5yvK6xQeVBoqShgBCDsrOlIY81WmU3a6TPib/q52tNvIGTsnvpNprFF7cr8amVp4/HxdC2W0RktyUWkrnYUEhrltsWulJzVdLlWmt71Hw7uPfeESJLByeg8isvBkanHVAtEQ2ersqsRSSrVACCMM1mn0bL/JU+a4P33S2BzD35sPgRT5yZ1piu/gYZmWTjIP8uYrzEBOghJZRcaeNHn6AkEaxqGQw4Hx/QiCkHNI2qWS/HT77EOflh84i9iaGDTk5rtxPZ3IZlb/tiWx9KvVWCLLYaSRJCkJT4rm4vdUvXnCWw+N9LoPusMgfy/LfWFZ+hroqJgZmxyWql1cPZ08mr+d80VbsGc9zzMpz7eU1yna+6+DkcLaE1omkaUnG2Wk4eUo+/rI5D1QjYBpDKZT+i83fumzNe/L02VKBTzpw00B5qMvb22bYHSwRqkKwN+aR+Vt73Hxu8e+GCekSgFdeA8isvcE1NHSO1ZFRGRrEkuTnZDDlxDGPjqk6VnZU4/M8ZhicVdkHJa5bpMkRZ7xvzRF+jiOali8tXu27OmPZ3tMNuiNxlyFZ9b8NjOx5KtDlm4z3Z7DgfEygiAqzdU+seSjwfkwoz4WOSjBOrwZ+LxtEBHUY70WZFb99lNi2VcTxTA+RC+RhSA9f2QlqVDeNnQ1RZHChCnv/muwywAo5Ww9X54XvfTk6h3GTgueTrJ6QxJZaMgzLfXfDeV1CnZpGwEA4WAFqEhhbQ9aT/pvqEZwI+a+yAenDZ9WZ6jjSZK0Wn7mrdjzijyoZ0YTWDRP1OUIzKqdZwaSAOomaYtEaudYGt1/xkvL/KMOc9G/5WNA9iAiiyWyyADKrM6GRBaGS6YnhpCSWWq+zJaF/d9sj3DaowAfwxvnyUAgoSSpJqsmB+pGo4+gagWw4Pn9Znw8xX2CIEQ2q/pcYELpfl5cvJk6wDRGSO4EQdw29V2xpz9VnTNne2nSfhYDUiHUltrBg4msDpEVcn1v1xddgsguP/EmWVRzg22e0QukSmrrqD4UsRu6+4GGLs0F1cUPRx1Z/oPmJb0D3dPJo+HbOV9IDU3iZ1Keb9VIZOlkaH5UHQiptZqwJpiuZlSj3QNPjnd9POq5UU8ZdQG0K/9g8Of5B//LUYqlbTsysanyZw+ZdmzuA/P/3Y8gjJbJ9+K15PJ6UtECYwVY9uHTjyxs2czcGExkdYksNPbqa8leD5T6b9o4aOU6S9ahp5WdUJIEfaoype9CE1l1jE/Ue6F9xkFdXd6f/LqC+9dej8/nvSAOBWiIbC+CIAwKTDhkJbokp2qyX9hekryXcTtpMYPCHk9kq7O/TyxNftKCRnfaMdoliOyOs1+Sx/7+HkgklLU9rfNKWwVTi+RIj/uyN0966xmNhFIlvyvvO/XQC8bcTKk9nTyaOBDZe+V1CtTpOaoW0HblLyGsJc7WkOBWejrKLj7uPfatl0cv+pPLavB9xUXpjvOJR8qV8gl6ogRRls+aH23YWqa0eYiLX/ZrI+c/Maoff34zubQHTYOJrKmIdS69iFQL6jSqBZ1rUMfeptYEqZVD/f77tsBNXatn07Hs8FtcEbAwkdUS5jX9X4wN7v0AVC3j/dEQWSiRFUJ9xmB7ujORzazKeTmxLGmrBgBDana89zksABPZ7GOJpcnTjN16C9EZXYLIPhb/DFl3TwmsrKyA1MlJbWdrK7GystI5iUWPmhU9d8SMo1A/Fv6U15U7TUt9EYbpo33LsUkFOBHZuUeWKwuqithcK9F1oPw+nluYYVDXltmhaWSa1emsP9efv50HQ+TSqgtMst5eN7ctIy25dbaWlr7wQPQjUYMms4qthRhI+srARFZY9EVEZBsTS5Np1RgIgkU2+Sl9Q56d7znra2F7oeeWJhoiO2DBwuBeo6D0jvcnu+7C/e9f3ycWIqveMSyuN0EQ0LVbt3qyqrI/TihLfknTKDYVPkHb2+OJbM1vWxNLvlppqbUd7ewuQWRHfzBRR6ICCa2trS1wcnKC5Jay0t/8xJuzR/a7H8Y9h4+6BtRIn9obBfWEDPqb00hkDRLQJSfW3D1f/hfU90MDGOj4DPR08vj82zlfcHZttev3446fF+2B+rxoyD2tTq2eyEBMoy9V5LBn3nh51AIYdUyUTw8istjYCxmBmdXZkMjCQ6SQkZ3g/KFvaugDYX2Mz9wRoX0evi7KCdLNKmVhIkujqVrhO/f9CS4PvyUEvCmK9BVp8gxBpL/G2gPDFndXIptZlX04sSx5JgsGQquuUFXo6UT2bM2fMzeXfCYKI8euSGR1rhSsrKygdBa8N/nt2AmDx8MTOCS9cGDbjt0bjuoJsQ52Z1tpU+bzXxsksotPrK65UJ7LZsCgnVMTfYIHbw6LM7pZZmVlWZd53A2Jz/v8G40DfbpeqHcF+BkavhKerqEFOEXSITkY4x54MjTkgWkRRAQXjw7G1j/evsdEljdoWTMWjUS2JrsisSS5zWXdP6GZhZLK0jrs2rVitiz86dkeYd8L2xs9rzSREFkwpW/I+/M9Z0E/4rw/Sy6v/5+ipTpIDF5LujWRbQt7PZ5FAoiJLO+jvH0BFxsv+20o3G5MfVOQmnU1IktvTKgDZEpnNMT/keat0zc8DgD4CwAwAACQN3H/s6CuWUlf/+uLutJ8bmGGwTCWCJGlr/NpqY+2kyYvCLaKI+JQ3Vntd9DzwYbTHwb8cjPnQG2z8gEAPR3YWwHCVruv0xsv/A3zoNUMmEZqai+prHzNuAX3j3MbVyvICOlkIZjIdhJAE18XC5HNqb2YueXG3lATq2+O5EzrWa0KkszGtTrC8+nw0F7jzmK9WXNA3T6PtUXbWvOVhZYy9tIKAKRWjrUH7t/Sm59W/pPrsaqf7t9f9s05MUT1g7XS6Mg6d0fVgszq7D8SS5NHMogsNvbie5Dryf8ieVG6IW+vKFRYuhqRpU9eTMIo8erlAU4sglFk/9EdnZb6b1Bep41uq889hClElpYuoQs1FTXr3MIMG7b+/jhrn8tXhYd+A4BEI7+01aXND20zIaH0eNFTZTtFdmcbafVs/2kLF46IPGKhcduhYjGR7RBsHX5JLEQ2v65wx9rr2+briazX4fYZeRGdN/CAS88reIiljSSpNGN7jai/32nIS/72Hun3Od4nN+bXma8Kd7d81xZtI/OVhcxmCSUxQ8tpmuL2+O75Xv+COny8PP9VXvDadT2lWKluhOMMNcLlpTwumXZrY6/q7L8TS5OZEdSEGlvt4O/pqgUFZIHdmrx4OO4t/nQ1IksTSfhbR/fO2c5JdSbmmE5c96ijK0BBVRGqN8cGuEofCaUTM1QLUGMs+De1iLEZei1IX+1zsSQ3HxAA6teykeC2SWgnURO2VhLKeVd7QiuJGDZ1xSsjF+zqipstJrLCznGxEFn5vdubl17dgF7tCrXhoB4+aPCZZTOlOGo/e2+Jo5UDcLd1BU4SB7WjlWOz1MrhrpRwLCEkoIgkCQUAahifGh5YexGAkJEAuCvVDXbK1sZGqZVjvZPE4S+SIH4EanDFWi2p9rBzbiHvkfeG9R0G1YaoMru7JNjCRBZCrBMAR2bjenvpsJkDRxHm8+SST+bbphSfKsxXFngjOtnCTnQ9pXVrIluTfSWxJHmoHl/tQq0vWuQxkaWILJxvQtpBtBv5cMzvHL4Brs1mecyWEbM2TGMvfbU9E3MMONvRqqQAvPbjJnDmxm/M5MxNzCiRXXJidd358lx43c8MuwjzpjwWjJKN7r932nvasIDPpD4XWl5b+R2L14R2myg1ECSEmrCTSFB1g9HugW/uCHl3myUicpllRAAAMJE1F5Lc8hELkW1QNcyI/nsNvD2wiLNybmgJn0oqcQADHbxVUisH64H2PqqB9j6FAx28X/CwcT1HEISo9d25oMWiWtAuYAuXfMycRiWzcVU95By4ZZSzX2JQryCTggVA1bCTVaefK2oq+fRSfaGtoqVan5qamattenYaHVmX7uhHNrM6+2ZiaTI8PNA3ooKTV7RHejqRhQe6tXk7oZGzRdf4bkdkTy5KBp69aPsSAA7mHQMfZ+9mWw3QCWBUtWDJ8dXy8xW5Mk1GbCoAbD7t2BZwpnoDLT3Qqkp49vKQPz5s/KJXRi1M74oSWCbYmMiavhl15g2xEFnYhiWX17cqWqrp0zq8gmJzYdeZ5nbFd9FFn14PmmQ2rvYBUv/msb0eOBvQy+9fToST9lDclRrJIpFF1cGEMvZjE17Qdg3tbtQg+UP1LpWtjUCphvFNdKImwv/b2UaIrW+6tUS2OrsksTTZExNZcYw6hMhatELdjsjunv0RCPIdpQUV+p6d+sU8oFQ3oCFkmaCzqgWgiZacWF14vjx3MHKlwaZvi15poos3cwPXp6urWDB6zjOLHpzXrQxRMJEVdo6LichuvrGbPFtLRe606Ild2B7gXBoTE9SAtSHEZWxDiNu4Z0Y6Dml3pcS5BAsk1EhkxUr60LUXxZ9Nv5VOq2+9tgC6xovs5kS2TENkaSCwRNb4kOAtRRpJWqXkxVI2QpZ8uh2R3RC2GkwNgBHT2p71370PjudpotRKCCCxtwISG+gy4B8tCAKA+rMLM5wNdcSrP2zKPXPj1/sZofHoV3R0svTkQ6kfMNyz0MRXFeQ5at2nk//zfnfUn8NEVtgpLiYie/x2Frmv/Ah92yB6aZYAPYWSVbo4fSSfWjMCpP62y73njehn55onQP06XQQikUVJhsUsy1kaxEZMdYzEEK8x9OtsRFdMbdI2s1sT2apseWJZMn0zSh+WLCXl7/F+ZKHKzaw2ImvRtb3bE9mFqavA+VsXddcyCQEIawJIbCRqQACJp3O/6uPRX7oZWsE3nPno7ImrP41GdGRhclQCi/5NW0vTV6p01vT/2k53tpUeXPPAwoVPjXpK2ekdRKQZYCIrbMeIicgWN5a+sKpwM9TtocNKW2zTEbYXDJbGND7lJK2e7f70yQiP8Oli15dHdGSZRNZSfc+U2qHrM1PNA3Ycqv/K9O2NtsGi0kB9I0xDZGFkry7hntGUeZlZnV2ZWJrc15R3+Ezb03VkIbYzc2NovX5LzW/K5Vy3MvZaPP45AH/oZ/LuKFBeq1fVjFqIpgY+pdgYtvofxVqWkb/hzEfHTlz9CcYUZjuhoyd8fVdXNPGlF8nq+UHPPbh09ByjART4nIhC5I2JrBAo/1OGmIgsSZJBrxZuOVfcVCrKTV/YnqFKM0TuaFKFSv9Q/9K2fvbezWsGLB4ns+3zhwXqzqnIJZfXNypaqumw4PAdi21wmgobk5yySckhgYVtYDPu5YSDpRJ1cyJblVia7GopbJnlHg6MtyUIokUs9bFEPTRE1qJzvMsQ2ccSppF1Tcb97jKJ7OOJ04GB9zRE9snyjWFrvAwNgg1nPtp84upP0JUQusmgp3X0c+Y1FCqBaXrQK/DZnZM/OGGJQWeJMjGRFRb1N30X+Qe5jLgmbKn6S0uVp5OpigxjZEIs1eW7HkxprCFy2y4YCrwFktm4St4dFufmJkKJG7xqXHolTq1oqWbDUQyHGTbXiXRd6fqhuIuhziaNyW5OZGsSS5NhhE1R9AsmspREFkZSZa5jJo3ZzibuMkQ2fNdc0oBkVYsDk8iO+fAJQxhRkyHE/5Hyj2dsNEhkN/68dcnxKz9u10gX2KyOmeW0MxTwdPLY/nLk8y+FEqEWV47u7MAx5X1MZE1Bq/Npl/tG+k90eUQ0RLa+uf6BpYUb/4CW4PjRWfCZupr6Nud23k8CpP5NG/1iXQmCEBWoJElKll6Ja9EQWYv6ljQw1phScVrVi+2wZczQSxSECm0rJrLCrTKYyGqJrEXnQbcjslMDnwIbnn5NO5INEFntohXkO+rGnsitAw0N/13nDzwJ7GMAACAASURBVKzYe+Grbcg1GU1m2SQsOldVvWylf0aNiHhy/piISuGmmHhKwkRW2L4QG5GFUroTVaeb95UfoYOVoHOHvpIyRhiEBVG8pWnXrRc8Z96Y2jfU4LpliWYgLtfo4jnpAFuirt2xzG5t7FWdXZdYmoz6c7fouoGJrI5E1mLTqdsRWVQiW3a3AkzZE20U3CDfUaV7Irf6GEq4+0Lymj3nkzbT0Xn0eC9gnuhvR46c8ciq4EVXjVaiGycQC5H1s/cGHw15nbegHTNzY6BjaFQ30CK9KjYiC0EgSdJqXXF8fb6yEG5C8KFP8FANB5JZiBsmPMZHDI2bWmrlINkxeN0oJzunv4y/JlwKZL5r62rpyD/Ctd7yJXVzIot1ZC0/xHRqgKgWWKxmmMgCAP3O3t4TudXdUC+s//H9o8f//nE6YSUBEmsCAAnFh3QMMTTvw8/UYzxHRO2a8j6MatTjH7EQWXMPdmbHzsyNgde8NFGzWL+LkchCMO6QTYNfv/KfPE1UpC5nRGOxDm1fsPYWKEIWdjvSI9zg2iV0vVnmu0WvHYVuv6XL6+ZEFvVawDwoCQ49lshiiaxJg64jOrJ6JLLtFtWh7oPrU/+9W68fWXg1ujBlVcX5kovQf50KkliJnQRI7KzgZozqr4EhffxXJs+K/7Q7ROQyqYMMJO5BRBa6ULN45CqxElk4RCqaKp+Ju554SENmUUtXLr6YzTUku3I+9OGZwktq5QB2+ceNc7R1zBFLo5ZcXg91ZFEXVpjICtg53ZzI0hJZ9PbTYuMLE1lMZE2a2gtSXiHb+YNlyeHV0GVg7oMzqW84EFlqAnj18mg6ufgrB30Voohs6qra87cuOumkkRAqiZ2VhLAC6l6OzrWzAyb1Wxy0uEe74mDDsAcRWSyR5TCry5tvP/S1/LuzWXdymGGd4dsWdePCofqWTsL0XW29ceCKFYHOw6AhqiieeZdWtypbG1FDL+yxQsCegeF2dwyLg35kjbv5EbBe5igqszr7emJp8gCWvCxCZjGRxUTWpHHNlchunbYRhAwZz5XIUum8enk0n1z8lZ0hIjt5d1RTea2c1n+EUhH4wP+pzTgpPN4uICCA/tyktnX3xD2ByEJr7Vl5sZDIYh1ZDgOaJEm3rJqckjRFBlC0VNPqGBY13OBQbbEkQR36gyluIXnzvWaNEEPlNJF+aNUH2hsAXTWLkA0x4CJkHbozkc25ezF5y829czGRFXJEGS4L68ia0BcLUl5pPX/rolFpze7ZH0GdV0NEtl2pXr08VCcXf2VjiMjO2b9YfUVxjSlZ0Oro/PHaKSsTmtOjks67tJoUg+slPnVks8gs64S8I5DIoleqFulnMasWMAEhSXJK1p2cz9LkGX0VLdVG57dFABVfoSghbPaz97bl04jRlOZDoz4kZCXuT1PAM1NamY2rasewOBeCILpdtMi8usLIdde3HWQJLALRE3y8YYkslsiaNG1fPrau9XTB/4wO1DMxx4CzXZsGAFevBcaILMxrQcorLedvXWSSFO2G8sdrp3izhjcJKBEmFsOJDcLCJ5FNI/NtU/J2wo0DE1kTxyCU4kGby3xl4eGsmhzffGUBlNKamEuPSY6SWK0E+3BgvI0YQtdqbiagehXqVg12jsXnRU8ZId2ZyF6qKwx8+/q2XCPegwTrakxkMZE1abCty9jSejzvB4Nxrp3tnJp+jv1Gq+t6667C/5ndc/42tohyUS1YmLpKpZEIM6/HqP8xkdXfnT2ByB4v+91xX9WXNVi1wKRp3S4xSZJQNWNKcVPp1utNJQOuN5aqiptKrK83lqqVakrvEjWuRK+uhVRLQNcAS1yXtyt/+/B1oZ427qc7h37n39YQWRh7nelfW6j+MRQiHG0gm96uvn5l9jGzLUK1jVMHaYy9pARBQIPAbvX8XXtt6Fs3PrnCEtnLIn2AiSwmsiZNMITIosYOdOABatEM8h2VsSdy63Q6Y3jNNebDJ2B6Ngfs2vJNJLKsiyEmspjI7qv68q6xQ5NJg76DibuSagGXJsJ5DADoLW+pHlrVXP1SfWvDuOKm0gENrY2qenWDurK5mtJLVrY2qhvaoodJoCqLUm1y0Ct9pFSfShFafXRd4tKszqRh1rN546DYbwKlQyI6k6k53tWoFsD1lhY6WJrow2bRdaDJDlvoX/pQBH/DdExd93aRGpFDFQ2dJdrartu6M5HNbSj0XX9t23WkTy05zgAmspjImrRuPv7OFLJOpQSkDQGALXWL3+4EtnTcc8MWPfq8TvCB0R9MpK+59KoldJLIUvliItuziez3FReluyr31lpCT4uJfHcjsqYsFBo1BfoVWt2HqfZDxwanfwOCILR/o+Uh+RGHACB61//qduXO9Unnai/uVqoboas1S7oNg0ZflKHcCp+5pyb0edhgPG5TcOxoWhbVApQ0Ckn06DDgUKWBwkkqcQADHb3T/e08lz7n+ewtfX2OCEKIDQAQg+Q/ONwDd2W3790ZrGiufudGU+mDSIAHWmVC2xcdxc5c72mIrFN31JG9pLzk+XbRjhI966yQ44vqLkxkMZE1ad6OeTvkn41GAgBpJwHABjQDgqAjAqmTno93D5AF6LgcGf3BRHjd62KoMGNEFr6rMTajs2kXQ/yNAYutIyIi4JUafhgI9ATVAkxke96w/8/NXS+fu5u3VXOopiV6RvX4zYSUzkE+xicqK7TPuAlmyrvD2SCqBbQkFP5GVUI6nDfHF9tJVGU2rren9Hti6BSXR+FeYLYnviCp1+mmnN8BAEMYOptmK6MjGWmIrHN3dL91WXnZ682i7aUILlqDa81nQs0/TGQ1gIthfze3/QtvBk8IkVUBQEoAINoWR2vCmr7E2h31gUvQ4CB4vat9Rn8wsRIA0NfIgtD8x2unDLrf0ujIokQWzVK99V9vS0P9QuGpHD89l8jewaoFPWf4Q2nt0isbbihaqnzZboh4RkLH6OuFfrMuTXUPaXPXYsGHJEn7WXmxVRpJMV1HoYmsVtAQ7Dwyfc3AhZP5hGTJlbgPFc1Vq/gsw5S8Ne63oNeCOlPe6wpp/2y44r3xWuJNRCIOqy0oeUVxwhJZLJE1ad7oSGTb3kQkEiSlKxv9fxHDXnl6eSGDyMoBAK4agqHv6sEgkYX5GXH/1bz5ydWuT416qtu5OzGpk/QkFsOJDVbN3Kc2tLkaiSwmsuYYMF0oj1R5xlOpivTvNFUW+npZe20fIQv/NdIj7BFLQ1fZXPng4isboZSS7RHq6pfSaZbZulXuHBbXj29M4IHmub/X3FC2NsIDjcUfDZHtQxAEVHXqVo+GyEIdWUheDRp/C9FwTGQxkTVpnP1DZEmN4QWUyMK/Kcks9Xj17nfmxGspIQwiC09v9ALTGSLbeP7WRdpxOyxC50rjjUc2OUWMH2+ydYlJIHTRxD2IyGId2S46Rjta7aJ6ucerxe9UdPT9Dr6H6n9SWUTIwq5GeoQP62B+ZntNfu/2jKVXNxwBAEAVL6j2BddnIV1vadf4CS7B61f4Rm80W+MMZHSwImPiocr0n4Qoy1gZGiLrShCEzu2ksfe6wvcMiSxaZaEOSTowYSIrDiILO+XIiASzaQSYLSPmpDIskf1HOnvhndM6dRj9wUToqmMoi7sOtAijEtmXj627e7rgf3SIWqYbIMm701fZhw8Jv9cVFgOh69iDiKwoQkL2ZGMvoce2xkofHmDgIVfoK06tp4QIWdiNSI/wgUK3n1keQmSZJIPNEwCf1VWvHrhg9jjnUV/zWQid903lTa+Xij64ZYEx0K553ZnIanRkaZzZXKgJ0d3aMjCRxUTWpAHXRmR1JbBsGTCJbPiuud+W18rDGKoFzNOb2lhkrnXpWyqO5//ggZSpk8eS0C22i4OCoIcE/DAQ6AlENktxtl+C/AA0QhCazLQbb5jICjsF511aXaFsbYRrg0WkQrC1kMjOloX5GbPE5xsZ+b3b05de3XBUU44+v6x8VkPrZ3iT/0t+AQ6D4Y0c708FWSFdlveuKA6yGmMvKJE1q3Eb7yByKIDFa4HF5hysLiaymMhyGLb/JGGRyLK+zySyBy98HfT+qR3nGFalHSGyucfzfwhkKZQ6Fb4RvtghIiAC6qzhpwcS2eOVWSH7Ko5kiaHzF8im+4d7TLwmhrr0hDosuRxXomip8rZkW0VKZC0BiXZt3+IV23uI2xBB9EQryUrnxXkbb4shIIqGyPYlCAIa3XWrR+NHFh5OUK8d7VRthGo0JrKYyJo01jpKZKEV7aqv197NKvrVGki0+rQmE9n1Ge8f+Dbv+7mItaSOovm701c5YtUC9i7tCRLZgxUZLx+qTP9QDBLZCFmYf6RHOCayJq0wHU+85HJcmaKlyrPjOXT+TbEQ2Yp71XOWXV2/H9GLtYRUljKCe9N3kX+QywhB5gFCsDrfmWbI4XBgfD+CIKChc7d68uuL+60t3lqONAqOL9r1neBtxUQWE1mTBt2Yt0Pgtb1RowGmRPbAfw89+vF323+m1BKsJRJNQAUmkVX98dopG0MV2vnfL97Y9duB9zRp2l1nbA162yY0NJQ+GZrUtu6euCcQ2VR5+sZURcZbYiCyWCIr7Ixacnm9XNFSLRO2VN3SRENkm6peXlYQB33r0o8lQodSRDbGO2pFqOu47UL0S+adsxMTbx34QQzzH7b3cGC8N0EQZUK0XcgyGH5kmWNLcDUDTGQxkTVp/HeUyC7a+1LK79f/nN1WmEbHVkKqSVsrCbAGakAAibO9k+rnld8aJLK7fv1i0c7/HdjFOAlq/RVeePUniaX100wCVMDEYiGyUisHcOD+93kxSEyVp3+Qqsh4VUBY9RYlRh1Z6KKosbUxMrs2d+/1pluO9epGoAknCxytHICTxEHlaOVoLbNxU8lsXZtJAIqkVo7ZUmuHqyRQ291uqglSqpseUbY2uCjVSomytZ3LZjXsXz8Hn12ejv5vugnoekhDZKGvaovpR4uFyObVF25ZV7xtNXL1KzS50JKb+V4zP5ziFvqaEHNSM/9f4iJsEaA+6sOB8QMIgoARsLrVc7H28rANN7ZfNqIqKFibMZHFRNakwdZR1YI52xcevVJ+9RnUTZeu0Ripnjr6adWGWW/oDYgAK5r0++E3Psr6FLpyoaXCqPstCQ5Rq787xUJkYQ3N6aIDbfFBefqOQ4qMRZYkM3R9xEZkFfeqZn9efjjlbF0urKK+q+Z26j4sV4bGSJH2mjG0z1j5dO8QP1/Cl3eXeFgi+89MyFMWJK4ril+uJ0CEsf4zaU8wljhCFvZ+pEf4GmPpzPH9Z2WH/z5ZdXq4OfIyQx6QyPYnCAKNgGWGbC2fRX5dQcDa6/F/Mg4MWu8dQtcQE1lMZE0acx0lslM+jPyp7E7FRA151ejS6Ho/eHDgqOY9C7YZJLIL97+c+futi6FtXhGJdm4/MJHt2UQ2RZH+cZo8Y4UYJDJiIrKV96qj1hZvS1K0VMMBonXgryE68DNUXQjOK6abpo642KECpEA3RO/6xY5ys3O7ZNJiY2LiJVfiKhTNVahHExNz6HxysUhkc5VX49cXJSzVMw+EIrLUOIvwCPskUhb+cufRNZ5DQklSVVZNTi8xzH9Y2+6qWpCrvBa0vuiT3xAvRLC5FrsJwUQWE1njq4MmBbyWfHBtKL3JGdSTZerITv0gMqP0bvmTuhJZ3aK9XPqpTryaYlC1IDx+Tkv5nYq2sgmgBtaEBFhTt9TURmvMfRfnxnbDhD1BIpsqz1ifqkiPE0P3iYXIkiRps+XmnuaztbmoQUZHiCkNKxcipHW/BDe4AKl//aZBK5357BdxENmniyM9Jg/is51c8s6rL/h4XXE8eqDj0mdcsjY5TYQs7KNIj3BB1H3WFm2ry1cW0n7GTa6ruV/otkS2oXDG+mvbYMANppGXJXSxsfstgIks57mLEFkj75DqC++csUITTfkw8n9ldyrGs1x1aQe+s71T05m3Tzjoy5wkScmYTRNoH7H/nP4gjyXaVC7/eDuTF91LziCJOGFPILIpFScXpFV+t0cM3SAWIptXf/WLdcUJzzOi4AkpPaFI8+HAeBuC0N6imL2LllyOu65oqYLRA4Vqm45aE8Q3QhZWHOkR7m/2xpmYYX791Q/WFifQ5JHpIsmosa6JxRlMLjCRbclXFjLDppqzOSbldTgw3qc7qhbkKQsPryvaNkXj5oyeBzqHV5OA6lhi7eEMS2R1iKwQh1a0DHR9UR8ZkaDD/TrWtW1v8ULmOkNkx7wdAq8hHtBE3lEBQEoY0lkKDKYkFwVBQ2RbDQHzx7osXtremc4Qy7siIrJmHewovqny9OmpiozDApIZvd0rFiKbcOtAS9adszR5QdUK+B6aOgvc4cB4az4NMZdcXn9R0VI9kqE6wWcb220YEbKwgkiPcBjB0KJPbn3Bh+uL4+F1vtYQVlMhITY5uu1UWS94znp/at8QQXRk1xZtg0RWUKJuqKO7K5HNrM6uTCxNhoaV6M0Ok9DyOQd0JL89ncj+St5y+DDvfRgIRKO2ySf02rxRnWhYLrT8dTSn/QsvZK6NyIaoDKkHtDWxvUR2zNqQvwEJDCjht+nLYiLL3wAUC5GV2biqdg7fYFCFpKMonKg8Hfp5xWHofsfim5lYiOySy+tJhm4sXHBgKFe+H3qzgb+bjoxI4FW1YFXB5jPFTaVjBWobxI6NyF6K9AgP4BtYY/lrdGRjWMir4ER2uc/cDRP7PCyIug8mssZGhnm+z6zOJhNLk9l06c1TgPFc0NsQaFTnSBBEj43o+XfttaFv3fjkbwEFOOg6oqNe0oWILBxl2qAGjCEHCSkATNWCMW+HXAeA9AWAulpESYbOtdeFd07rJTh6VQuQGmCJrP4VoCcQ2cyqswGJZQfyjK+D/KcQA5G93lA6/pVrm39BFjghiYwOYTbnAsfWe2uLtv2QryycaKHFnCK2Ee7hf0T2Cwvif3QZLiGzOntnYmnyYpZUQuowUmWt8Il+ZUKf4I+FwERsRDYpcIuvI+HY7dxvZVZn30ssTYZdaqvpV1Q6J9QY05LZw4Hx9j2ZyObXXnl07Y3E03oCRfE19VBBhZbTvTNw5Yj7nf3NsgfzLJE1RGTbS2TfOvaOb8bvP10FgLQ15H4LklxjRHZywtzW8jsVejdjTGR7NpFNk2c8nKJI/xlLZNvGQc7di4Vbbu4djFy3N8DrH75WNiRfeo7SqgxQasKrasHa4m0n8+sLw9kkpTy2V0cyESELz470CHuEx/I4ZX2qJmfP9pKkBSyJhTzIUGWt6b/g+eDeo2CUMd6ftUXbWjU6sryXxaWAPYPjfN0c3bojkW1NLE2mddGZ6gUQGiH01LWEuaerFuTWFc5ef31bih53e1yGakfSMA8s1Fq/0W/lwUAnfxh9tdMPz0RWnzSWrjep9ujVb2iw+32lpWTNE+eLLh5HWoTEY0bdb3FSLbCanDBXVX6nQi9AmMiKn8jCyaZZeMhOj3RGBgklBzZm1Zxda+58O5KfpSWy8AbjRNVp5b7yI1Bqgm4sQqkW0LBRC957/Zb3Gu4+vK4jWHJ5Z1XB5uziptIHLXmIWeET9fOEPuMe51JfPtMgRFZI4spsElX2hkExU0ZIh57ks7103pjICoEyAJnV2TSRZXotEHq8UeVpDskG7WeEQcYypeTXFxxYWxwfLSCR1QoomIeWFb5R2RNcxj1sDiR4JLKU+y2uD3PD1HPloCW0pRfeOe2jL3OSJDGR5Yo8SzqxqBZAidmb3kv8glwDbnaiOayvLrkS94OiuUrI62W9TdjgG+s/wmWIIDHm2SpBkqRtqiLjbpoig9aHhYsP5YHZ3Liz5NduQwuQ+r+2adDKD/komyRJ65l5sVUEANCHqNCbqbZJMT5RWaF9xk3go42m5JlZnb07sTR5IfKOxTDZNOClRwN6Df6vKfXvaFpMZDuKnGnvpcjTW9MUGUypKy2kEtJrBEWkNwUukQYQAXB965FPZnV2XWJpMu12TkiDXnRd0agSRd2a0Gdcf3N0hFiIrKYt7SWvuicHshkAwjZo4KjU3Qu2RXIgsnp1cLBEVv/wERGRBTJrtz923hc3xhyDnc7jYHnGwEO304vNmWdn8toy5DX/Ifb9LUlkbVIVGdVpigxL+NVEjTFoy3kQ4f70zMh+k7/pDK5s78bfTJp/+m4ODF0t5CaKVoU64G/yiz0V4DTkSXO3z9T8WIisjgcJga5+qWpvGrwiOMBx2FlT29CR9AklSa1ZNTlCXGtzql53VS1IkaeTaYoMiAFznsPPhNKR1ZazxSu29xC3IbWcOqUbJsqszlYmlibDmzchhBQ0gkxpPDUeVvhENU3oM05qDph5JLJcvBZom6AZaG0GYG0PrZbQRl7Rxm6Y+foDU8c8fVEfAPCqdOH+l1vO37iILlQ6lpOYyOofPoj1Orr4wBcssvDLbNwKlg6bMXoUMUrZ2UH/eenhJ05Un4YrK5zIQi2k6I0DOqmp8pMCt/R3JBxvdbZtnXk/szq7KLE0eQDSx0KpFbARWTjOmkL7PPTNCu95c8zliuvzsq+jT1Sdgb6DhfDEwOwOHR3ZTQNjNwc4D3mrM31mjnePV2bt2VdxZL6FjPzQjQ68Mzj2kfsdh2Sbo13G8kgoSbqXVZOjs68Ye4fP73sAkeUTPkN56+xhawa8OC241wMnLFUZS5d7/HYWua8cxqew/POC50wwtW+oWTioWTJhg2TM24+3Gne/Bd+kiSqbNJb+jPpNeTHwcun3+YlXU1401A0aIntPQ2TZFM1Vf6zL4sWtk+WHR+drsPnGbvJsba6hawdUab/zBXLMIUDqfypIGhA1zeMJOcdXAHQFd/rOn71z6/P2navNfVqpboQkRsgrFbSq7cihn703+NB/DQwAQF+3cW2aWdMVNd2KebXg/U8QyYnQhxYaG5Tow35SB0j9f7nfYeiiyH5P3zCV1P5cd8H9z7v5n527mztZqW6k1hANcFRYXAEOZ6jzd7rPoK4edAPUaNZO7EBmKRXpn6dVZrzAIjETSsVAq0O3aXDM+ADHoTkdaIbJr2AiazJkHXoBkch26H0zv9S8wjfqpwku4yabOd8uk52Y+iNCFgYiPcLNwkHNkknniCz1NiIZQwktRXQ1pImQeLn0237i1RQYTtHgA3VkF+5/uen8jYtwo2JdkLFEVj+EJ26fzv+8/PD9mhRCbWjGuhV+jxLoZqnEwVZq5QDcbV113q1srqb+1/hEpQkSU/oqFBmn8WO6IKEIW6hL8K0Y32iLhyqFeM27tLpV2dpIE1ihyD6bVBx10UP3O10v2J8STd+z1lHZ2giU6nYcEU1rqTFNlQsPLx8NeZ23tZfLRKLTHJSfPHBI8R00/mA+Qt1WaIn+poErJwU4+2eaUv+OphURkaXGxJbBa3yHOPp0O68FCSVJZFaNIGcTfUNBx93XCp8o9YQ+4+w6Om66+nuYyJrYg2PeDjHF0hzd5GFJkIA2/eOGi2wIGvjAK7sXbIO6bUYfaNAxOWFuY/mdCjY9EKosTGT1w1jf0jRpacG6E8rWRnj1ZqlNn65gOyXxDtaJXtBQqZzRsWTmBO2wXOYdNeoJ13F/mbmcDmWXUJLUqNl06Kt3IfoeLYNJNum+Yh4GmOTWUHuZpJh5IOoQVia+hEqbJWN7jSx/fcBCLxPz4CV5SkV6SlplxmwLEllt0RsHrVwcKPXfzUtDGZmmyNMbEeNGIYrUVwY1ttcPjvUd5TgEE1nz9wR6IwKjxzVM7RtiFr1M81eV/xw/KztMnqyCbmQt/4T0CQaxPtFmOdCbJRM2SEwjsu2ksFq9WGd7J8Xsx+cMX/ZoVA1X6EmStJmcMLcBIbLtdD0xkTWMZmpF+s3UygwYjx4llPTfqLqGEFfQTJ+mtDSVKyllXukLpf+JEi6mGxK1zMZVvWNYnIwgCM5jm+sc6Ei6vPorW9cVJ8JwpWifC9G/hqR/bFJX+jOu/ch2GEL7piNwmfKODhFf7h0dM9E1ONGUDPhKm6JI/zZNngGvWpkhaoWSyGpvRlb3X7hpXO+R6/hqK5qviIgsVa11g1f4POA4rFSItgtZxtqibWS+slDIIvWVRY2zCFmYxFzX2WJolKl1EIGEXFvlLkJkuerIwnZpiSyqYlD7kN/Ix3a9mKDXqEtfJ5IkaTdm0wRIfpiES7uh7Qn/wDYoKKjHhqozNgFqWxrGLy+I+x+8pjXwCCGxY1MJYBrxGaojnZYmw2h+Ql2fs5YT6hJ8KcY32uJhSmnwSJKUriuOv4PEoBeif2HxTHxoPVn4HX2rgqqC0N9zsbxl5i0UQWOOSS2W+4e//4STjcMpY3NQiO8/Kzv8y8mq0+MF0BU2RDAoEr3CN2rLBJdxbwrR7hR5+r00RYZYjL1U6wavGIiJLG89T8/55iluIbbzvWbxJsDjrQVmylhj/2Km3DqXTXcjsu02lgf9Rk3b8+K2bzsKU1lZmePkvVHQwp25EdObIXgj/E3XiKBJdztaRk9478TtrB8+Lz8CnbaLYcFHpbK0oQ7sBi4SQ+1CRreFBKBW40tUiK5Ey6cMjGQ2rs3vDot1dyPcROUKpqKpesprRZuPGznA8IGZdm4y+hSVZjJdZplyEBEDoYU60eUxvtF6fWDzAayhPBNKDhRm1ZyFEd0s/ahe8Jy5d2rf0KVCVERsRPZd/2VD7nO477oQbReyDJFIZLU8IKRPcFOsT7SDkBiIqSyR9AcFSYDUH2watNIshwqzZMLWUSaqFlCqBE720m/OvHVihqmWyczy/3v5v84xaWshQUCJrI56wbvTXhsQPiq82+kkmXPSkCTpuK/8SOmJqtMwVClbrGxzFmdMYtPRstj8YjINrzqaN5f3mIcpquwXPWeumNw3dDuXDIROk1mT/UdiSfIDHdRFNrW6OjpsmpdR6Sv8CFUhMIW8mloXvtJr67xz2MbRMts+f/JVkKn5JpQkh9TZqgAAEk5JREFUVWXV5EBrSX1rJZeDoqnFMtNTYyCkT3BWrE+0IEEiREZkwaaBsQEBzkMudRZIsb2PuHK0ZNW0NzjmlAJaskEdLVtMqgWiJ7LQ5dGDa0NRqRkb7poNjFQ72ztfmzUmMig2PNos0qm132xZceLidwnIlWU7acymaa+PnjLqqbyODoie8h5Jkg+tK47P1sQlZ9M11Hf1z+VamksaS0PNJtVni1Sjz0NGO4Iwxe3xP+d7/Wu0pRumr3xoLJmmyLibqsiABxi2h00VgIkJk4yKtbmdrRfdv0x93Xbj5ln3sF/m9AsP6WyB5nw/oSSpJqsmBwbCYFPhgEWhAgB9456uEpe5orf6Y3uNrH99wEJnc7ZPX14a621m23R0mRleUphZGVq72MY+24Fam+cKr3mBE9zG5gvRdiHL0BBZJq6wCkIfSCn8zUmehMTRXGV9Vna45WTVaXSv0nfjxaaCZWxNZxvjbJwBNkc1xS3E2lxqHrxIZG/duuUwbde8BtR1lqYjkMWeIrClc4Onjlg8abFZrvi3n/ncN+2XI+dqW+rdgBXVNFSHjvJJqbm2tF09KdZvzsMzut1VjrkGPJpPnaph9vri+K+uN5XCjYxtgMN+hRJb2mAE4oxujGy+fPmoKt956rv+Zm7kMB0cb+0c74e4BJ+L8YkK7uytA98NhS7sUhUZ19IUGd4GosDQ8xndlITeoPiGgkv+9QAASAbZpO/U+zIbV+sdw+JE4TsWbZBGtcBP8xlKVPW5QGNuZuY4jFJjRmbjCnYO38DLnsTsxBR5ep0mkp2+2xk2VRRUtYWt3WwbvSF8YNnUPrV68ALfcY6jut0N4aqCzWRxUymTzMD/hVJX0yl7bK+R4PUBC3usD/nM6ux7mshe+g6pXP1r01Juemox7RXYBFzwM9oTEljhE1U+oc84s6hZ8bJoVFVV9Zr08UyNJTaM0NUuOlf91DFPh22Y+bpZ4mqnX0z32XJ8R3JdU+3/taFKSEgboh4Q1OYCH3qj0a5ny8bP7bfwiYWcHetz2c26cxqlqnH+2uJtn11vogxraQJD+fREBifUY6Ux17eAm2PjExPUbFfj9CIBf2vJ/RS3kLMveM78P7GTWBpceLOSdSfn533lR8YrW7XBBPQRVYgD/I6W4lrKqMrSY4MZxQ3qQ6vX+8WO9LRzE53E7fOyrw+fqPr/9s49OqrijuNz98U+siHskoWQtCSWqBDkISkvQbNibQkCBSQgRZHwsEgVBc4R7UFRS49oVShwePooeLSk1fpAQz1oyFF7CAVRZMGQYFIIgWzCEpLsg83m3p7Z3LtMll1Iwt4lyX7vH4TAvXNnPjN35ju/+c38CqeK0K41CaHfLjsYsRPW1nC/qtBL1Sa7XktfEZWjkT6pLqh+69wHPcVMs22VFfD079cSXdcSqlIEQakfYAd86Vnv879Y0u82fb8bGt2vNRXY1nveqHz/0qfn99GyhxI6kQgTzRoXQmWPPY2Dn5s0lZ/Y0xqzQrZeqE989PiLp5xN/sBAwVeoiXhrNtSy6YQSsKH6Ce/GW54bm6TpGZGQ1LII2dMXT5smv/IgFYlMGNDmkwluTxu0alvuuhciMZgfrDyof+XDzetKKksfDmk1UhIiKDgf4fz5kCqJDjSqp1cu0uZwOU1t/TBj+X5BEEYV1BbtzqvKN9kbHeGECjtTCxuQQuTYGURtuMFXEqmSaJU6TGmgl/6dNyh0qpm9x6+aYLY+3xnbj/2S46k1p7a+VOY5w9a5/ztivnFaNKnTa+2xWJ0RR7jOP1TABT5Nm+xdlrLwlj4606mOWFhbw4k3VpatpyFq2SsgsMSJmGSpDbUiE05ItNa3VnqXy5owYs9jP5s9LRqcbA3F41aWbficeRcbcIMO8sF9k9SvseKrNZO1UP0HfW3gWRrUZUf/NfQYvupolD2a7zjacOLbZ8vW3yb2DTdy5cbfJ20YuDqxDxdfE00GHe1du6o+a9plz6ftmNYHvdj9L9KYzYrPUKsw0vgnTW5DRUlkjTwSBv97cyzjNZE8Bk0WIXvS4eg+/bUpjuawsoKCCtg+Cb1L1oxfOTAjI0OC1+76PXjwoHrr9ztXHSz7bkXLMLiCixBO3+I4L46oBKXAE4W/n/L/MXHwr7e9MHnFwnZnIIYfpFY6Qsj9BbVFbxdcKFLZnKXSUoEk4ELNyFhiwUdntXbA60jUg5ddg8+I9efVoNARa48RR6ck3T22B9ejtiMVoK15EQShX0FtkS2vKl9jb3S01tremoG+rVnpiPeH9CebYM4qzU2aOqQjhKINB00QhD7LStecKW+epLDfYvB3KvWf0nJ4eyyVrOi94rvfdPNz03p16xmVQPCCIPReVLzqrBj9TxKW9CdjfAmI2XD7ACSswWL+apZqdpLnZxlJX8GO9nHQcPF59nwqnAJuFKKIZydHcmY7UHc5lvENM3tlR8UHW84CXW/agiAkb6h4p7yg9gAbrjuUq8fV+u9wEzQ2e8HjpD+9+8xZZG7S1ESO4yI2oZBFyNLGm7V6orve06AxauMcC7MefvB3Y+7/LAIVwD33wcu5uw/nb788o70cwrY5/ZAhbn1Gg1EjKLkv5oyeP2XemMn115uXWH+e+lASQsbbvY41efb8VJuzRC8OCuF8ziiy1jT+joz2avkPWLEMCp1iYs+7Pp5uyX6I4zh6DFyXuQRB+ENBbdHqvKr8eHujI/hsXpZPrIhYtm79bYBuKHmgd/aoAfr0/Z2h4u2emseeLV//V0bUSdlmB6JQkxdJnEj3t3UZMiAEc5OmbLyv592PR5OXraH46ZVlG/7MvDP4+w7Vhlkfwmu5FUhWr2ALr2TF0mQY+vEvpD2u5jhq9OmalyAI2jx7fv0uez5tH9dyX2krhGtxo3XgyrGM18+wjKecg9tsW9/XJe6nE7k8e/5ZGslR/O7ZFetgtwOJsXQPOwlljTiUDevK0YIV7RdnJGZvH2hMXxBpiLIIWZrJgmNfLa68cK7HrNH3vxSJxrN5799Gvbf/H3vrPfUqelRX0JE8IcSTUEcIF0/zcnva4Fe35a59muM4BECIdAuiUwdBoH6xM2zOkscP1P1w61FnCSn3nKF1JPmYhVp2kCEnsiTJDlbBA1dged2iNrmGxw/6aUT32zYM0Kdv5ziuy7qt0IkqIWR+QW3RpgN1R/gDdT+wA1QsuRVIkzO/BS7D0M87IzF76UBjeoc8Vu1qX8dZd7X1nzX//tLmLHHZGx10IAsekNhlyOBIe8FiXhr4riZsqcsNb+0x3DXOfMeovt2SbsjRU3aPI3t95c6PbM5S2lfRckvinXURao14DdXXBfcXAYZ0Y9t9iVmfTjBlTe7KfYXUMOhKXvUlx9aihiPzD9QdIeXuM8TJu2Wd7KZqk8mI+EENVkNmuiXOck6W0aETJyqurn5RUFs02NZQairzVNBxW2qzIVeZglZt2O+CtbjT1UhfosakStUlu9K0KfoMQ/qcm3QpO+TCJZuQjVSG39mfN2Db3h2F9Z4G6pjvk1wVxPRZ2OIAetkia9TGHVlwz8yxs0dG5livSJWpK6cjWmp7VV86P6XMW5llayj5ZZnntK7cXRnv5N3SyQadFYF/gKaDUKouua6X2nxhQFx6Xn9j6l+MxFgbiQlbZwMjCEKS3ev4wOYquf1A3RGVraFU4eT90eBiQtBSK8Pw+MF1VnPmzXFcXKffPEpdDcouVU6tuXR+UlWjo6+zydWdI4QXBOLrpTHTpcDPDepuOw28+qw+Xu9ykVT/N6En5Qod0SkrLjhVRpVP7VaRbjXeum5Knuh5QYhXKAQLEQQt4ZU1GqWhJCGh/9kMjrtuN7NIfC+0z7J7L8ws95xZW+Y5bbI3ng+4ScUp9Aq9UucxKPXEqNB9Z9aYNsUR1V6VQXUxhaQIhBC6MqV2E7ehyulIbCDugS6f2+rm3SPrm1wWsc/zT+oNSp3PojZ/kxbfe76Fg7CKRN0hjcgTKBAEVTdSodacreIuaIlaq3ArnJySMwhNtL0TD6/jea/ap3E7mlJSU4SL5CKfyd3YKKkdVsjSjVxb8nfuPlT2vfVyVbU4/SDICsu6FAh8ZuqQ5VvmrV0biU1lkW8qsZWiOPNTV5NqU42rbuRJ1+kJTt49vNxTcRPdPelscqtcTW52iUNaopAsXuH8aK/wuaMik70SNS1/p/9HN1folVcEdwlYT+IUep9eqaPty9tLbf5Jp9TtTlQlfJSgN5wwEZM/YhzaVcs2LNZxX0LIRpuz9N4yT4XP5izR2r0OXjzpojP6RrdwlaBHaKXqknmL2swP7z5oS4o+cWUClyCezhJb3zRKCwIgAAIdhUCHE7J02XLZuyuf3Xf86z82O977fWB9ze4ErD9ssC8sRSp4jVrj/xbf+dAdOXfmdLkdoB2l0UQjH+LyNW2finJSrqTWHjVRU+sHaSSNTW7ibkolqXT53j9LDPcTgjMatXXlO0RhS5eWU5xNnjHlntNznE2eoWWeCq298by+2uvwT+6rvQ46kaHLjFIiwX6KV/NDbG/hAmnS5W2DUucX2XRyY9GYeL1S541T6F2JGtMli9r890Rtj7fTNCnHaT+E9tRe5HgOBEAABOQh0GGELB34Nn3x9phd+9/fU++p1zafRiCdQuAvvGiB9QtYcVeoZKH1/1Rkpg5+csu8tRsx2MjTWJAqCESLgCiE6evYPorbR/ZxRmIM228NI8OCsyj5KvsnPOgbolWDeA8IgAAIRIfADRey9CitghNf5xaW/2dDpcsuWmCpiJV87ALuBKw/bAtH5OTuvfcszX5kujXDSgMf4AIBEAABEAABEAABEIgBAjdMyBYdLzJv373j40PF340UOSuIkvMSA6ch3RREDDEbtHOu2fIquhxQN4KGWSOmZT3yq7k/xEBdoYggAAIgAAIgAAIgAAIMgagL2W+Pfdt306dvfnOo+HCvsDHclRwhcQpCdArmlAJ2o5fgyuo/dvmrs17cjKVCtGcQAAEQAAEQAAEQiE0CUROyJSUl8S9/uO7HQ8WHk0Kglo7qabmxg4rZOLq/J7Cxy5eZOmTRlnmvv9mVD5COzaaIUoMACIAACIAACIBA2wjILmTppo1Xd63f9e7eXdPZ+NJhsskK2Wa3gniFj+iVZ4alDVm0Nff1PbDAtq2CcTcIgAAIgAAIgAAIdFUCsgrZc+fOWeavXVxVWeMPqnGlSL38b+zh6YHjd/qY+3zy6JRls7NHjqzrqhWAcoEACIAACIAACIAACLSPgGxC9qTD0X3JywtqK2vOhYutHCryTyD04Yx7p9/6VM4Txe0rFp4CARAAARAAARAAARDo6gRkE7JLN66o33f4qzgRoHT6QChRK1lq/ZbYZHPSh0t/s3iG1WqVYvd29TpA+UAABEAABEAABEAABNpBQBYhW1FXYZ60dIadRmViYq4HR+yh2W3hbvD7SfPuWTgpt7Ad5cAjIAACIAACIAACIAACMUZAFiFb+H1h2pPrn/kpxOau4HCT/t8zbxl69IHl04ZaOVhhY6z9obggAAIgAAIgAAIg0G4CsgjZj7/57LFVb61+iYYvF3NGXQrEQAZSqFlCjHqjb9Hkh2+dOW7myXaXAA+CAAiAAAiAAAiAAAjEJAFZhOyXhwpzlm965j1RvEpg2Shdnln35KxYPnPJupikjkKDAAiAAAiAAAiAAAhcNwFZhOyx8mNJs/+0oIIRsoENXcNuHlr9xIRFP8/IyKBWWlwgAAIgAAIgAAIgAAIg0C4CsghZp9OZNHbJvaeYELS+PuYk1SOT50ydOHriv9qVUzwEAiAAAiAAAiAAAiAAAgwBWYSsIAgJs56fe764okRh1Bv5WeOm/3fhpNzRCCuLtgcCIAACIAACIAACIBApAnIJWW7z7je/VvDcj9PH/napyWS6GKkMIx0QAAEQAAEQAAEQAAEQoARkEbJACwIgAAIgAAIgAAIgAAJyE4CQlZsw0gcBEAABEAABEAABEJCFAISsLFiRKAiAAAiAAAiAAAiAgNwEIGTlJoz0QQAEQAAEQAAEQAAEZCEAISsLViQKAiAAAiAAAiAAAiAgNwEIWbkJI30QAAEQAAEQAAEQAAFZCEDIyoIViYIACIAACIAACIAACMhNAEJWbsJIHwRAAARAAARAAARAQBYCELKyYEWiIAACIAACIAACIAACchOAkJWbMNIHARAAARAAARAAARCQhQCErCxYkSgIgAAIgAAIgAAIgIDcBCBk5SaM9EEABEAABEAABEAABGQh8H+/UwpSpGJBLQAAAABJRU5ErkJggg==l5sVUEANCHqNCbqbZJMT5RWaF9xk3go42m5JlZnb07sTR5IfKOxTDZNOClRwN6Df6vKfXvaFpMZDuKnGnvpcjTW9MUGUypKy2kEtJrBEWkNwUukQYQAXB965FPZnV2XWJpMu12TkiDXnRd0agSRd2a0Gdcf3N0hFiIrKYt7SWvuicHshkAwjZo4KjU3Qu2RXIgsnp1cLBEVv/wERGRBTJrtz923hc3xhyDnc7jYHnGwEO304vNmWdn8toy5DX/Ifb9LUlkbVIVGdVpigxL+NVEjTFoy3kQ4f70zMh+k7/pDK5s78bfTJp/+m4ODF0t5CaKVoU64G/yiz0V4DTkSXO3z9T8WIisjgcJga5+qWpvGrwiOMBx2FlT29CR9AklSa1ZNTlCXGtzql53VS1IkaeTaYoMiAFznsPPhNKR1ZazxSu29xC3IbWcOqUbJsqszlYmlibDmzchhBQ0gkxpPDUeVvhENU3oM05qDph5JLJcvBZom6AZaG0GYG0PrZbQRl7Rxm6Y+foDU8c8fVEfAPCqdOH+l1vO37iILlQ6lpOYyOofPoj1Orr4wBcssvDLbNwKlg6bMXoUMUrZ2UH/eenhJ05Un4YrK5zIQi2k6I0DOqmp8pMCt/R3JBxvdbZtnXk/szq7KLE0eQDSx0KpFbARWTjOmkL7PPTNCu95c8zliuvzsq+jT1Sdgb6DhfDEwOwOHR3ZTQNjNwc4D3mrM31mjnePV2bt2VdxZL6FjPzQjQ68Mzj2kfsdh2Sbo13G8kgoSbqXVZOjs68Ye4fP73sAkeUTPkN56+xhawa8OC241wMnLFUZS5d7/HYWua8cxqew/POC50wwtW+oWTioWTJhg2TM24+3Gne/Bd+kiSqbNJb+jPpNeTHwcun3+YlXU1401A0aIntPQ2TZFM1Vf6zL4sWtk+WHR+drsPnGbvJsba6hawdUab/zBXLMIUDqfypIGhA1zeMJOcdXAHQFd/rOn71z6/P2navNfVqpboQkRsgrFbSq7cihn703+NB/DQwAQF+3cW2aWdMVNd2KebXg/U8QyYnQhxYaG5Tow35SB0j9f7nfYeiiyH5P3zCV1P5cd8H9z7v5n527mztZqW6k1hANcFRYXAEOZ6jzd7rPoK4edAPUaNZO7EBmKRXpn6dVZrzAIjETSsVAq0O3aXDM+ADHoTkdaIbJr2AiazJkHXoBkch26H0zv9S8wjfqpwku4yabOd8uk52Y+iNCFgYiPcLNwkHNkknniCz1NiIZQwktRXQ1pImQeLn0237i1RQYTtHgA3VkF+5/uen8jYtwo2JdkLFEVj+EJ26fzv+8/PD9mhRCbWjGuhV+jxLoZqnEwVZq5QDcbV113q1srqb+1/hEpQkSU/oqFBmn8WO6IKEIW6hL8K0Y32iLhyqFeM27tLpV2dpIE1ihyD6bVBx10UP3O10v2J8STd+z1lHZ2giU6nYcEU1rqTFNlQsPLx8NeZ23tZfLRKLTHJSfPHBI8R00/mA+Qt1WaIn+poErJwU4+2eaUv+OphURkaXGxJbBa3yHOPp0O68FCSVJZFaNIGcTfUNBx93XCp8o9YQ+4+w6Om66+nuYyJrYg2PeDjHF0hzd5GFJkIA2/eOGi2wIGvjAK7sXbIO6bUYfaNAxOWFuY/mdCjY9EKosTGT1w1jf0jRpacG6E8rWRnj1ZqlNn65gOyXxDtaJXtBQqZzRsWTmBO2wXOYdNeoJ13F/mbmcDmWXUJLUqNl06Kt3IfoeLYNJNum+Yh4GmOTWUHuZpJh5IOoQVia+hEqbJWN7jSx/fcBCLxPz4CV5SkV6SlplxmwLEllt0RsHrVwcKPXfzUtDGZmmyNMbEeNGIYrUVwY1ttcPjvUd5TgEE1nz9wR6IwKjxzVM7RtiFr1M81eV/xw/KztMnqyCbmQt/4T0CQaxPtFmOdCbJRM2SEwjsu2ksFq9WGd7J8Xsx+cMX/ZoVA1X6EmStJmcMLcBIbLtdD0xkTWMZmpF+s3UygwYjx4llPTfqLqGEFfQTJ+mtDSVKyllXukLpf+JEi6mGxK1zMZVvWNYnIwgCM5jm+sc6Ei6vPorW9cVJ8JwpWifC9G/hqR/bFJX+jOu/ch2GEL7piNwmfKODhFf7h0dM9E1ONGUDPhKm6JI/zZNngGvWpkhaoWSyGpvRlb3X7hpXO+R6/hqK5qviIgsVa11g1f4POA4rFSItgtZxtqibWS+slDIIvWVRY2zCFmYxFzX2WJolKl1EIGEXFvlLkJkuerIwnZpiSyqYlD7kN/Ix3a9mKDXqEtfJ5IkaTdm0wRIfpiES7uh7Qn/wDYoKKjHhqozNgFqWxrGLy+I+x+8pjXwCCGxY1MJYBrxGaojnZYmw2h+Ql2fs5YT6hJ8KcY32uJhSmnwSJKUriuOv4PEoBeif2HxTHxoPVn4HX2rgqqC0N9zsbxl5i0UQWOOSS2W+4e//4STjcMpY3NQiO8/Kzv8y8mq0+MF0BU2RDAoEr3CN2rLBJdxbwrR7hR5+r00RYZYjL1U6wavGIiJLG89T8/55iluIbbzvWbxJsDjrQVmylhj/2Km3DqXTXcjsu02lgf9Rk3b8+K2bzsKU1lZmePkvVHQwp25EdObIXgj/E3XiKBJdztaRk9478TtrB8+Lz8CnbaLYcFHpbK0oQ7sBi4SQ+1CRreFBKBW40tUiK5Ey6cMjGQ2rs3vDot1dyPcROUKpqKpesprRZuPGznA8IGZdm4y+hSVZjJdZplyEBEDoYU60eUxvtF6fWDzAayhPBNKDhRm1ZyFEd0s/ahe8Jy5d2rf0KVCVERsRPZd/2VD7nO477oQbReyDJFIZLU8IKRPcFOsT7SDkBiIqSyR9AcFSYDUH2watNIshwqzZMLWUSaqFlCqBE720m/OvHVihqmWyczy/3v5v84xaWshQUCJrI56wbvTXhsQPiq82+kkmXPSkCTpuK/8SOmJqtMwVClbrGxzFmdMYtPRstj8YjINrzqaN5f3mIcpquwXPWeumNw3dDuXDIROk1mT/UdiSfIDHdRFNrW6OjpsmpdR6Sv8CFUhMIW8mloXvtJr67xz2MbRMts+f/JVkKn5JpQkh9TZqgAAEk5JREFUVWXV5EBrSX1rJZeDoqnFMtNTYyCkT3BWrE+0IEEiREZkwaaBsQEBzkMudRZIsb2PuHK0ZNW0NzjmlAJaskEdLVtMqgWiJ7LQ5dGDa0NRqRkb7poNjFQ72ztfmzUmMig2PNos0qm132xZceLidwnIlWU7acymaa+PnjLqqbyODoie8h5Jkg+tK47P1sQlZ9M11Hf1z+VamksaS0PNJtVni1Sjz0NGO4Iwxe3xP+d7/Wu0pRumr3xoLJmmyLibqsiABxi2h00VgIkJk4yKtbmdrRfdv0x93Xbj5ln3sF/m9AsP6WyB5nw/oSSpJqsmBwbCYFPhgEWhAgB9456uEpe5orf6Y3uNrH99wEJnc7ZPX14a621m23R0mRleUphZGVq72MY+24Fam+cKr3mBE9zG5gvRdiHL0BBZJq6wCkIfSCn8zUmehMTRXGV9Vna45WTVaXSv0nfjxaaCZWxNZxvjbJwBNkc1xS3E2lxqHrxIZG/duuUwbde8BtR1lqYjkMWeIrClc4Onjlg8abFZrvi3n/ncN+2XI+dqW+rdgBXVNFSHjvJJqbm2tF09KdZvzsMzut1VjrkGPJpPnaph9vri+K+uN5XCjYxtgMN+hRJb2mAE4oxujGy+fPmoKt956rv+Zm7kMB0cb+0c74e4BJ+L8YkK7uytA98NhS7sUhUZ19IUGd4GosDQ8xndlITeoPiGgkv+9QAASAbZpO/U+zIbV+sdw+JE4TsWbZBGtcBP8xlKVPW5QGNuZuY4jFJjRmbjCnYO38DLnsTsxBR5ep0mkp2+2xk2VRRUtYWt3WwbvSF8YNnUPrV68ALfcY6jut0N4aqCzWRxUymTzMD/hVJX0yl7bK+R4PUBC3usD/nM6ux7mshe+g6pXP1r01Juemox7RXYBFzwM9oTEljhE1U+oc84s6hZ8bJoVFVV9Zr08UyNJTaM0NUuOlf91DFPh22Y+bpZ4mqnX0z32XJ8R3JdU+3/taFKSEgboh4Q1OYCH3qj0a5ny8bP7bfwiYWcHetz2c26cxqlqnH+2uJtn11vogxraQJD+fREBifUY6Ux17eAm2PjExPUbFfj9CIBf2vJ/RS3kLMveM78P7GTWBpceLOSdSfn533lR8YrW7XBBPQRVYgD/I6W4lrKqMrSY4MZxQ3qQ6vX+8WO9LRzE53E7fOyrw+fqPr/9s49OqrijuNz98U+siHskoWQtCSWqBDkISkvQbNibQkCBSQgRZHwsEgVBc4R7UFRS49oVShwePooeLSk1fpAQz1oyFF7CAVRZMGQYFIIgWzCEpLsg83m3p7Z3LtMll1Iwt4lyX7vH4TAvXNnPjN35ju/+c38CqeK0K41CaHfLjsYsRPW1nC/qtBL1Sa7XktfEZWjkT6pLqh+69wHPcVMs22VFfD079cSXdcSqlIEQakfYAd86Vnv879Y0u82fb8bGt2vNRXY1nveqHz/0qfn99GyhxI6kQgTzRoXQmWPPY2Dn5s0lZ/Y0xqzQrZeqE989PiLp5xN/sBAwVeoiXhrNtSy6YQSsKH6Ce/GW54bm6TpGZGQ1LII2dMXT5smv/IgFYlMGNDmkwluTxu0alvuuhciMZgfrDyof+XDzetKKksfDmk1UhIiKDgf4fz5kCqJDjSqp1cu0uZwOU1t/TBj+X5BEEYV1BbtzqvKN9kbHeGECjtTCxuQQuTYGURtuMFXEqmSaJU6TGmgl/6dNyh0qpm9x6+aYLY+3xnbj/2S46k1p7a+VOY5w9a5/ztivnFaNKnTa+2xWJ0RR7jOP1TABT5Nm+xdlrLwlj4606mOWFhbw4k3VpatpyFq2SsgsMSJmGSpDbUiE05ItNa3VnqXy5owYs9jP5s9LRqcbA3F41aWbficeRcbcIMO8sF9k9SvseKrNZO1UP0HfW3gWRrUZUf/NfQYvupolD2a7zjacOLbZ8vW3yb2DTdy5cbfJ20YuDqxDxdfE00GHe1du6o+a9plz6ftmNYHvdj9L9KYzYrPUKsw0vgnTW5DRUlkjTwSBv97cyzjNZE8Bk0WIXvS4eg+/bUpjuawsoKCCtg+Cb1L1oxfOTAjI0OC1+76PXjwoHrr9ztXHSz7bkXLMLiCixBO3+I4L46oBKXAE4W/n/L/MXHwr7e9MHnFwnZnIIYfpFY6Qsj9BbVFbxdcKFLZnKXSUoEk4ELNyFhiwUdntXbA60jUg5ddg8+I9efVoNARa48RR6ck3T22B9ejtiMVoK15EQShX0FtkS2vKl9jb3S01tremoG+rVnpiPeH9CebYM4qzU2aOqQjhKINB00QhD7LStecKW+epLDfYvB3KvWf0nJ4eyyVrOi94rvfdPNz03p16xmVQPCCIPReVLzqrBj9TxKW9CdjfAmI2XD7ACSswWL+apZqdpLnZxlJX8GO9nHQcPF59nwqnAJuFKKIZydHcmY7UHc5lvENM3tlR8UHW84CXW/agiAkb6h4p7yg9gAbrjuUq8fV+u9wEzQ2e8HjpD+9+8xZZG7S1ESO4yI2oZBFyNLGm7V6orve06AxauMcC7MefvB3Y+7/LAIVwD33wcu5uw/nb788o70cwrY5/ZAhbn1Gg1EjKLkv5oyeP2XemMn115uXWH+e+lASQsbbvY41efb8VJuzRC8OCuF8ziiy1jT+joz2avkPWLEMCp1iYs+7Pp5uyX6I4zh6DFyXuQRB+ENBbdHqvKr8eHujI/hsXpZPrIhYtm79bYBuKHmgd/aoAfr0/Z2h4u2emseeLV//V0bUSdlmB6JQkxdJnEj3t3UZMiAEc5OmbLyv592PR5OXraH46ZVlG/7MvDP4+w7Vhlkfwmu5FUhWr2ALr2TF0mQY+vEvpD2u5jhq9OmalyAI2jx7fv0uez5tH9dyX2krhGtxo3XgyrGM18+wjKecg9tsW9/XJe6nE7k8e/5ZGslR/O7ZFetgtwOJsXQPOwlljTiUDevK0YIV7RdnJGZvH2hMXxBpiLIIWZrJgmNfLa68cK7HrNH3vxSJxrN5799Gvbf/H3vrPfUqelRX0JE8IcSTUEcIF0/zcnva4Fe35a59muM4BECIdAuiUwdBoH6xM2zOkscP1P1w61FnCSn3nKF1JPmYhVp2kCEnsiTJDlbBA1dged2iNrmGxw/6aUT32zYM0Kdv5ziuy7qt0IkqIWR+QW3RpgN1R/gDdT+wA1QsuRVIkzO/BS7D0M87IzF76UBjeoc8Vu1qX8dZd7X1nzX//tLmLHHZGx10IAsekNhlyOBIe8FiXhr4riZsqcsNb+0x3DXOfMeovt2SbsjRU3aPI3t95c6PbM5S2lfRckvinXURao14DdXXBfcXAYZ0Y9t9iVmfTjBlTe7KfYXUMOhKXvUlx9aihiPzD9QdIeXuM8TJu2Wd7KZqk8mI+EENVkNmuiXOck6W0aETJyqurn5RUFs02NZQairzVNBxW2qzIVeZglZt2O+CtbjT1UhfosakStUlu9K0KfoMQ/qcm3QpO+TCJZuQjVSG39mfN2Db3h2F9Z4G6pjvk1wVxPRZ2OIAetkia9TGHVlwz8yxs0dG5livSJWpK6cjWmp7VV86P6XMW5llayj5ZZnntK7cXRnv5N3SyQadFYF/gKaDUKouua6X2nxhQFx6Xn9j6l+MxFgbiQlbZwMjCEKS3ev4wOYquf1A3RGVraFU4eT90eBiQtBSK8Pw+MF1VnPmzXFcXKffPEpdDcouVU6tuXR+UlWjo6+zydWdI4QXBOLrpTHTpcDPDepuOw28+qw+Xu9ykVT/N6En5Qod0SkrLjhVRpVP7VaRbjXeum5Knuh5QYhXKAQLEQQt4ZU1GqWhJCGh/9kMjrtuN7NIfC+0z7J7L8ws95xZW+Y5bbI3ng+4ScUp9Aq9UucxKPXEqNB9Z9aYNsUR1V6VQXUxhaQIhBC6MqV2E7ehyulIbCDugS6f2+rm3SPrm1wWsc/zT+oNSp3PojZ/kxbfe76Fg7CKRN0hjcgTKBAEVTdSodacreIuaIlaq3ArnJySMwhNtL0TD6/jea/ap3E7mlJSU4SL5CKfyd3YKKkdVsjSjVxb8nfuPlT2vfVyVbU4/SDICsu6FAh8ZuqQ5VvmrV0biU1lkW8qsZWiOPNTV5NqU42rbuRJ1+kJTt49vNxTcRPdPelscqtcTW52iUNaopAsXuH8aK/wuaMik70SNS1/p/9HN1folVcEdwlYT+IUep9eqaPty9tLbf5Jp9TtTlQlfJSgN5wwEZM/YhzaVcs2LNZxX0LIRpuz9N4yT4XP5izR2r0OXjzpojP6RrdwlaBHaKXqknmL2swP7z5oS4o+cWUClyCezhJb3zRKCwIgAAIdhUCHE7J02XLZuyuf3Xf86z82O977fWB9ze4ErD9ssC8sRSp4jVrj/xbf+dAdOXfmdLkdoB2l0UQjH+LyNW2finJSrqTWHjVRU+sHaSSNTW7ibkolqXT53j9LDPcTgjMatXXlO0RhS5eWU5xNnjHlntNznE2eoWWeCq298by+2uvwT+6rvQ46kaHLjFIiwX6KV/NDbG/hAmnS5W2DUucX2XRyY9GYeL1S541T6F2JGtMli9r890Rtj7fTNCnHaT+E9tRe5HgOBEAABOQh0GGELB34Nn3x9phd+9/fU++p1zafRiCdQuAvvGiB9QtYcVeoZKH1/1Rkpg5+csu8tRsx2MjTWJAqCESLgCiE6evYPorbR/ZxRmIM228NI8OCsyj5KvsnPOgbolWDeA8IgAAIRIfADRey9CitghNf5xaW/2dDpcsuWmCpiJV87ALuBKw/bAtH5OTuvfcszX5kujXDSgMf4AIBEAABEAABEAABEIgBAjdMyBYdLzJv373j40PF340UOSuIkvMSA6ch3RREDDEbtHOu2fIquhxQN4KGWSOmZT3yq7k/xEBdoYggAAIgAAIgAAIgAAIMgagL2W+Pfdt306dvfnOo+HCvsDHclRwhcQpCdArmlAJ2o5fgyuo/dvmrs17cjKVCtGcQAAEQAAEQAAEQiE0CUROyJSUl8S9/uO7HQ8WHk0Kglo7qabmxg4rZOLq/J7Cxy5eZOmTRlnmvv9mVD5COzaaIUoMACIAACIAACIBA2wjILmTppo1Xd63f9e7eXdPZ+NJhsskK2Wa3gniFj+iVZ4alDVm0Nff1PbDAtq2CcTcIgAAIgAAIgAAIdFUCsgrZc+fOWeavXVxVWeMPqnGlSL38b+zh6YHjd/qY+3zy6JRls7NHjqzrqhWAcoEACIAACIAACIAACLSPgGxC9qTD0X3JywtqK2vOhYutHCryTyD04Yx7p9/6VM4Txe0rFp4CARAAARAAARAAARDo6gRkE7JLN66o33f4qzgRoHT6QChRK1lq/ZbYZHPSh0t/s3iG1WqVYvd29TpA+UAABEAABEAABEAABNpBQBYhW1FXYZ60dIadRmViYq4HR+yh2W3hbvD7SfPuWTgpt7Ad5cAjIAACIAACIAACIAACMUZAFiFb+H1h2pPrn/kpxOau4HCT/t8zbxl69IHl04ZaOVhhY6z9obggAAIgAAIgAAIg0G4CsgjZj7/57LFVb61+iYYvF3NGXQrEQAZSqFlCjHqjb9Hkh2+dOW7myXaXAA+CAAiAAAiAAAiAAAjEJAFZhOyXhwpzlm965j1RvEpg2Shdnln35KxYPnPJupikjkKDAAiAAAiAAAiAAAhcNwFZhOyx8mNJs/+0oIIRsoENXcNuHlr9xIRFP8/IyKBWWlwgAAIgAAIgAAIgAAIg0C4CsghZp9OZNHbJvaeYELS+PuYk1SOT50ydOHriv9qVUzwEAiAAAiAAAiAAAiAAAgwBWYSsIAgJs56fe764okRh1Bv5WeOm/3fhpNzRCCuLtgcCIAACIAACIAACIBApAnIJWW7z7je/VvDcj9PH/napyWS6GKkMIx0QAAEQAAEQAAEQAAEQoARkEbJACwIgAAIgAAIgAAIgAAJyE4CQlZsw0gcBEAABEAABEAABEJCFAISsLFiRKAiAAAiAAAiAAAiAgNwEIGTlJoz0QQAEQAAEQAAEQAAEZCEAISsLViQKAiAAAiAAAiAAAiAgNwEIWbkJI30QAAEQAAEQAAEQAAFZCEDIyoIViYIACIAACIAACIAACMhNAEJWbsJIHwRAAARAAARAAARAQBYCELKyYEWiIAACIAACIAACIAACchOAkJWbMNIHARAAARAAARAAARCQhQCErCxYkSgIgAAIgAAIgAAIgIDcBCBk5SaM9EEABEAABEAABEAABGQh8H+/UwpSpGJBLQAAAABJRU5ErkJggg==",
      },
    };
    console.log("def", def);
    // create the window before the callback
    var win = window.open("", "_blank");
    {
      // pass the "win" argument
      await pdfmake.createPdf(def).open({}, win);
    }
  }
</script>

<div class="flex flex-row w-full p-1 pb-3 items-center">
  <h1 class="text-2xl font-bold text-custom_font-sub_header">{tableTitle}</h1>
  <div class="flex-grow"></div>
  <div class="flex flex-row space-x-2">
    <SlidersSolid
      class="filter-menu w-5 h-5 me-2 text-center text-custom_font-sub_header"
    />
    <Dropdown {placement} triggeredBy=".filter-menu">
      <DropdownItem>Filter</DropdownItem>
    </Dropdown>
  </div>
</div>
<Table shadow>
  <TableHead>
    <TableHeadCell
      class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
      >TID</TableHeadCell
    >
    <TableHeadCell
      class="text-custom_font-table_header font-bold text-center bg-sidebar_bg w-1/4"
      >Name</TableHeadCell
    >
    <TableHeadCell
      class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
      >Date</TableHeadCell
    >
    <TableHeadCell
      class="text-custom_font-table_header font-bold text-center bg-sidebar_bg"
      >Total</TableHeadCell
    >
    <TableHeadCell
      class="text-custom_font-table_header font-bold text-center bg-sidebar_bg "
      >Status</TableHeadCell
    >
    <TableHeadCell
      class="text-custom_font-table_header font-bold text-center bg-sidebar_bg "
      >Download</TableHeadCell
    >
  </TableHead>
  {#if transactions.length == 0}
    <TableBodyRow
      class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl"
    >
      <TableBodyCell
        colspan="8"
        class="text-custom_font-table_header items-center rounded-b-xl"
      >
        <div class="flex flex-col items-center justify-center">
          <span class="text-custom_font-table_header text-xl"
            >No Transactions Found</span
          >
          <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400" />
        </div>
      </TableBodyCell>
    </TableBodyRow>
  {:else if filtered_transactions.length == 0}
    <TableBodyRow
      class="border-b-2 border-divider_col bg-primary-50 rounded-b-xl"
    >
      <TableBodyCell
        colspan="8"
        class="text-custom_font-table_header items-center rounded-b-xl"
      >
        <div class="flex flex-col items-center justify-center">
          <span class="text-custom_font-table_header text-xl"
            >No transactions matching The filters</span
          >
          <LinkSlashSolid class="w-48 h-48 mt-4 text-gray-400" />
        </div>
      </TableBodyCell>
    </TableBodyRow>
  {:else}
    {#each filtered_transactions.slice(pagination_page * transactionPerPage, (pagination_page + 1) * transactionPerPage + 1) as transaction, i}
      <TableBodyRow
        class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
        on:click={() => toggleRowTransaction(i)}
        on:dblclick={() => toggleRowTransaction(i)}
      >
        <TableBodyCell class="text-custom_font-table-header text-center"
          >{transaction.transactionid}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header">
          <div class="flex flex-row items-center">
            <Avatar
              class="w-7 h-7 me-3"
              src={transaction.avatarLink}
              alt="avatar"
            />
            {#if userType == "farmer"}
              {transaction.farmername}
            {:else if userType == "sme"}
              {transaction.smename}
            {:else}
              {transaction.vendorname}
            {/if}
          </div>
        </TableBodyCell>
        <TableBodyCell class="text-custom_font-table-header text-center"
          >{new Date(transaction.timestamp).toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
          }) +
            ", " +
            new Date(transaction.timestamp).toLocaleDateString([], {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}</TableBodyCell
        >
        <TableBodyCell class="text-custom_font-table-header text-center"
          >{transaction.total}</TableBodyCell
        >
        <TableBodyCell
          class="items-center text-custom_font-table-header text-center"
        >
          {#if transaction.status.toLowerCase() == "approved"}
            <span class="text-logo-2"> Approved </span>
          {:else if transaction.status.toLowerCase() == "pending"}
            <span class="text-sky-500"> Pending </span>
          {:else if transaction.status.toLowerCase() == "rejected"}
            <span class="text-red-500"> Rejected </span>
          {/if}
        </TableBodyCell>
        <TableBodyCell
          class="items-center text-custom_font-table-header text-center"
        >
          <DownloadSolid
            class="m-auto w-5 h-5 
                    {transaction.status.toLowerCase() != 'approved'
              ? 'text-gray-500'
              : 'text-blue-500'}"
            on:click={() => {
              if (transaction.status.toLowerCase() == "approved") {
                if (tableTitle == "Buy History") printSellReceipt(transaction);
                else printBuyReceipt(transaction);
              }
            }}
          />
        </TableBodyCell>
      </TableBodyRow>
      {#if openRow === i}
        <TableBodyRow
          class="border-b-2 border-divider_col bg-body_custom drop-shadow-md"
        >
          <TableBodyCell colspan="6" class="p-0">
            <div
              class="flex flex-row w-full min-w-full space-x-5 pe-3"
              transition:slide={{ duration: 300, axis: "y" }}
            >
              <div class="grow p-2 h-full">
                <Table>
                  <TableHead>
                    <TableHeadCell
                      class="text-custom_font-table_header font-bold bg-body_custom"
                      >Product</TableHeadCell
                    >
                    <TableHeadCell
                      class="text-custom_font-table_header font-bold text-right bg-body_custom"
                      >Unit Price</TableHeadCell
                    >
                    <TableHeadCell
                      class="text-custom_font-table_header font-bold text-right bg-body_custom"
                      >Quantity</TableHeadCell
                    >
                    {#if tableTitle == "Buy History"}
                      <TableHeadCell
                        class="text-custom_font-table_header font-bold text-right bg-body_custom"
                        >Tax Amount</TableHeadCell
                      >
                    {/if}
                    <TableHeadCell
                      class="text-custom_font-table_header font-bold text-right bg-body_custom"
                      >Price</TableHeadCell
                    >
                  </TableHead>
                  {#if tableTitle == "Buy History"}
                    {#each transaction.buyitems as object}
                      <TableBodyRow class=" border-transparent bg-body_custom ">
                        <TableBodyCell class="text-custom_font-table-header"
                          >{object.productname}</TableBodyCell
                        >
                        <TableBodyCell
                          class="text-custom_font-table-header text-right "
                          >{(object.totalPrice ?? 0) /
                            object.quantity}</TableBodyCell
                        >
                        <TableBodyCell
                          class="text-custom_font-table-header text-right "
                          >{object.quantity} {object.unit}</TableBodyCell
                        ><TableBodyCell
                          class="text-custom_font-table-header text-right "
                          >{object.tax ?? 0}</TableBodyCell
                        >
                        <TableBodyCell
                          class="text-custom_font-table-header text-right"
                          >{object.totalPrice ?? 0}</TableBodyCell
                        >
                      </TableBodyRow>
                    {/each}
                  {:else}
                    {#each transaction.sellitems as object}
                      <TableBodyRow class=" border-transparent bg-body_custom ">
                        <TableBodyCell class="text-custom_font-table-header"
                          >{object.productname}</TableBodyCell
                        >
                        <TableBodyCell
                          class="text-custom_font-table-header text-right "
                          >{(object.total ?? 0) /
                            object.quantity}</TableBodyCell
                        >
                        <TableBodyCell
                          class="text-custom_font-table-header text-right "
                          >{object.quantity} {object.unit}</TableBodyCell
                        >
                        <TableBodyCell
                          class="text-custom_font-table-header text-right"
                          >{object.total}</TableBodyCell
                        >
                      </TableBodyRow>
                    {/each}
                  {/if}
                </Table>
              </div>
              <div
                class="flex flex-col w-1/4 p-2 space-y-4 my-2 border-2 rounded-lg border-divider_col"
              >
                <div class="flex flex-col h-full">
                  <div
                    class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom"
                  >
                    <div class="grow">
                      <span class="text-custom_font-table-header font-bold"
                        >Total</span
                      >
                    </div>
                    <div class="text-custom_font-table-header text-right">
                      {transaction.total}
                    </div>
                  </div>
                  {#if tableTitle == "Buy History"}
                    <div
                      class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom"
                    >
                      <div class="grow">
                        <span class="text-custom_font-table-header font-bold"
                          >Due Deduction</span
                        >
                      </div>
                      <div class="text-custom_font-table-header text-right">
                        {transaction.totalDeduction ?? 0}
                      </div>
                    </div>
                    <div
                      class="flex flex-row p-3 px-6 border-b-2 border-divider_col bg-body_custom"
                    >
                      <div class="grow">
                        <span class="text-custom_font-table-header font-bold"
                          >Tax Amount</span
                        >
                      </div>
                      <div class="text-custom_font-table-header text-right">
                        {transaction.totalTax ?? 0}
                      </div>
                    </div>
                  {/if}
                  <div
                    class="flex flex-row p-3 px-6 border-divider_col bg-body_custom"
                  >
                    <div class="grow">
                      <span class="text-custom_font-table-header font-bold"
                        >Cash Back</span
                      >
                    </div>
                    <div class="text-custom_font-table-header text-right">
                      {transaction.cashback ?? 0}
                    </div>
                  </div>
                  <div class="grow bg-body_custom"></div>
                  <div
                    class="flex flex-row p-3 px-6 border-t-2 border-divider_col bg-body_custom"
                  >
                    <div class="grow">
                      <span class="text-custom_font-table-header font-bold"
                        >Final Amount</span
                      >
                    </div>
                    <div class="text-custom_font-table-header text-right">
                      {#if tableTitle == "Buy History"}
                        {parseInt(transaction.total) -
                          parseInt(transaction.totalDeduction) -
                          parseInt(transaction.totalTax) +
                          parseInt(transaction.cashback)}
                      {:else}
                        {parseInt(transaction.total) -
                          parseInt(transaction.cashback)}
                      {/if}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
    <TableBodyRow
      class="bg-body_custom drop-shadow-md border-b-2 border-divider_col rounded-b-xl"
    >
      <TableBodyCell colspan="8">
        <div class="flex flex-row items-center justify-between w-full">
          <Button
            on:click={previousTransaction}
            disabled={pagination_page == 0}
            class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
          >
            <ChevronLeftSolid class="w-4 h-4" />
            Previous
          </Button>
          <p class="text-custom_font-table_header grow text-center">
            Showing
            <span class="font-bold"
              >{pagination_page * transactionPerPage + 1}</span
            >
            to
            <span class="font-bold"
              >{Math.min(
                filtered_transactions.length,
                (pagination_page + 1) * transactionPerPage
              )}</span
            >
            of
            <span class="font-bold">{filtered_transactions.length}</span>
            entries
          </p>
          <Button
            on:click={nextTransaction}
            disabled={pagination_page >=
              filtered_transactions.length / transactionPerPage - 1}
            class="text-xs bg-custom_font-sub_header text-white hover:bg-custom_font-light hover:drop-shadow-md disabled:invisible focus:ring-border_custom"
          >
            Next
            <ChevronRightSolid class="w-4 h-4" />
          </Button>
        </div>
      </TableBodyCell>
    </TableBodyRow>
  {/if}
</Table>
