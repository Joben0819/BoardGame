import axios from "axios";
;
const Request2 = axios.create({
  // baseURL: 'https://bat.acemali.com/',
  baseURL: '',
  timeout: 1000000000000000,
  headers: {'X-Custom-Header': 'foobar', "Access-Control-Allow-Origin": "*", }
});

export default Request2;