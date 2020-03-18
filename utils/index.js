import ApiService from "./ApiService";
import { getBlogData, getUserData, getSingleBlogData } from "./ApiService";

const redirect = params => {
    const { res, location, status = 302 } = params;
  
    if (res) {
      // Seems to be the version used by zeit
      res.writeHead(status, {
        Location: location,
        // Add the content-type for SEO considerations
        "Content-Type": "text/html; charset=utf-8"
      });
      res.end();
      return;
    }
  };

export { ApiService, getBlogData, getUserData, getSingleBlogData, redirect};
