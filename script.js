//get quote element
const quote = document.getElementById("quote")

//get authorName element
const authorName = document.getElementById("authorName")

//backgroundImage array - for now I am using only 3 images 
const backgroundImages = ['castle-by-water.png', 'cherry-blossom.png', 'star-trails.png']

//function to fetch new quote
async function getNewQuote() {
    const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const res = await response.json();
        
        quote.innerHTML = res.data.content
        authorName.innerHTML = res.data.author
    } catch (error) {
        console.error(error.message);
    }
}

function copyToClipboard() {
    window.navigator.clipboard.writeText(quote.innerHTML + " " + "\nAuthor: " + authorName.innerHTML)
}


function shareOnTwitter() {
    const shareURl = `https://twitter.com/intent/tweet?text=${quote.innerHTML} + " " + "\nAuthor: " + ${authorName.innerHTML}`;
    
    window.open(shareURl, "_blank");
}


function changeBackgroundImage() {
    const randomImageIndex = Math.floor(Math.random() * backgroundImages.length )

    const main = document.querySelector(".main")
    const quoteBox = document.querySelector(".quoteBox")
    main.style.background = `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(${backgroundImages[randomImageIndex]})`;
    quoteBox.style.backgroundImage = `url(${backgroundImages[randomImageIndex]})`;
}


const newQuoteBtn = document.getElementById("newQuoteBtn")

newQuoteBtn.addEventListener("click", (e) => {
    getNewQuote()
    changeBackgroundImage()
})


const copyBtn = document.getElementById("copyBtn")

copyBtn.addEventListener("click", (e) => {
    copyToClipboard()
    alert("Copied to Clipboard")
})


const shareBtn = document.getElementById("shareBtn")

shareBtn.addEventListener("click", (e) => {
    shareOnTwitter()
})


getNewQuote()
changeBackgroundImage()