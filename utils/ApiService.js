import Axios from "axios";
import config from "../config";

const GET_BLOG = `
  {
    repository(owner: "${config.username}", name: "${config.repoName}") {
      issues(first: 100, states: OPEN, filterBy: { labels: "blog", createdBy: "${config.username}" }) {
        nodes {
          title
          body
          bodyHTML
          bodyText
          number
          labels(first: 100) {
            nodes {
              color
              name
              id
            }
          }
          updatedAt
          id
        }
      }
    }
  }
`;

const GET_USER = `
{
  user(login: "${config.username}"){
    bio,
    name,
    email,
    url,
    avatarUrl
  }
}
`;

const ApiService = Axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  }
});

const getBlogData = async () => {
  try {
    const res = await ApiService.post("/graphql", { query: GET_BLOG });
    if (res.data.errors) {
      return Promise.reject({ errors: res.data.errors });
    }
    return Promise.resolve(res.data.data?.repository?.issues?.nodes);
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
};

const getUserData = async () => {
  try {
    const res = await ApiService.post("/graphql", { query: GET_USER });
    if (res.data.errors) {
      return Promise.reject({ errors: res.data.errors });
    }
    return Promise.resolve(res.data.data?.user);
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
};

export { getBlogData, getUserData };
export default ApiService;
