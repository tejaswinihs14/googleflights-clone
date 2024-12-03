import React from "react";

function FlightResults({ flights, loading }) {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="text-center text-muted">
        No flights found. Try another search!
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center">Available Flights</h2>
      <div className="row">
        {flights.map((flight, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {flight.legs[0].origin.name} (
                  {flight.legs[0].origin.displayCode}) →{" "}
                  {flight.legs[0].destination.name} (
                  {flight.legs[0].destination.displayCode})
                </h5>
                <p className="card-text">
                  <strong>Price:</strong> {flight.price.formatted}
                </p>
                <p className="card-text">
                  <strong>Departure:</strong>{" "}
                  {new Date(flight.legs[0].departure).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Arrival:</strong>{" "}
                  {new Date(flight.legs[0].arrival).toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Duration:</strong>{" "}
                  {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
                  {flight.legs[0].durationInMinutes % 60}m
                </p>
                <p className="card-text">
                  <strong>Stops:</strong>{" "}
                  {flight.legs[0].stopCount === 0
                    ? "Direct"
                    : flight.legs[0].stopCount}
                </p>
                <p className="card-text">
                  <strong>Airlines:</strong>
                </p>
                <ul>
                  {flight.legs[0].carriers.marketing.map((carrier, idx) => (
                    <li key={idx}>
                      <img
                        src={carrier.logoUrl}
                        alt={carrier.name}
                        className="me-2"
                        style={{ width: "20px" }}
                      />
                      {carrier.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightResults;
