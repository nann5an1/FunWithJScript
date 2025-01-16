
const inputText = document.querySelector("#input-text");
const searchBtn = document.getElementById("search-btn");
const outPanel = document.querySelector("#panel-output");
const template = document.querySelector(".bus-output-panel");
const accKey =  'zdizZc8xTyCj7yKmxA0Dgg==';

let currentDate = new Date();
let currentMin = currentDate.getMinutes();
async function getData(busStopCode) {
    try {
        const apiURL = `https://proxy.cors.sh/https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`;
        const response = await fetch(apiURL, {
            headers: {
                AccountKey : accKey,
                Accept: 'application/json'
            }
        });
        if(response.ok){
            alert(`all okay:)))`);
            const data = await response.json();
            if (data.Services) {
                const count = data.Services.length;
                alert(count);
                
                //loop for the number 
                for(let j = 0; j < count; j++)
                {
                    const busNumber = data.Services[j].ServiceNo;
                    const clone = template.cloneNode(true);
                    clone.style.display = "block";  //reopen the display: none of the bus details
                    clone.querySelector(".bus-num").innerHTML = `Bus ${busNumber}`;
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
            } else {
                outPanel.innerHTML = "No services available for this bus stop.";
            }
        }
        else
            alert(`HTTP Error: ${response.status}`);
    } catch (error) {
        alert("error occured");
        alert(`An error occured ${error.message}`);
    }
    
}



searchBtn.addEventListener("click", () => getData(inputText.value));



 // loadElementArray[i].innerHTML = data.Services[j][key].Load;
                        // featElementArray[i].innerHTML = data.Services[j][key].Feature;
                        // typeElementArray[i].innerHTML = data.Services[j][key].Type;

// alert(inputText.value);

// const load = clone.querySelector(`#load${j + 1}`);
                        // const feature = clone.querySelector(`#feature${j + 1}`);
                        // const type = clone.querySelector(`#type${j + 1}`);

                        // alert(`UTC current time: ${currentUTC}`);
// alert(`current hrs and minustes ${currentHours} ${currentMin}`);
// alert(`testMinutes : ${testDate.getMinutes()}`);
// alert(`current time string: ${currentDate.toLocaleTimeString()}`);
// alert(`test time string: ${testDate.toLocaleTimeString()}`);
// alert(Math.abs(currentMin - testDate.getMinutes()));

// for(let i = 1; i <= 3; i++){
//     const element = document.querySelector(`#load${i}`);
//     if(element)
//         loadElementArray.push(element);
// }
// for(let i = 1; i <= 3; i++){
//     const element = document.querySelector(`#feature${i}`);
//     if(element)
//         featElementArray.push(element);
// }
// for(let i = 1; i <= 3; i++){
//     const element = document.querySelector(`#type${i}`);
//     if(element)
//         typeElementArray.push(element);
// }
