import React from "react";
import FlightItem from "./FlightItem";

function FlightList({ flights }) {
  return (
    <div className="flight-list">
      {flights.map((flight) => (
        <FlightItem key={flight.id} flight={flight} />
      ))}
    </div>
  );
}

export default FlightList;
