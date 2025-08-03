
const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://json.freeastrologyapi.com/planets',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'y9Jkhkq1ot9iLwQTCqicG7FlllPYblPR47F8kCxT'
  },
  data: {
    "year": 2022,
    "month": 8,
    "date": 11,
    "hours": 6,
    "minutes": 0,
    "seconds": 0,
    "latitude": 17.38333,
    "longitude": 78.4666,
    "timezone": 5.5,
    "config": {
      "observation_point": "topocentric",
      "ayanamsha": "lahiri"
    }
  }
};

axios(options)
  .then(response => {
    console.log(JSON.stringify(response.data, null, 4));
  })
  .catch(error => {
    console.error(error.response ? error.response.data : error.message);
  });
