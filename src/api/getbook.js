import request from './request';

const booklist = () => request('http://localhost:8080/api/book/${bookid}')

export { book } 