const myLibrary = [];
const tbody = document.querySelector('tbody');
const newBookBtn = document.querySelector('.new-book');
const dialog = document.querySelector('dialog');

function Book(title, author, pages, read) {
  if (!new.target)
    throw Error("You must use the 'new' operator to call the constructor");

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

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
  readTd.textContent = book['read'] ? 'Yes' : 'No';
  tr.appendChild(readTd);

  tbody.appendChild(tr);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Head First Design Patterns', 'Eric Freeman & Elisabeth Robson', 672, true);

myLibrary.forEach(displayBookinTable);

newBookBtn.addEventListener('click', () => {
  dialog.showModal();
});
