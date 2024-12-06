<script>
    import * as d3 from 'd3';
    import Axis from './Axis.svelte';
  
    export let data; 
  
    let width = window.innerWidth;
    let height = window.innerHeight;
  
    // Margin convention
    const margin = { top: 50, right: 30, bottom: 50, left: 50 };
  
    // Parse month strings (e.g., "2024-11") into valid Date objects
    const parseMonth = d3.timeParse("%Y-%m"); // Parses "2024-11" into a Date object
    const monthFormatter = d3.timeFormat("%b"); // Formats Date objects into "Jan", "Feb", etc.
    let position_bar = width < 1000 ? 4.5 : 3
    
    // Format the data for scales and sorting
    $: processedData = [...data]
      .map(d => ({
        ...d,
        date: parseMonth(d.month) // Convert "2024-11" to a Date object
      }))
      .filter(d => d.date) // Remove invalid entries
      .sort((a, b) => d3.ascending(a.date, b.date)); // Sort chronologically
  
    // Accessors
    const xValue = d => monthFormatter(d.date); // Format Date objects as "Jan", "Feb", ...
    const yValue = d => d.count; // Use `count` for y-axis
  
    // Chart dimensions
  
    $: chartHeight = height > 600 ? height / 1.5 : height / 2;
  
    $: xScale = d3
      .scaleBand()
      .domain(processedData.map(xValue)) // Use formatted months
      .range([margin.left, width - margin.right])
      .padding(0.1);
  
    // yScale: Linear scale for counts
    $: yScale = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, yValue)]).nice()
      .range([chartHeight - margin.bottom, margin.top]);
  </script>
  
  <style>
    .wrapper {
      width: 100%;
      height: 100%;
    }
  </style>
  
  <div class="wrapper" bind:clientWidth={width} bind:clientHeight={height}>
    <svg width={width} height={chartHeight}>
      <!-- Bottom Axis -->
      <Axis {width} height={chartHeight} margin={margin} scale={xScale} position="bottom" />
  
      <!-- Left Axis -->
      <Axis {width} height={chartHeight} margin={margin} scale={yScale} position="left" />
  
      <!-- Bars -->
      {#each processedData as { date, count }}
        <rect
          x={xScale(monthFormatter(date))}  
          y={yScale(count)}                 
          width={xScale.bandwidth()}        
          height={yScale(0) - yScale(count)}
          fill="#F28C28"
        />
        <text
        x={xScale(monthFormatter(date)) + xScale.bandwidth() / position_bar} 
        y={yScale(count) - 5} 
        style="font-size: {width < 1000 ? '12px' : '16px'}; font-weight: bold;"
      >
        {count}
      </text>
      {/each}
    </svg>
  </div>
  