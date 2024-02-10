<script>
    import { Chart } from 'flowbite-svelte';
  
    export let data = [10000, 2000, 4000]

    const options = {
      series: data,
      colors: ['#b6f728', '#10e642', '#32643B'],
      chart: {
        height: '90%',
        width: '100%',
        type: 'donut'
      },
      stroke: {
        colors: ['transparent'],
        lineCap: ''
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                offsetY: 20
              },
              total: {
                showAlways: false,
                show: true,
                label: 'Total Budget',
                fontFamily: 'Inter, sans-serif',
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  if (sum >= 1000000000)
                    return `${(sum/1000000000).toFixed(2)}B`;
                  else if(sum >= 1000000)
                    return `${(sum/1000000).toFixed(2)}M`;
                  else if(sum >= 1000)
                    return `${(sum/1000).toFixed(2)}K`;
                  else
                    return `${sum}`;
                }
              },
              value: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                offsetY: -20,
                formatter: function (value) {
                  if (value >= 1000000000)
                    return `${(value/1000000000).toFixed(2)}B`;
                  else if(value >= 1000000)
                    return `${(value/1000000).toFixed(2)}M`;
                  else if(value >= 1000)
                    return `${(value/1000).toFixed(2)}K`;
                  else
                    return `${value}`;
                }
              }
            },
            size: '80%'
          }
        }
      },
      grid: {
        padding: {
          top: -2
        }
      },
      labels: ['Available Budget', 'Farmer Loan', 'SME Loan'],
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        fontSize: '20px'
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value;
          }
        }
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value;
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      }
    };
  </script>
  
    <Chart {options} class="py-6" />
