import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [formData, setFormData] = useState({
    originSkyId: "",
    destinationSkyId: "",
    date: "", // Required departure date
    returnDate: "", // Optional return date
    cabinClass: "economy",
    adults: 1,
    childrens: 0,
    infants: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { originSkyId, destinationSkyId, date } = formData;

    if (!originSkyId || !destinationSkyId || !date) {
      alert("Please fill out all required fields.");
      return;
    }

    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="row">
        {/* Origin SkyId */}
        <div className="col-md-6 mb-3">
          <label htmlFor="originSkyId" className="form-label">
            Origin SkyId <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="originSkyId"
            id="originSkyId"
            placeholder="Enter origin city or airport"
            value={formData.originSkyId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Destination SkyId */}
        <div className="col-md-6 mb-3">
          <label htmlFor="destinationSkyId" className="form-label">
            Destination SkyId <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="destinationSkyId"
            id="destinationSkyId"
            placeholder="Enter destination city or airport"
            value={formData.destinationSkyId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Departure Date */}
        <div className="col-md-6 mb-3">
          <label htmlFor="date" className="form-label">
            Departure Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Return Date */}
        <div className="col-md-6 mb-3">
          <label htmlFor="returnDate" className="form-label">
            Return Date (Optional)
          </label>
          <input
            type="date"
            name="returnDate"
            id="returnDate"
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
