import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [formData, setFormData] = useState({
    originSkyId: "",
    destinationSkyId: "",
    originEntityId: "",
    destinationEntityId: "",
    date: "",
    returnDate: "",
    cabinClass: "economy",
    adults: 1,
    childrens: 0,
    infants: 0,
    sortBy: "best",
    currency: "USD",
    market: "en-US",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
    } = formData;

    if (
      !originSkyId ||
      !destinationSkyId ||
      !originEntityId ||
      !destinationEntityId ||
      !date
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            name="originSkyId"
            placeholder="Origin SkyId"
            value={formData.originSkyId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            name="destinationSkyId"
            placeholder="Destination SkyId"
            value={formData.destinationSkyId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            name="originEntityId"
            placeholder="Origin Entity ID"
            value={formData.originEntityId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            name="destinationEntityId"
            placeholder="Destination Entity ID"
            value={formData.destinationEntityId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="date"
            name="returnDate"
            placeholder="Return Date"
            value={formData.returnDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Search Flights
      </button>
    </form>
  );
}

export default SearchBar;
