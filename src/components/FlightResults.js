import React, { useState } from "react";

function FlightResults({ flights, loading, searchDate }) {
  const [filters, setFilters] = useState({
    stops: "all", // Options: "all", "nonstop", "1", "2+"
    airlines: "all", // Filter by airline name
    price: "all", // Options: "all", "low-to-high", "high-to-low"
    duration: "all", // Options: "all", "shortest", "longest"
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredFlights = flights
    .filter((flight) => {
      const flightDate = new Date(flight.legs[0].departure)
        .toISOString()
        .split("T")[0];

      if (flightDate !== searchDate) return false;

      if (
        filters.stops !== "all" &&
        (filters.stops === "nonstop"
          ? flight.legs[0].stopCount !== 0
          : filters.stops === "1"
          ? flight.legs[0].stopCount !== 1
          : filters.stops === "2+" && flight.legs[0].stopCount < 2)
      ) {
        return false;
      }

      if (
        filters.airlines !== "all" &&
        !flight.legs[0].carriers.marketing.some(
          (carrier) => carrier.name === filters.airlines
        )
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.price === "low-to-high") return a.price.raw - b.price.raw;
      if (filters.price === "high-to-low") return b.price.raw - a.price.raw;

      if (filters.duration === "shortest")
        return a.legs[0].durationInMinutes - b.legs[0].durationInMinutes;

      if (filters.duration === "longest")
        return b.legs[0].durationInMinutes - a.legs[0].durationInMinutes;

      return 0;
    });

  const lowestPrice = Math.min(...flights.map((flight) => flight.price.raw));

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      {/* Filters */}
      {flights.length > 0 && (
        <div className="mb-4 d-flex flex-wrap justify-content-between align-items-center">
          <label>
            Stops:
            <select
              name="stops"
              value={filters.stops}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="nonstop">Nonstop</option>
              <option value="1">1 Stop</option>
              <option value="2+">2+ Stops</option>
            </select>
          </label>

          <label>
            Airlines:
            <select
              name="airlines"
              value={filters.airlines}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="all">All Airlines</option>
              {flights
                .reduce((uniqueAirlines, flight) => {
                  flight.legs[0].carriers.marketing.forEach((carrier) => {
                    if (!uniqueAirlines.includes(carrier.name)) {
                      uniqueAirlines.push(carrier.name);
                    }
                  });
                  return uniqueAirlines;
                }, [])
                .map((airline, index) => (
                  <option key={index} value={airline}>
                    {airline}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Price:
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="all">Default</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </label>

          <label>
            Duration:
            <select
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="all">All Durations</option>
              <option value="shortest">Shortest</option>
              <option value="longest">Longest</option>
            </select>
          </label>
        </div>
      )}

      {/* Results */}
      {filteredFlights.length > 0 ? (
        <div className="list-group">
          {filteredFlights.map((flight, index) => (
            <div key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <img
                    src={flight.legs[0].carriers.marketing[0].logoUrl}
                    alt={flight.legs[0].carriers.marketing[0].name}
                    style={{ width: "40px", marginRight: "10px" }}
                  />
                  <span className="fw-bold">
                    {flight.legs[0].carriers.marketing
                      .map((carrier) => carrier.name)
                      .join(" · ")}
                  </span>
                </div>
                <div className="text-muted">
                  {flight.legs[0].origin.displayCode} →{" "}
                  {flight.legs[0].destination.displayCode}
                </div>
                <div>
                  {flight.price.raw === lowestPrice ? (
                    <span className="text-success fw-bold">
                      {flight.price.formatted}
                    </span>
                  ) : (
                    <span>{flight.price.formatted}</span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div>
                  {new Date(flight.legs[0].departure).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(flight.legs[0].arrival).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>{formatDuration(flight.legs[0].durationInMinutes)}</div>
                <div>
                  {flight.legs[0].stopCount === 0
                    ? "Nonstop"
                    : `${flight.legs[0].stopCount} Stop(s)`}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted">
          No flights match your selection.
        </div>
      )}
    </div>
  );
}

export default FlightResults;
