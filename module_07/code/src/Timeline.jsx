import * as d3 from "d3";
import PropTypes from "prop-types";
import React from "react";

import Axis from "./Chart/Axis";
import Chart from "./Chart/Chart";
import Line from "./Chart/Line";
import { accessorPropsType, useChartDimensions } from "./Chart/utils";

const formatDate = d3.timeFormat("%-b %-d");

const Timeline = ({ data, xAccessor, yAccessor, label }) => {
  const [ref, dimensions] = useChartDimensions();

  // prettier-ignore
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  // prettier-ignore
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScale = (d) => yScale(yAccessor(d));

  return (
    <div className="Timeline" ref={ref}>
      <Chart dimensions={dimensions}>
        <Line
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScale}
        />
        <Axis dimension="x" scale={xScale} formatTick={formatDate} />
        <Axis dimension="y" scale={yScale} label="Temperature" />
      </Chart>
    </div>
  );
};

Timeline.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

Timeline.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

export default Timeline;
