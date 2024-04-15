# fullstack-d3

## Chart Drawing Checklist
1. Access Data
  - Look at the data structure and declare how to access the values we'll need
2. Create chart dimension
  - Declare the physical (i.e. pixels) chart parameters
3. Draw Canvas
  - Render the wrapper and bounds element
4. Create Scales
  - Create scales for every data-to-physical attribute in our chart
5. Draw Data
  - render your data elements
6. Draw peripherals
  - Render your axes, labels, legends, annotations, etc
7. Set up interactions
  - Initialize event listeners and create interaction behavior