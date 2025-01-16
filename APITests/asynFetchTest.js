
const accKey = 'zdizZc8xTyCj7yKmxA0Dgg==';
busStopCode = '83139';
const url = 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=47619';

async function BusArrival() {
   try {
      const response = await fetch(url, {
        headers: {
            AccountKey: accKey,
            Accept: 'application/json' // Optional, JSON is default
         }
      });
      if(response.ok)
      {
         const data = await response.json();
         console.log("Bus arrival data:", data.Services[1].ServiceNo);
      }
      else {
        console.error(`HTTP Error: ${response.status}`);
     }
   } catch (error) {
      console.error("Error fetching bus arrival data:", error);
   }
}
BusArrival();
// console.log("test");