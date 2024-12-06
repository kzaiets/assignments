import './main.css';
import * as d3 from "d3";
import Chart from './chart/Chart.svelte'
import strikeData from './data/2024 Russian Air And Drone Strikes In Ukraine (ACLED).csv'


// Initialize the chart
function initializeChart() {
    // Process the imported data
    const data = loadAndProcessData(strikeData);
   
    // Create Chart Component
    const barChart = new Chart({
      target: document.getElementById('chart'),
      props: {
        data // Pass the processed data to the component
      }
    });
  }
  
  // Data processing function
  function loadAndProcessData(data) {
    // Filter and group data
    const groupedData = d3.rollups(
      data,
      v => v.length,
      d => d3.timeFormat("%Y-%m")(d3.timeParse("%d %B %Y")(d.event_date))
    );
    console.log(groupedData)

    return groupedData
    .sort((a, b) => new Date(a[0]) - new Date(b[0])) // Sort by date
    .map(([month, count]) => ({ month, count })); // Transform to { month, count }
  }
  
  // Call the function 
  initializeChart();