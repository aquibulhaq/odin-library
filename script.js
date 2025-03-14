const myLibrary = [];

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

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Head First Design Patterns', 'Eric Freeman & Elisabeth Robson', 672, true);
