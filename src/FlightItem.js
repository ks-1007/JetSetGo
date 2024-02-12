import moment from "moment/moment";
import React from "react";

function FlightItem({ flight }) {
  const { displayData } = flight;
  return (
    <div className="flight-item">
      <h2>{displayData?.airlines?.[0]?.airlineName}</h2>
      <span>
        {displayData?.source?.airport?.cityName} -{" "}
        {displayData?.destination?.airport?.cityName}
      </span>
      <p><span>Departure: </span>{moment(displayData?.source?.depTime).format('hh:mm')} - <span>Arrival: </span>{moment(displayData?.destination?.arrTime).format('hh:mm')}</p>
      <p><span>Total duration: </span>{displayData?.totalDuration}</p>
      <p><span>Price: </span>${flight.fare}</p>
    </div>
  );
}

export default FlightItem;
