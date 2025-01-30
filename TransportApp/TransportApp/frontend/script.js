
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
    console.log(`🚌 Starting getBusDetails for bus: ${busNumber}`);
    const apiURL = `http://localhost:3000/api/route/${busNumber}`;
    console.log(`📡 Requesting: ${apiURL}`);
    
   // Test 1: Check if the getData endpoint is accessible
    console.log("🔄 Testing getData endpoint first...");
    try {
        const testResponse = await fetch(apiURL);
        if (!testResponse.ok) {
            console.error("❌ getData test failed with status:", testResponse.status);
            throw new Error(`Test failed: ${testResponse.status}`);
        }
        console.log("✅ getData test successful");
    } catch (error) {
        console.error("❌ getData test error:", error);
        throw error; // Re-throw to stop further execution
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
