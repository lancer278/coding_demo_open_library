import fetch from 'isomorphic-fetch';

const bl = () => fetch('http://localhost:8080/api/booklist')
    .then(response => response.json())

const fetchbooklist = Promise.resolve(bl)

export { fetchbooklist }