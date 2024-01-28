<script>
// @ts-nocheck

    import { Chart } from 'flowbite-svelte';

    export let data = [6500, 5231, 6456, 7334, 6356, 6456, 5432, 7542, 5632, 6654, 5664, 6553];
    export let labels=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    export let name="Monthly Tax";
    let options = {
      chart: {
        height: '400px',
        width: '100%',
        type: 'line',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      tooltip: {
        enabled: true,
        x: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26
        }
      },
      series: [
        {
          name: name,
          data: data,
          type: 'area',
          color: '#27C848'
        }
      ],
      fill: {
        type: 'gradient',
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.0,
          stops: [0, 90, 100]
        }
      },
      legend: {
        show: false
      },
      markers: {
        size:  4,
      },
      xaxis: {
        categories: labels,
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: true,
      }
    };
  </script>

  <Chart {options} />
