// import React, { useEffect, useState } from "react";
// import DummyData from "../../../data/dummy.json";
// import "chart.js/auto";
// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );



// function ArchitectureSmell() {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Data from JSON",
//         data: [],
//       },
//     ],
//   });

//   useEffect(() => {
//     const labels = Object.keys(
//       DummyData["Architecture Smells"]["smell_distribution"]
//     );
//     const values = Object.values(
//       DummyData["Architecture Smells"]["smell_distribution"]
//     );

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Smells",
//           data: values,
//           backgroundColor: [
//             "rgb(122, 255, 64)",
//             "rgb(45, 189, 230)",
//             "rgb(255, 87, 152)",
//             "rgb(78, 200, 35)",
//             "rgb(203, 92, 210)",
//           ],
//         },
//       ],
//     });
//   }, []);

//   const doughnutOptions = {
//     plugins: {
//       title: {
//         display: true,
//         text: "Architecture Smells",
//         font: {
//           size: 20,
//         }
//       },
//       legend: {
//         display: true,
//         position: "top",
//         labels: {
//           font: {
//             size: 12,
//           }
//         }
//       },
//     },
//   };
//   return (
//     <>
//       <div>
//         <Doughnut data={chartData} options={doughnutOptions} />
//       </div>
//     </>
//   );
// }

// export default ArchitectureSmell;


// import React, { useEffect, useState } from "react";
// import "chart.js/auto";
// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//  Legend
// );

// function ArchitectureSmell() {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Data from API",
//         data: [],
//         backgroundColor: [
//           "rgb(122, 255, 64)",
//           "rgb(45, 189, 230)",
//           "rgb(255, 87, 152)",
//           "rgb(78, 200, 35)",
//           "rgb(203, 92, 210)",
//         ],
//       },
//     ],
//   });

//   useEffect(() => {
//     const apiUrl = "http://localhost:8080/onecommit/getanalysis";
//     const gitRepoLink = "https://github.com/apache/maven.git";
//     const branch = "master";
//     // const commitId = "80a8e4154043fc29ca15458847c85a4960a020d";

//     fetch(`${apiUrl}?gitRepoLink=${gitRepoLink}&branch=${branch}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const labels = Object.keys(data["Architecture Smells"]["smell_distribution"]);
//         const values = Object.values(data["Architecture Smells"]["smell_distribution"]);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Smells",
//               data: values,
//               backgroundColor: [
//                 "rgb(122, 255, 64)",
//                 "rgb(45, 189, 230)",
//                 "rgb(255, 87, 152)",
//                 "rgb(78, 200, 35)",
//                 "rgb(203, 92, 210)",
//               ],
//             },
//           ],
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching data from the API:", error);
//       });
//   }, []);

//   const doughnutOptions = {
//     plugins: {
//       title: {
//         display: true,
//         text: "Architecture Smells",
//         font: {
//           size: 20,
//         },
//       },
//       legend: {
//         display: true,
//         position: "top",
//         labels: {
//           font: {
//             size: 12,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <div>
//         <Doughnut data={chartData} options={doughnutOptions} />
//       </div>
//     </>
//   );
// }

// export default ArchitectureSmell;


import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ArchitectureSmell() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Data from API",
        data: [],
        backgroundColor: [
          "rgb(122, 255, 64)",
          "rgb(45, 189, 230)",
          "rgb(255, 87, 152)",
          "rgb(78, 200, 35)",
          "rgb(203, 92, 210)",
        ],
      },
    ],
  });

  useEffect(() => {
    // Define your API URL and parameters
    const apiUrl = "http://localhost:8080/onecommit/getanalysis";
    const gitRepoLink = "https://github.com/apache/maven.git";
    const branch = "master";

    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}?gitRepoLink=${gitRepoLink}&branch=${branch}`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();

        const labels = Object.keys(data["Architecture Smells"]["smell_distribution"]);
        const values = Object.values(data["Architecture Smells"]["smell_distribution"]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Smells",
              data: values,
              backgroundColor: [
                "rgb(122, 255, 64)",
                "rgb(45, 189, 230)",
                "rgb(255, 87, 152)",
                "rgb(78, 200, 35)",
                "rgb(203, 92, 210)",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    }

    fetchData();
  }, []);

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: "Architecture Smells",
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <>
      <div>
        <Doughnut data={chartData} options={doughnutOptions} />
      </div>
    </>
  );
}

export default ArchitectureSmell;
