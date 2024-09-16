const addBtn = document.querySelector("#addBtn");
const bookDisplay = document.querySelector(".main");
const delBook = document.querySelector("#delBook");
const delForm = document.querySelector("#delForm");
const confirmDel = document.querySelector("#confirmDel");
const cancelDel = document.querySelector("#cancelDel");
const AddingBook = document.querySelector("#AddingBook");
const AddingForm = document.querySelector("#AddingForm");
const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");

const myLibrary = [];
let removeIndex = -1;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === 'true'; // Ensure read is boolean
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks(); // Refresh the display after adding a book
}

function displayBooks() {
    bookDisplay.textContent = ""; // Clear existing books
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement("div");

        const title = document.createElement("p");
        title.textContent = `Title: ${book.title}`;
        title.className = "title";

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement("button");
        read.textContent = book.read ? "Read" : "Not Read";
        read.style.backgroundColor = book.read ? "green" : "red";
        read.style.color = "white";
        read.addEventListener("click", () => {
            book.read = !book.read;
            displayBooks();
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete Book";
        removeBtn.style.color = "white";
        removeBtn.style.backgroundColor = "grey";
        removeBtn.addEventListener("click", () => {
            removeIndex = index;
            delBook.showModal();
        });

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(read);
        bookDiv.appendChild(removeBtn);

        bookDiv.classList.add("book-card");

        bookDisplay.appendChild(bookDiv);
    });
}

addBtn.addEventListener("click", () => {
    AddingBook.showModal();
});

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    AddingBook.close();
    AddingForm.reset();
});

cancelDel.addEventListener("click", (e) => {
    e.preventDefault();
    delBook.close();
    delForm.reset();
});

confirmDel.addEventListener("click", (e) => {
    e.preventDefault();
    if (removeIndex > -1) {
        myLibrary.splice(removeIndex, 1);
        displayBooks();
    }
    delBook.close();
    delForm.reset();
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    let addBook = new Book(title, author, pages, read);
    addBookToLibrary(addBook);
    AddingBook.close();
    AddingForm.reset();
});

// Initial sample books
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary(book1);
let book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary(book2);
