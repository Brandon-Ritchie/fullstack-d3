import * as d3 from "d3";
import csvFile from "../data/bob_ross_data.csv";

async function drawLineChart() {
    const csv = await d3.csv(csvFile);

    console.log(csv)

    const groupedNumOfColorsPerSeason = [];

    csv.forEach((d) => {
      const season = Number(d.season);
      const numColors = Number(d.num_colors)

      if(!groupedNumOfColorsPerSeason[season]) {
        groupedNumOfColorsPerSeason[season - 1] = [];
      }

      groupedNumOfColorsPerSeason[season - 1].push(numColors)
    })

    const data = groupedNumOfColorsPerSeason.map((d, index) => ({
        season: index + 1,
        avgNumOfColors: d.reduce((acc, val) => acc + val, 0) / d.length
      })
    );

    const yAccessor = (d) => d.avgNumOfColors;
    const xAccessor = (d) => d.season;

    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60,
        },
    };

    dimensions.boundedWidth =
          dimensions.width - dimensions.margin.left - dimensions.margin.right;
      dimensions.boundedHeight =
          dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const wrapper = d3.select("#exercise")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("transform", `translate(
          ${dimensions.margin.left}px,
          ${dimensions.margin.top}px
        )`);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0])

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth]);

    // draw data
    const avgNumOfColorsOverallPlacement = yScale(data.map((d) => d.avgNumOfColors)
        .reduce((acc, val) => acc + val, 0) / data.length);

    const avgNumOfColorsOverall = bounds.append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", avgNumOfColorsOverallPlacement)
        .attr("height", dimensions.boundedHeight - avgNumOfColorsOverallPlacement)
        .attr("fill", "#e0f3f3")

    const lineGenerator = d3.line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)));

    const line = bounds.append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)

    const yAxisGenerator = d3.axisLeft()
        .scale(yScale);

    const yAxis = bounds.append("g")
        .call(yAxisGenerator);

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale);

    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
  }

drawLineChart()
