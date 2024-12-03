import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import FlightResults from "./components/FlightResults";
import ApiService from "./api/flights";

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({}); // Store formData in state

  const handleSearch = async (data) => {
    setLoading(true);
    setFormData(data); // Save the form data to state for access later

    try {
      // Fetch entityIds for origin and destination
      const originEntityId = await ApiService.searchAirport(data.originSkyId);
      const destinationEntityId = await ApiService.searchAirport(
        data.destinationSkyId
      );

      // Update formData with fetched entityIds
      const searchParams = {
        ...data,
        originEntityId,
        destinationEntityId,
      };

      // Call the searchFlights API
      const flightsData = await ApiService.searchFlights(searchParams);
      console.log("flightsData", flightsData);
      setFlights(flightsData.data.itineraries || []);
    } catch (error) {
      console.error("Error searching for flights:", error.message);
      alert(error.message); // Notify the user of the error
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Google Flights</h1>
      <SearchBar onSearch={(data) => handleSearch(data)} />
      <FlightResults
        flights={flights}
        loading={loading}
        searchDate={formData.date} // Access formData.date here
      />
    </div>
  );
}

export default App;
