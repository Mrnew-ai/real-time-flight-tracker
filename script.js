document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function fetchFlightData() {
        const flightApiUrl = 'https://opensky-network.org/api/states/all';

        axios.get(flightApiUrl)
            .then(response => {
                const flights = response.data.states;
                flights.forEach(flight => {
                    if (flight[5] && flight[6]) {
                        const marker = L.marker([flight[6], flight[5]]).addTo(map);
                        marker.bindPopup(`<b>Flight:</b> ${flight[1]}<br><b>From:</b> ${flight[2]}<br><b>To:</b> ${flight[3]}`);
                        marker.on('click', () => {
                            fetchFlightSchedule(flight[1]);
                        });
                    }
                });
            })
            .catch(error => console.error('Error fetching flight data:', error));
    }

    function fetchFlightSchedule(flightNumber) {
        // Dummy schedule data for demonstration
        const schedule = `
            <b>Flight:</b> ${flightNumber}<br>
            <b>Departure:</b> 10:00 AM<br>
            <b>Arrival:</b> 12:00 PM<br>
            <b>Status:</b> On Time
        `;
        alert(schedule);
    }

    fetchFlightData();
});
