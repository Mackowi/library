let addButton = document.querySelector('.addButton');
let form = document.querySelector('form');

let testLib = [
    {
        title: 'Piesek Leszek',
        author: 'Maciek',
        year: '1969',
        read: 'Readed'
    },
    {
        title: 'Piesek Leszek 2',
        author: 'Maciek',
        year: '1996',
        read: 'Readed'
    },
];

let myLibrary = [];

function Book(title, author, year, read) {
    this.title  = title;
    this.author = author;
    this.year   = year;
    this.read   = read;

    this.toggleRead = function() {
        let titles = Array.from(document.querySelectorAll('.book>.title'))
        for (let title of titles) {
            if (title.textContent == this.title) {
                console.log(title);
                let read = title.parentElement.querySelector('.read');
                if (read.textContent == 'Readed' && this.read == 'Readed') {
                    this.read = 'Not Readed';
                    read.textContent = 'Not Readed'
                } else {
                    this.read = 'Readed'
                    read.textContent = 'Readed'
                }
            }
        }
    
    } 
}

function addBook(form) {
    let title = form[0].value;
    let author = form[1].value;
    let year = form[2].value;
    let read = (form[3].checked ? 'Readed':'Not Readed');
    let book = new Book(title, author, year, read);
    myLibrary.push(book);
    generateBook(book);
}

function generateBook(book) {
    // generate book div with all data 
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    let bookTitle = document.createElement('h3');
    bookTitle.classList.add('title');
    bookTitle.textContent = book.title;
    let bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    let bookYear = document.createElement('p');
    bookYear.textContent = book.year;
    let bookRead = document.createElement('p');
    bookRead.classList.add('read');
    bookRead.textContent = book.read;

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');

    deleteButton.addEventListener('click', () => {
        removeFromLibrary(bookTitle.textContent);
    })

    let buttonDel = document.createElement('img');
    buttonDel.src = './delete-outline.png';
    buttonDel.alt = 'delete icon';

    let readButton = document.createElement('button');
    readButton.classList.add('readButton');

    readButton.addEventListener('click', () => {
        book.toggleRead();
    })

    let buttonRead = document.createElement('img');
    buttonRead.src = './eye-refresh-outline.png';
    buttonRead.alt = 'read icon';
    // make one object from it
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookYear);
    bookDiv.appendChild(bookRead);
    deleteButton.appendChild(buttonDel);
    readButton.appendChild(buttonRead);
    bookDiv.appendChild(deleteButton);
    bookDiv.appendChild(readButton);
    // target books and add book
    let books = document.querySelector('.container');
    books.appendChild(bookDiv);
}

function checkForm(form) {
    if (!form[0].value || !form[1].value || !form[2].value) {
        return false 
    } else {
        return true;
    }
}

function clearForm(form) {
    form[0].value = '';
    form[1].value = '';
    form[2].value = '';
    form[3].checked = 0;
}

function generateLibrary() {
    myLibrary.forEach(book => {
        generateBook(book);
    });
}

function removeFromLibrary(title) {
    for (let book of myLibrary) {
        if (book.title == title) {
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            console.log(myLibrary);
        }
    }
    let books = document.querySelector('.container');
    books.replaceChildren();
    generateLibrary()
}

addButton.addEventListener('click', () => {
    let formOK = checkForm(form);
    if (formOK) {
        addBook(form);
        clearForm(form);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    generateLibrary()
})
