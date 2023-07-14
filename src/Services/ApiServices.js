import axios from "axios";
const LOGIN_URL = "http://localhost:9800/login";

//--------- user login details ----------
export async function getLoginDetailsFromServer(formValues) {
    return axios.get(`http://localhost:9800/login/${formValues.username}/${formValues.password}`, formValues);
  }
  