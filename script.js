'use strict';

const tbody = document.querySelector('tbody');

const newBookBtn = document.querySelector('.new-book');

const dialog = document.querySelector('dialog');

const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
const pagesField = document.querySelector('#pages');
const readField = document.querySelector('#read');

const cancelBtn = document.querySelector('.cancel');
const submitBtn = document.querySelector('.submit');

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    return this.read = !this.read;
  }
}

const library = (function Library() {
  const books = [];

  const addBook = (book) => books.push(book);

  const removeBookById = (id) => {
    const index = books.findIndex((book) => book.id === id);
    if (index >= 0)
      books.splice(index, 1);
  };

  return {
    get books() {
      return books;
    },
    addBook,
    removeBookById,
  };
})();

function displayBookinTable(book) {
  const tr = document.createElement('tr');

  const titleTd = document.createElement('td');
  titleTd.textContent = book['title'] ?? '';
  tr.appendChild(titleTd);

  const authorTd = document.createElement('td');
  authorTd.textContent = book['author'] ?? '';
  tr.appendChild(authorTd);

  const pagesTd = document.createElement('td');
  pagesTd.textContent = book['pages'] ?? 0;
  tr.appendChild(pagesTd);

  const readTd = document.createElement('td');

  const readChk = document.createElement('input');
  readChk.type = 'checkbox';
  readChk.checked = book['read'];
  readChk.addEventListener('click', () => {
    book.toggleRead();
  });

  readTd.appendChild(readChk);
  tr.appendChild(readTd);

  const removeTd = document.createElement('td');

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  removeBtn.innerText = 'Remove Book';

  const id = book.id;
  removeBtn.addEventListener('click', () => {
    tbody.removeChild(tr);

    library.removeBookById(id);
  });

  removeTd.appendChild(removeBtn);
  tr.appendChild(removeTd);

  tbody.appendChild(tr);
}

library.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
library.addBook(new Book('Head First Design Patterns', 'Eric Freeman & Elisabeth Robson', 672, true));

library.books.forEach(displayBookinTable);

newBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.close();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const title = titleField.value;
  const author = authorField.value;
  const pages = Number(pagesField.value);

  if (!title || !author || pages < 0 || !Number.isInteger(pages)) {
    console.log(`Got invalid values: title="${title}", author="${author}", pages=${pages}`);
    dialog.close();
    return;
  }

  const read = readField.checked;

  const book = new Book(title, author, pages, read);
  library.addBook(book);
  displayBookinTable(book);

  dialog.close();
});
