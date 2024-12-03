import React from "react";

function FlightResults({ flights, loading, searchDate }) {
  console.log(flights, loading, searchDate);
  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.legs[0].departure)
      .toISOString()
      .split("T")[0];
    return flightDate === searchDate; // Ensure same format
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!filteredFlights || filteredFlights.length === 0) {
    return (
      <div className="text-center text-muted">
        No flights found for the selected date.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mb-4">Available Flights</h2>
      <div className="list-group">
        {filteredFlights.map((flight, index) => (
          <div key={index} className="list-group-item p-4 mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              {/* Flight timing and duration */}
              <div>
                <h5 className="mb-0">
                  {new Date(flight.legs[0].departure).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(flight.legs[0].arrival).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h5>
                <small>
                  {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
                  {flight.legs[0].durationInMinutes % 60}m
                </small>
              </div>

              {/* Stops */}
              <div>
                {flight.legs[0].stopCount === 0 ? (
                  <span>Nonstop</span>
                ) : (
                  <span>{flight.legs[0].stopCount} stop(s)</span>
                )}
              </div>

              {/* Price */}
              <div>
                <h5 className="text-success">{flight.price.formatted}</h5>
              </div>
            </div>

            {/* Additional details */}
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <div>
                <strong>{flight.legs[0].origin.displayCode}</strong> →{" "}
                <strong>{flight.legs[0].destination.displayCode}</strong>
              </div>
              <div>
                <img
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={flight.legs[0].carriers.marketing[0].name}
                  className="me-2"
                  style={{ width: "30px" }}
                />
                {flight.legs[0].carriers.marketing[0].name}
              </div>
            </div>

            {/* CO2 emission (optional) */}
            {flight.eco?.ecoContenderDelta && (
              <div className="mt-2 text-muted">
                Avoids as much CO2 as{" "}
                <strong>{flight.eco.ecoContenderDelta} trees</strong> absorb in
                a day
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightResults;
