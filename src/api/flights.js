import axios from "axios";

const API_BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1/flights";
const API_KEY = "a5151a1c9bmshc3329cbea2f09ecp1e4d9bjsn62e55c22b51a"; // Replace with your actual RapidAPI key

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    "X-RapidAPI-Key": API_KEY,
  },
});

// API Methods
const ApiService = {
  searchFlights: async ({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    returnDate,
    cabinClass = "economy",
    adults = 1,
    childrens = 0,
    infants = 0,
    sortBy = "best",
    currency = "USD",
    market = "en-US",
  }) => {
    if (
      !originSkyId ||
      !destinationSkyId ||
      !originEntityId ||
      !destinationEntityId ||
      !date
    ) {
      throw new Error(
        "Origin SkyId, Destination SkyId, Origin Entity ID, Destination Entity ID, and Date are required."
      );
    }

    try {
      const response = await axiosInstance.get("/searchFlights", {
        params: {
          originSkyId,
          destinationSkyId,
          originEntityId,
          destinationEntityId,
          date,
          returnDate,
          cabinClass,
          adults,
          childrens,
          infants,
          sortBy,
          currency,
          market,
        },
      });
      console.log("Flight Search Response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching flights:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default ApiService;
