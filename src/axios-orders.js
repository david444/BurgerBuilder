import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-a36b6.firebaseio.com/'
});

export default instance;