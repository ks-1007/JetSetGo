// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file
import FlightList from "./FlightList";

function App() {
  const [flights, setFlights] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterByAirline, setFilterByAirline] = useState('');
  const [airlines, setAirlines] = useState([]);

  const handleFilterChange = (e) => {
    setFilterByAirline(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedFlights = flights.slice().sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return a.fare - b.fare;
    } else if (sortBy === 'priceDesc') {
      return b.fare - a.fare;
    }
  });

  const filteredFlights = filterByAirline ? sortedFlights.filter(flight => flight?.displayData?.airlines?.[0]?.airlineName === filterByAirline) : sortedFlights;


  useEffect(() => {
    axios
      .get("https://api.npoint.io/4829d4ab0e96bfab50e7")
      .then((response) => {
        const airlineData = response?.data?.data?.result
        setFlights(airlineData);
        const airlineList = {};
        airlineData.forEach(flight => {
          airlineList[flight?.displayData?.airlines?.[0]?.airlineName] = true;
        });
        setAirlines(Object.keys(airlineList));
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1 className="title">JetSetGo - Flight Search</h1>
      <div className="filters">
        <div className="filter-dropdown">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="priceAsc">Price: Low to high</option>
            <option value="priceDesc">Price: High to low</option>
          </select>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="filter">Filter by Airline:</label>
          <select id="filter" value={filterByAirline} onChange={handleFilterChange}>
            <option value="">All Airlines</option>
            {airlines.map(airline=><option value={airline} key={airline}>{airline}</option>)}
          </select>
        </div>
      </div>
      <FlightList flights={filteredFlights} />
    </div>
  );
}

export default App;
