var map = L.map('map');
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// export function drawRoute(data, len)
// {
// let waypoints = data.map(stop => L.latLng(stop.lat, stop.long));
L.Routing.control({
    waypoints: [
        L.latLng(1.3128447, 103.85989),
        L.latLng(1.30965, 103.857371),
        // L.latLng(1.31313, 103.85635),
        // L.latLng(1.314966, 103.857819)
    ]
}).addTo(map);
// }

// async function getBusDetails(busNumber) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/route/${busNumber}`);
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const data = await response.json();
//         const len = data.length;
//         for(let i = 0; i< len; i++){
//             drawRoute(data[i].lat, data[i].long);
//         }
//         console.log("Bus stop coordinates:", data);
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }