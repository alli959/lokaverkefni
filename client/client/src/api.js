const baseurl = "http://localhost:5000";


async function get(endpoint){



    const url = `${baseurl}${endpoint}`;

    console.log("url",url);

    const response = await fetch(url);
    const result = await response.json();

    return { result, status: response.status};
}

async function post(endpoint, data) {
    const url = `${baseurl}${endpoint}`;
  
    const options = {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    };
  
  
    const response = await fetch(url, options);
    const result = await response.json();
  
    return { result, status: response.status };
  }
  

export default {
    get, post,
}