const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const API_KEY = "8Mqg6DKG2lQqb7zOkdz7Ghs6Az9GqwqR";
let   url;
let   pageNumber = 0;

const searchInput  = document.querySelector('#search');
const startDate    = document.querySelector('#start-date');
const endDate      = document.querySelector('#end-date');
const submitButton = document.querySelector('.submit');
const prevButton   = document.querySelector('.prev');
const nextButton   = document.querySelector('.next');
const section      = document.querySelector('section');


submitButton.addEventListener('click', submitSearch);
nextButton.addEventListener('click', nextPage);
prevButton.addEventListener('click', prevPage);


function submitSearch(e){
    pageNumber = 0;
    fetchResults(e);
}

function fetchResults(e){
    e.preventDefault();
    url = baseURL
    + '?api-key=' + API_KEY
    + '&q=' + searchInput.value
    + '&page=' + pageNumber
    + '&sort=newest'
    + '&fq=document_type:("article")'

    fetch(url)
    .then(function(result){ return result.json();})
    .then(function(json){ displayResults(json); })
    .catch(error => console.log(error.message));

}

function displayResults(json){
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    
    const articles = json.response.docs;

    for (let i = 0; i < articles.length; i++) {
        const article  = document.createElement('article');
        const headline = document.createElement('h2');
        const link     = document.createElement('a');
        const img      = document.createElement('img');
        const p1  = document.createElement('p');
        const p2 = document.createElement('p');
        const pubdate  = document.createElement('span');
        const source   = document.createElement('span');
        let current = articles[i];
        console.log(current);

        link.href = current.web_url;
        link.textContent = current.headline.main;

        if(current.multimedia.length > 0){
            img.src = 'https://www.nytimes.com/' + current.multimedia[19].url;
            img.alt = current.headline.main;
        } 

        p1.textContent = current.snippet;
        p2.textContent = "Keywords: ";
        pubdate.textContent = current.pub_date;
        source.textContent  = current.source;

        for (let j = 0; j < current.keywords.length; j++) {
            let span = document.createElement('span');
            span.textContent += current.keywords[j].value + ' / ';
            p2.appendChild(span);
        // }
        }

        article.appendChild(headline);
        headline.appendChild(link);
        article.appendChild(img);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(pubdate);
        article.appendChild(source);
        section.appendChild(article);
    }
}
function nextPage(e){
    pageNumber++;
    fetchResults(e);
}
function prevPage(e){
    if(pageNumber > 0){
        pageNumber--;
    }
    fetchResults(e);
}