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
  /**
   * Fetch the entityId for a given skyId (city or airport name)
   * @param {string} query - The city or airport name to search for.
   * @returns {Promise<string>} - The entityId of the matching city/airport.
   */
  searchAirport: async (query) => {
    if (!query || query.trim().length < 3) {
      throw new Error(
        "Please enter a valid city or airport name with at least 3 characters."
      );
    }

    try {
      const response = await axiosInstance.get("/searchAirport", {
        params: {
          query,
          locale: "en-US",
        },
      });

      console.log("Search Airport API Response:", response.data);

      // Check if the response contains data
      if (response.data.status && response.data.data.length > 0) {
        // Logic to choose the most relevant entity
        const relevantEntry = response.data.data.find(
          (item) =>
            item.skyId === query.toUpperCase() ||
            item.presentation.title.toLowerCase().includes(query.toLowerCase())
        );

        if (relevantEntry) {
          return relevantEntry.navigation.entityId; // Return the relevant entityId
        } else {
          throw new Error(
            `No matching airport found for "${query}". Please refine your search.`
          );
        }
      } else {
        throw new Error(
          `No matching airport found for "${query}". Please refine your search.`
        );
      }
    } catch (error) {
      console.error(
        "Error fetching airport entityId:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Search for flights using skyId and entityId for origin and destination.
   * @param {object} params - The search parameters for the flights API.
   * @returns {Promise<object>} - The flight search results.
   */
  searchFlights: async ({
    originSkyId,
    destinationSkyId,
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
    if (!originSkyId || !destinationSkyId || !date) {
      throw new Error(
        "Origin SkyId, Destination SkyId, and Date are required."
      );
    }

    try {
      // Fetch entityId for origin and destination
      const originEntityId = await ApiService.searchAirport(originSkyId);
      const destinationEntityId = await ApiService.searchAirport(
        destinationSkyId
      );

      // Call the searchFlights API
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
