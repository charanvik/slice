const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/planets', async (req, res) => {
    const requestData = req.body;

    const options = {
        method: 'POST',
        url: 'https://json.freeastrologyapi.com/planets',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'y9Jkhkq1ot9iLwQTCqicG7FlllPYblPR47F8kCxT'
        },
        data: {
            year: requestData.year,
            month: requestData.month,
            date: requestData.date,
            hours: requestData.hours,
            minutes: requestData.minutes,
            seconds: requestData.seconds,
            latitude: requestData.latitude,
            longitude: requestData.longitude,
            timezone: requestData.timezone,
            config: {
                observation_point: requestData.observation_point,
                ayanamsha: requestData.ayanamsha
            }
        }
    };

    try {
        const response = await axios(options);
        res.json(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error fetching data from astrology API',
            error: error.response ? error.response.data : error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});