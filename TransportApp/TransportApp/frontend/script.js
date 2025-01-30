
const inputText = document.querySelector("#input-text");
const searchBtn = document.getElementById("search-btn");
const outPanel = document.querySelector("#panel-output");
const template = document.querySelector(".bus-output-panel");
let currentDate = new Date();
let currentMin = currentDate.getMinutes();



async function getData(busStopCode){
    try
    {
        outPanel.innerHTML = "";
        const apiURL = `http://localhost:3000/api/data/${busStopCode}`; // Backend endpoint
        const response = await fetch(apiURL);
        if(response.ok)
        {
            const data = await response.json();
			// console.log(data);
            if (data.Services) {
                const count = data.Services.length;
                console.log(count);
                //loop for the bus number 
                for(let j = 0; j < count; j++)
                {
                    const busNumber = data.Services[j].ServiceNo;
                    const clone = template.cloneNode(true);
                    const busNum = clone.querySelector(".bus-num");
                    const busDetailsBtn = clone.querySelector("#bus-details");
                    clone.style.display = "block";
                    busNum.innerHTML = `Bus ${busNumber}`;
                    // console.log(`Bus number is : ${busNumber}`);
                    // busDetailsBtn.addEventListener("click", async () => await getBusDetails(busNumber));
                    busDetailsBtn.addEventListener("click", async () => {
                        console.log("🖱️ Button clicked");
                        try {
                            console.log(`🚌 Calling getBusDetails for bus ${busNumber}`);
                            const result = await getBusDetails(busNumber);
                            console.log("✅ getBusDetails completed:", result);
                        } catch (error) {
                            console.error("❌ Click handler error:", error);
                        }
                    });
                    for(let i = 0; i < 3; i++) //looping for the detailed feature of the bus
                    {
                        const key = i === 0 ? "NextBus" : `NextBus${i + 1}`;
                        clone.querySelector(`#load${i + 1}`).innerHTML = data.Services[j][key].Load;
                        clone.querySelector(`#feature${i + 1}`).innerHTML = data.Services[j][key].Feature;
                        clone.querySelector(`#type${i + 1}`).innerHTML = data.Services[j][key].Type;
                        const dataTime = new Date(data.Services[j][key].EstimatedArrival);
                        const duration = dataTime.getHours() != currentDate.getHours() ? 60 - currentMin : Math.abs(currentMin - dataTime.getMinutes());
                        clone.querySelector(`#time${i + 1}`).innerHTML = `Next Bus in ${duration} mins`;
                    }
                    outPanel.appendChild(clone);
                }
        }
        else
            outPanel.innerHTML = "No services available for this bus stop.";
        }
        else
            console.log(response.status);
    } catch (error) {
        console.log("error occured");
        console.log(`An error occured ${error.message}`);
    }
}

async function getBusDetails(busNumber) {
    try {
        const response = await fetch(`http://localhost:3000/api/route/${busNumber}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log("Bus stop coordinates:", data);
        // Example response:
        // [
        //   { busStopCode: "01012", latitude: 1.29685, longitude: 103.853, description: "Hotel Grand Pacific" },
        //   ...
        // ]
    } catch (error) {
        console.error("Error:", error);
    }
}

searchBtn.addEventListener("click", () => getData(inputText.value));




// async function getData(busStopCode) {
//     try {
//         outPanel.innerHTML = "";
//         const apiURL = `${apiObject.cors}${apiObject.generalAPI}/v3/BusArrival?BusStopCode=${busStopCode}`;
//         const response = await fetch(apiURL, {
//             headers: {
//                 AccountKey : accKey,
//                 Accept: 'application/json'
//             }
//         });
//         if(response.ok){
//             alert(`all okay:)))`);
//             const data = await response.json();
//             if (data.Services) {
//                 const count = data.Services.length;
//                 alert(count);
                
//                 //loop for the bus number 
//                 for(let j = 0; j < count; j++)
//                 {
//                     const busNumber = data.Services[j].ServiceNo;
//                     const clone = template.cloneNode(true);
//                     const busNum = clone.querySelector(".bus-num");
//                     const busDetailsBtn = clone.querySelector("#bus-details");
//                     clone.style.display = "block";
//                     busNum.innerHTML = `Bus ${busNumber}`;
//                     busDetailsBtn.addEventListener("click", () => getBusDetails());
//                     for(let i = 0; i < 3; i++) //looping for the detailed feature of the bus
//                     {
//                         const key = i === 0 ? "NextBus" : `NextBus${i + 1}`;
//                         clone.querySelector(`#load${i + 1}`).innerHTML = data.Services[j][key].Load;
//                         clone.querySelector(`#feature${i + 1}`).innerHTML = data.Services[j][key].Feature;
//                         clone.querySelector(`#type${i + 1}`).innerHTML = data.Services[j][key].Type;
//                         const dataTime = new Date(data.Services[j][key].EstimatedArrival);
//                         const duration = dataTime.getHours() != currentDate.getHours() ? 60 - currentMin : Math.abs(currentMin - dataTime.getMinutes());
//                         clone.querySelector(`#time${i + 1}`).innerHTML = `Next Bus in ${duration} mins`;
//                     }
//                     outPanel.appendChild(clone);
//                 }
//             } else {
//                 outPanel.innerHTML = "No services available for this bus stop.";
//             }
//         }
//         else
//             alert(`HTTP Error: ${response.status}`);
//     } catch (error) {
//         alert("error occured");
//         alert(`An error occured ${error.message}`);
//     }
    
// }
