<script>
	import { select } from 'd3-selection';
	import { axisBottom, axisLeft } from 'd3-axis';

	export let width;
	export let height;
	export let margin;
	export let position;
	export let scale;
	let transform;
	let g;
    console.log(-width)
	// Debugging logs
	console.log("Left Axis Scale Domain:", scale.domain());
console.log("Left Axis Scale Range:", scale.range());

	$: {
		select(g).selectAll('*').remove();
		let axis;

		switch (position) {
			case 'bottom':
				// Bottom axis configuration
				axis = axisBottom(scale).tickSizeOuter(0).ticks(5);
				transform = `translate(0, ${height - margin.bottom})`;
				break;

			case 'left':
				// Left axis configuration with horizontal grid lines
				axis = axisLeft(scale)
					.tickSize(-(width)) // Horizontal grid lines span the chart
					.tickSizeOuter(0); // No outer ticks
				transform = `translate(${margin.left}, 0)`;
				break;
		}

		// Apply axis and style it
		select(g)
			.call(axis)
			.call(g => {
				// Remove axis line
				g.select(".domain").remove();

				// Style grid lines
				g.selectAll("line")
					.attr("stroke", "#DEDEDE")
				g.selectAll(".domain").attr("stroke", "#DEDEDE");
				// Style tick text
				g.selectAll(".tick text")
					.style("font-size", width < 1000 ? "14px" : "14px")
			});
	}
</script>

<g class="axis" bind:this={g} {transform} />
