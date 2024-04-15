import * as d3 from "d3";

async function drawScatter() {
    // 1. Access data

    const data = await d3.tsv("./data/penguins.tsv")

    // 2. Create chart dimensions

    const xAccessor = d => Number(d.bill_length_mm);
    const yAccessor = d => Number(d.body_mass_g);
    const colorAccessor = d => d["species island"]

    const width = d3.min([
        window.innerWidth,  
        window.innerHeight
    ], d => d * 0.9);

    const dimensions = {
        width,
        height: width,
        margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    }
    dimensions.boundedWidth = dimensions.width 
        - dimensions.margin.left 
        - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height 
        - dimensions.margin.top 
        - dimensions.margin.bottom;

    // 3. Draw canvas

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("transform", `translate(
            ${dimensions.margin.left}px,
            ${dimensions.margin.top}px
        )`);

    // 4. Create scales

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0])

    const colorScale = d3.scaleOrdinal()
        .domain(data.map(colorAccessor))
        .range(["skyblue", "darkslategrey", "red", "blue", "green"])

    // 5. Draw data

    const dots = bounds.selectAll("circle")
        .data(data)

    dots.join("circle")
        .merge(dots)
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 5)
        .attr("fill", d => colorScale(colorAccessor(d)))

    // 6. Draw peripherals
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale);

    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(
            ${dimensions.boundedHeight}px
        )`);

    const xAxisLabel = xAxis.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 10)
        .attr("fill", "black")
        .style("font-size", "1.4em")
        .html("Bill length (mm)");

    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .ticks(4);

    const yAxis = bounds.append("g")
        .call(yAxisGenerator);
    
    const yAxisLabel = yAxis.append("text")
        .attr("x", -dimensions.boundedHeight / 2)
        .attr("y", -dimensions.margin.left + 10)
        .style("fill", "black")
        .text("Body mass (g)")
        .style("font-size", "1.4em")
        .style("transform", "rotate(-90deg)")
        .style("text-anchor", "middle")

}

drawScatter();