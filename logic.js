import { DateTime } from './node_modules/luxon/src/luxon.js';


let today;
today = DateTime.now();
document.getElementById('date').innerHTML =
  today.toLocaleString(
    {weekday:'short', month:'short', day:'2-digit', hour:'2-digit', minute: '2-digit' });

const list = document.querySelector('.list');
const addNew = document.querySelector('.addNew');
const contact = document.querySelector('.contact');

addNew.addEventListener('click', () => {
  const form = document.getElementById('form');
  const contactSection = document.getElementById('contactSection');
  const listSection = document.getElementById('listSection');
  listSection.classList.add('hidden');
  contactSection.classList.add('hidden');
  form.classList.remove('hidden');
});

contact.addEventListener('click', () => {
  const form = document.getElementById('form');
  const contactSection = document.getElementById('contactSection');
  const listSection = document.getElementById('listSection');
  listSection.classList.add('hidden');
  form.classList.add('hidden');
  contactSection.classList.remove('hidden');
});

list.addEventListener('click', () => {
  const form = document.getElementById('form');
  const contactSection = document.getElementById('contactSection');
  const listSection = document.getElementById('listSection');
  form.classList.add('hidden');
  contactSection.classList.add('hidden');
  listSection.classList.remove('hidden');
});


const allBooks = document.querySelector('.all-books');
const form = document.querySelector('.form');
const [title, author] = form.elements;



const InitBooks = [
  {title: 'Das Kapital', author: 'Karl Marx'},
  {title: '1984', author:'George Orwell'},
  {title: 'The desing of everydat things', author:'Don Norman'}
];
localStorage.setItem('InitBooks', JSON.stringify(InitBooks))

const inputBook = {};
let books = [];

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    populateFields();
  }

  static addBook = (newBook) => {
    books.push(newBook);
    populateFields();
    this.displayBooks();
  };

  static displayBooks = () => {
    allBooks.innerHTML = '';
    books.map((book) => {
      const bookDiv = document.createElement('tr');
      const elementBook = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';

      elementBook.textContent = `"${book.title}" by ${book.author}`;

      bookDiv.classList.add('book-container');
      bookDiv.appendChild(elementBook);
      bookDiv.appendChild(deleteBtn);

      allBooks.appendChild(bookDiv);

      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        allBooks.removeChild(bookDiv);
      });
      return allBooks;
    });
  };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

Book.displayBooks();
populateFields();