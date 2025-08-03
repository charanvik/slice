document.getElementById('lookup-btn').addEventListener('click', async () => {
    const locationInput = document.getElementById('location');
    const latInput = document.getElementById('latitude');
    const lonInput = document.getElementById('longitude');
    const resultsContainer = document.getElementById('results');

    if (!locationInput.value) {
        resultsContainer.textContent = 'Please enter a location name.';
        return;
    }

    resultsContainer.textContent = 'Looking up coordinates...';

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput.value)}`);
        if (!response.ok) {
            throw new Error(`Nominatim API Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
            latInput.value = data[0].lat;
            lonInput.value = data[0].lon;
            resultsContainer.textContent = 'Coordinates found and populated.';
        } else {
            resultsContainer.textContent = 'Location not found.';
        }
    } catch (error) {
        resultsContainer.textContent = `Error: ${error.message}`;
    }
});

async function fetchDataAndRedirect(targetUrl) {
    const form = document.getElementById('astro-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convert numeric fields
    data.year = parseInt(data.year);
    data.month = parseInt(data.month);
    data.date = parseInt(data.date);
    data.hours = parseInt(data.hours);
    data.minutes = parseInt(data.minutes);
    data.seconds = parseInt(data.seconds);
    data.latitude = parseFloat(data.latitude);
    data.longitude = parseFloat(data.longitude);
    data.timezone = parseFloat(data.timezone);

    const resultsContainer = document.getElementById('results');
    resultsContainer.textContent = 'Loading...';

    try {
        const response = await fetch('/api/planets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        sessionStorage.setItem('astroData', JSON.stringify(result.output[0]));
        window.location.href = targetUrl;
    } catch (error) {
        resultsContainer.textContent = `Error: ${error.message}`;
    }
}

document.getElementById('get-chart-btn').addEventListener('click', (e) => {
    e.preventDefault();
    fetchDataAndRedirect('chart.html');
});

document.getElementById('get-table-btn').addEventListener('click', (e) => {
    e.preventDefault();
    fetchDataAndRedirect('table.html');
});