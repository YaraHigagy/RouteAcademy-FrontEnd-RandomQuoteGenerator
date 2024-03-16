// Database for quotes as an array of objects
// const quotes = [
//     {
//         quote_author: "Oscar Wilde",
//         quote_body: "Be yourself; everyone else is already taken.",
//         author_img_url: "https://picsum.photos/id/78/200/200",
//         author_img_alt: "Oscar-Wilde",
//         theme_color: "rgba(40, 112, 6, 0.5)",
//     },
//     {
//         quote_author: "Marilyn Monroe",
//         quote_body: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
//         author_img_url: "https://picsum.photos/id/12/200/200",
//         author_img_alt: "Marilyn-Monroe",
//         theme_color: "rgba(255, 0, 90, 0.5)",
//     },
//     {
//         quote_author: "Frank Zappa",
//         quote_body: "So many books, so little time.",
//         author_img_url: "https://picsum.photos/id/39/200/200",
//         author_img_alt: "Frank-Zappa",
//         theme_color: "rgba(110, 20, 0, 0.5)",
//     },
//     {
//         quote_author: "Albert Einstein",
//         quote_body: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
//         author_img_url: "https://picsum.photos/id/50/200/200",
//         author_img_alt: "Albert-Einstein",
//         theme_color: "rgba(35, 110, 230, 0.5)",
//     },
//     {
//         quote_author: "Marcus Tullius Cicero",
//         quote_body: "A room without books is like a body without a soul.",
//         author_img_url: "https://picsum.photos/id/48/200/200",
//         author_img_alt: "Marcus-Tullius-Cicero",
//         theme_color: "rgba(54, 6, 112, 0.5)",
//     },
// ]

// DB for quotes from https://dummyjson.com/docs/quotes website
//Get all Quotes
var data;
var myHttp = new XMLHttpRequest();
myHttp.open('GET', 'https://dummyjson.com/quotes');
myHttp.send();

myHttp.addEventListener('readystatechange', function() {
    if(myHttp.readyState === 4) {
        data = JSON.parse(myHttp.response);

        newQuoteBtn.addEventListener('click', function() {
            quoteRndIndex(data.quotes);
        })
    }
})




// Select elements bt Id
var quoteBody = document.getElementById("quote-body");
var quoteAuthor = document.getElementById("quote-author");
var authorImg = document.getElementById("author-img");
var quoteMark = document.getElementById("quote-mark");
var quateCard = document.getElementById("qoute-card");
var newQuoteBtn = document.getElementById("new-quote-btn");
var titleBox = document.querySelector("#title-box>div:first-child");

// Empty array to track repetition
var usedQuoteIndexArr = [];

function quoteRndIndex(quotes) {
    newQuoteBtn.classList.replace("btn-primary", "btn-success");
    quateCard.classList.replace("d-none", "container");
    titleBox.classList.replace("vh-100", "vh-auto");

    var rndIndex = Math.floor(Math.random() * quotes.length);
    
    if(rndIndex == usedQuoteIndexArr[usedQuoteIndexArr.length-1]) {
        if(rndIndex == 0) {
            rndIndex++;
        } else {
            rndIndex--;
        }
    }

    var authorFname = authorFnameForImgAlt(quotes[rndIndex].author)
    var quoteLgWords = quoteLgWordsForImgAlt(quotes[rndIndex].quote)

    quoteBody.innerHTML = quotes[rndIndex].quote;
    quoteAuthor.innerHTML = quotes[rndIndex].author;
    authorImg.src = `https://picsum.photos/id/${rndIndex}/200/200`;
    authorImg.alt = `${authorFname} - ${quoteLgWords}`;
    quoteMark.style.color = rndColor();

    if(usedQuoteIndexArr.length >= 2) {
        usedQuoteIndexArr.shift();
    }
    usedQuoteIndexArr.push(rndIndex);
}

function rndColor() {
    return `rgba(
        ${Math.floor(Math.random() * 255)}
        , ${Math.floor(Math.random() * 255)}
        , ${Math.floor(Math.random() * 255)}
        , 0.5)`;
}

function authorFnameForImgAlt(str) {
    let arr = str.split(' ');
    return arr[0];
}

function quoteLgWordsForImgAlt(str) {
    let allWords = '';
    let arr = str.split(' ');
    for(i = 0; i < arr.length-1; i++) {
        if(arr[i].length >= 5) {
            allWords += arr[i] + '-';
            // if(arr[i] != arr[arr.length-1]) {
            //     allWords += '-';
            // }
        }
    }
    allWords += arr[arr.length-1];
    return allWords;
}