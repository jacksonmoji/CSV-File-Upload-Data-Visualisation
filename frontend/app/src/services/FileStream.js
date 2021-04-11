import { API_SERVER, POST, GET, API_VERSION } from "../settings";
const axios = require("axios").default;

const fileStream = async (request_type, file_type, data) => {
  let response;
  const url = API_SERVER + API_VERSION + file_type;
  try {
    //ALL MODELS REQUEST GROUP
    if (request_type === POST) {
      response = await axios.post(url, data);
    }
    if (request_type === GET) {
      response = await axios.get(url);
    }
    return response;
  } catch (error) {
    return error;
  }
};

export default fileStream;
