<script>
  import { Chart } from 'flowbite-svelte';

  export let data = [20000, 12000, 7000, 2500];
  
  let options;
  $:options = {
    colors: ['#21ad42'],
    series: [
      {
        name: 'Taka',
        color: '#21ad42',
        data: [
          { x: 'Total Loan', y: data[0] },
          { x: 'Total Buy', y: data[1] },
          { x: 'Total Sell', y: data[2] },
          { x: 'Total Tax', y: data[3] }
        ]
      }
    ],
    chart: {
      type: 'bar',
      height: '90%',
      width: '100%',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
        borderRadiusApplication: 'end',
        borderRadius: 8,
        colors: {
            backgroundBarColors: ['#dff2e3'],
        }
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1
        }
      }
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent']
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: true
    },
    fill: {
      opacity: 1
    }
  };
</script>


<Chart {options} />
