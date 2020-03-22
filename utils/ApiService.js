import Axios from "axios";
import config from "../config";

const GET_BLOG = `
  {
    repository(owner: "${config.username}", name: "${config.repoName}") {
      issues(first: 100, states: OPEN, filterBy: { labels: "blog", createdBy: "${config.username}" }) {
        nodes {
          title
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
          createdAt
          id
        }
      }
    }
  }
`;

const GET_SINGLE_BLOG = number => `
{
  repository(owner: "${config.username}", name: "${config.repoName}") {
    issue(number: ${number}){
      title
      body
      bodyHTML
      url
      bodyText
      number
      bodyHTML
      labels(first: 100) {
        nodes {
          color
          name
          id
        }
      }
      updatedAt
      createdAt
      reactions(first: 100) {
        totalCount,
        nodes {
          content
        }
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
    avatarUrl,
    company,
    location,
    websiteUrl
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

const getSingleBlogData = async number => {
  try {
    const res = await ApiService.post("/graphql", {
      query: GET_SINGLE_BLOG(number)
    });
    if (res.data.errors) {
      return Promise.reject({ errors: res.data.errors });
    }
    return Promise.resolve(res.data.data?.repository?.issue);
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
};

export { getBlogData, getUserData, getSingleBlogData };
export default ApiService;
