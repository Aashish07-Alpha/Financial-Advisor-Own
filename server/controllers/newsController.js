const axios = require("axios");

const getNews = async (req, res) => {
  const { type, query } = req.query;
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    console.error("NEWS_API_KEY is not defined in server environment variables.");
    return res.status(500).json({
      status: "error",
      message: "Server configuration error: NEWS_API_KEY is missing."
    });
  }

  const BASE_URL = "https://newsapi.org/v2";
  let url;

  if (query) {
    url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
  } else {
    switch (type) {
      case "top":
        url = `${BASE_URL}/everything?q=finance+AND+India&apiKey=${API_KEY}`;
        break;
      case "entrepreneurs":
        url = `${BASE_URL}/everything?q=finance+OR+investment+OR+savings&apiKey=${API_KEY}`;
        break;
      case "business-hindi":
        url = `${BASE_URL}/everything?q=finance+OR+money+OR+business+OR+investment+OR+saving&language=hi&apiKey=${API_KEY}`;
        break;
      default:
        url = `${BASE_URL}/everything?q=finance+AND+India&apiKey=${API_KEY}`;
    }
  }

  try {
    // Console log query for debugging (censoring the API key)
    console.log(`[News API Proxy] Fetching from NewsAPI: ${url.replace(API_KEY, "HIDDEN_KEY")}`);
    const response = await axios.get(url);
    
    // Return the response directly to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error.response ? error.response.data : error.message);
    
    const statusCode = error.response ? error.response.status : 500;
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : "Failed to fetch news from NewsAPI";

    return res.status(statusCode).json({
      status: "error",
      message: errorMessage
    });
  }
};

module.exports = {
  getNews
};
