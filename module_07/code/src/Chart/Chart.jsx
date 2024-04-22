import React, { createContext, useContext } from "react";
import { dimensionsPropsType } from "./utils";

import "./Chart.css";

const ChartContext = createContext();
export const useDimensionsContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useDimensionsContext must be used within a ChartProvider");
  }
  return context;
};

const Chart = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

Chart.propTypes = {
  dimensions: dimensionsPropsType,
};

Chart.defaultProps = {
  dimensions: {},
};

export default Chart;
