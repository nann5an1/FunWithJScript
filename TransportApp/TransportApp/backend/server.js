import dotenv from 'dotenv';
import axios from 'axios';
import express from 'express';
import cors from 'cors';


dotenv.config()
const app = express();
const PORT = process.env.PORT || 5500;

// Configure CORS
app.use(
    cors({
        origin: 'http://127.0.0.1:5500', // Allow requests only from this origin
        methods: ['GET', 'POST'], // Allow these HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    })
);

const APIKey = process.env.API_KEY;
// const CORS_PROXY = process.env.CORS_PROXY;
const GENERAL_API = 'https://datamall2.mytransport.sg/ltaodataservice';

//Getting a request to external API using axios and creating endpoint for the frontend to retrieve bus arrival data
app.get('/api/data/:busStopCode', async (req, res) => {
    const busStopCode = req.params.busStopCode;
    const apiURL = `${GENERAL_API}/v3/BusArrival?BusStopCode=${busStopCode}`;

    try {
        const response = await axios.get(apiURL, {
            headers: {
                AccountKey: APIKey, // Ensure this is your valid API key
                Accept: 'application/json',
            },
        });
        console.log(response.data);
        res.json(response.data); // Send the response data to the frontend
    } catch (error) {
        // Log detailed error information for debugging
        if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Status Code:', error.response.status);
            console.error('Error Headers:', error.response.headers);
            res.status(error.response.status).send(error.response.data || 'Error fetching data from API');
        } else if (error.request) {
            console.error('No response received:', error.request);
            res.status(500).send('No response received from API');
        } else {
            console.error('Request setup error:', error.message);
            res.status(500).send('Error setting up the request');
        }
    }
});



app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});