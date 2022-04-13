const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loading 
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete () {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New quotes
//function newQuote(){
  //pick a random quotes array
//  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//  console.log(quote);
//}

function newQuote(){
  const quote = apiQuotes[Math.floor(Math.random()* localQuotes.length)];
  // check if author is unknown
  if(!quote.author){
    authorText.textContent = 'Unknown'
  }else {
    authorText.textContent = quote.author;
  }
  if(quote.text.length > 50 ){quoteText.classList.add('long-quote');}else{quoteText.classList.remove('long-quote')};
  quoteText.textContent = quote.text;
  complete();
}

//Get quotes api
async function getQuotes(){
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const res =  await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuote();
  }catch(err){
    console.log(err)
  }
}

//Tweet quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,'_blank');
}

//Even listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// on load;
getQuotes();
//newQuote();
