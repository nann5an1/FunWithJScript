// import {drawRoute} from './getMap.js';
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
                    busDetailsBtn = clone.querySelector("#bus-details");
                    clone.style.display = "block";
                    busNum.innerHTML = `Bus ${busNumber}`;
                    // console.log(`Bus number is : ${busNumber}`);
                    // busDetailsBtn.addEventListener("click", async () => await getBusDetails(busNumber));
                    busDetailsBtn.addEventListener("click", () => getBusDetails(busNumber));
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
        const apiURL = `http://localhost:3000/api/route/${busNumber}`; // Backend endpoint
        console.log("🔍 Fetching from:", apiURL); // Debugging line
        const response = await fetch(apiURL);
        console.log("🔍 Response status:", response.status);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        const len = data.length;
        console.log(len);
        drawRoute(data, len);
        console.log("Bus stop coordinates:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

searchBtn.addEventListener("click", () => getData(inputText.value));