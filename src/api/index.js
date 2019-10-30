import axios from 'axios';

export const getAll = async (url) => {
    const resp = await axios.get(url);
    return resp.data;
  };

  export const getAllBeers = async (url) => {
    const resp = await axios.get(url);
    const items = resp.data;
    const copy = [];
    console.log("Inside com did mont no exception");
    items.forEach(function (item) {
      copy.push({
        'age': 40,
        'id': item.id.toString(),
        'imageUrl': item.image_url,
        'name': item.name,
        'snippet': item.tagline
      });
    });
    return copy;
  };