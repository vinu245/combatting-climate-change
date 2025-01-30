// Chart.js data and configuration
let chartData = {};
let carbonChart;

const updateChart = (activity, carbonValue) => {
  chartData[activity] = (chartData[activity] || 0) + carbonValue;

  if (carbonChart) {
    carbonChart.destroy();
  }

  const ctx = document.getElementById("carbonChart").getContext("2d");
  carbonChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(chartData),
      datasets: [
        {
          label: "Carbon Emissions",
          data: Object.values(chartData),
          backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336", "#9c27b0"],
        },
      ],
    },
  });
};

// Random eco-friendly tips
const ecoTips = [
  "Switch to energy-efficient appliances.",
  "Plant a tree in your community.",
  "Use reusable shopping bags.",
  "Turn off lights when leaving a room.",
  "Use cold water for laundry when possible.",
];

const showRandomTip = () => {
  const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
  document.getElementById("ecoTip").textContent = randomTip;
};

// Event listener for adding a predefined activity
document.getElementById("addActivity").addEventListener("click", function () {
  const activityDropdown = document.getElementById("activity");
  const selectedOption = activityDropdown.options[activityDropdown.selectedIndex];
  const activityName = selectedOption.text.split(" - ")[0];
  const carbonValue = parseFloat(selectedOption.value);

  // Add the activity to the list
  const activityList = document.getElementById("activityList");
  const newActivity = document.createElement("li");
  newActivity.textContent = `${activityName} - ${carbonValue}kg CO₂`;
  activityList.appendChild(newActivity);

  // Update the total carbon emissions
  const totalCarbonElement = document.getElementById("totalCarbon");
  const currentTotal = parseFloat(totalCarbonElement.textContent);
  totalCarbonElement.textContent = (currentTotal + carbonValue).toFixed(2);

  // Update the chart and show a random eco-friendly tip
  updateChart(activityName, carbonValue);
  showRandomTip();
});

// Event listener for adding a custom activity
document.getElementById("addCustomActivity").addEventListener("click", function () {
  const activityName = document.getElementById("customActivityName").value;
  const carbonValue = parseFloat(document.getElementById("customActivityValue").value);

  if (!activityName || isNaN(carbonValue)) {
    alert("Please enter a valid activity name and carbon value.");
    return;
  }

  // Add the activity to the list
  const activityList = document.getElementById("activityList");
  const newActivity = document.createElement("li");
  newActivity.textContent = `${activityName} - ${carbonValue}kg CO₂`;
  activityList.appendChild(newActivity);

  // Update the total carbon emissions
  const totalCarbonElement = document.getElementById("totalCarbon");
  const currentTotal = parseFloat(totalCarbonElement.textContent);
  totalCarbonElement.textContent = (currentTotal + carbonValue).toFixed(2);

  // Update the chart and show a random eco-friendly tip
  updateChart(activityName, carbonValue);
  showRandomTip();

  // Clear the input fields
  document.getElementById("customActivityName").value = "";
  document.getElementById("customActivityValue").value = "";
});

// Event listener for resetting the tracker
document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("activityList").innerHTML = "";
  document.getElementById("totalCarbon").textContent = "0";
  chartData = {};
  if (carbonChart) {
    carbonChart.destroy();
  }
});
