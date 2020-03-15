import Axios from "axios";

const Service = Axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  }
});

export default Service;