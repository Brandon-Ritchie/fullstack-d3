import * as d3 from "d3";

async function drawBars() {
  // 1. Access Data

  const data = await d3.json("./data/my_weather_data.json");
  console.log(data[0])

  // 2. Create chart dimensions

  // 3. Draw canvas

  // 4. Create scales

  // 5. Draw data

  // 6. Draw peripherals
  
}
drawBars()