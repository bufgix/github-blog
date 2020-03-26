import Axios from "axios";
import config from "../config";

String.prototype.capitalizeWords = function() {
  return this.split(" ")
    .map(function(ele) {
      return ele[0].toUpperCase() + ele.slice(1).toLowerCase();
    })
    .join(" ");
};

const GET_BLOG = (label = "blog") => `
  {
    repository(owner: "${config.username}", name: "${config.repoName}") {
      issues(first: 100, states: OPEN, filterBy: { labels: "${label}", createdBy: "${config.username}" }) {
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
      comments(first: 100) {
        totalCount
        nodes {
          author {
            login
            avatarUrl
          }
          body
          createdAt
          updatedAt
          lastEditedAt
          reactions(first: 100) {
            totalCount
            nodes {
              content
              user {
                login
              }
            }
          }
        }
      }
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
          user {
            login
          }
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

const getBlogData = async (label = "blog") => {
  try {
    const res = await ApiService.post("/graphql", {
      query: GET_BLOG(label.capitalizeWords())
    });
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
