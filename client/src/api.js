const baseurl = process.env.REACT_APP_SERVICE_URL;


async function get(endpoint){

    const token = window.localStorage.getItem('token');


    const url = `${baseurl}${endpoint}`;



    const response = await fetch(url);
    const result = await response.json();

    return { result, status: response.status};
}

export default {
    get,
}