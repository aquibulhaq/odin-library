const myLibrary = [];
const tbody = document.querySelector('tbody');

const newBookBtn = document.querySelector('.new-book');

const dialog = document.querySelector('dialog');

const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
const pagesField = document.querySelector('#pages');
const readField = document.querySelector('#read');

const cancelBtn = document.querySelector('.cancel');
const submitBtn = document.querySelector('.submit');

function Book(title, author, pages, read) {
  if (!new.target)
    throw Error("You must use the 'new' operator to call the constructor");

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  return this.read = !this.read;
};

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

    const idx = myLibrary.findIndex(elem => elem.id === id);
    if (idx >= 0)
      myLibrary.splice(idx, 1);
  });

  removeTd.appendChild(removeBtn);
  tr.appendChild(removeTd);

  tbody.appendChild(tr);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Head First Design Patterns', 'Eric Freeman & Elisabeth Robson', 672, true);

myLibrary.forEach(displayBookinTable);

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

  const book = addBookToLibrary(title, author, pages, read);
  displayBookinTable(book);

  dialog.close();
});
