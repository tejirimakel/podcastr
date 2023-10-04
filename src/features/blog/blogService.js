import axios from 'axios';

const API_URL = 'https://apva.africa/wp-json/wp/v2/posts?per_page=6';

// Get Blog Posts
const getBlogPosts = async (page = 1) => {
  const response = await axios.get(API_URL + (page > 1 ? `&page=${page}` : ''));

  return response.data;
};

const countrieservice = {
  getBlogPosts,
};

export default countrieservice;
