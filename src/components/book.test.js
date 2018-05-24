import React from 'react';
import ReactDOM from 'react-dom';
import Book from './book';

const props = {}
props.book = {"publishers": [{"name": "S.H. Goetzel"}], "pagination": "368 p. ;", "identifiers": {"openlibrary": ["OL24364628M"]}, "title": "Great expectations", "url": "https://openlibrary.org/books/OL24364628M/Great_expectations", "number_of_pages": 368, "cover": {"small": "https://covers.openlibrary.org/b/id/6995592-S.jpg", "large": "https://covers.openlibrary.org/b/id/6995592-L.jpg", "medium": "https://covers.openlibrary.org/b/id/6995592-M.jpg"}, "publish_date": "1863", "key": "/books/OL24364628M", "by_statement": "by Charles Dickens", "publish_places": [{"name": "Mobile"}], "ebooks": [{"formats": {"pdf": {"url": "https://archive.org/download/greatexpectatio00dick/greatexpectatio00dick.pdf"}, "epub": {"url": "https://archive.org/download/greatexpectatio00dick/greatexpectatio00dick.epub"}, "text": {"url": "https://archive.org/download/greatexpectatio00dick/greatexpectatio00dick_djvu.txt"}}, "preview_url": "https://archive.org/details/greatexpectatio00dick", "read_url": "https://archive.org/stream/greatexpectatio00dick", "availability": "full"}]}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Book book={props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
