import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import FlightResults from "./components/FlightResults";
import ApiService from "./api/flights";

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      const data = await ApiService.searchFlights(searchParams);
      if (data.status) {
        setFlights(data.data.itineraries || []);
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Error searching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Google Flights Clone</h1>
      <div className="row">
        <div className="col-12 mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="col-12">
          <FlightResults flights={flights} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
