const keywordToTags = {
    forgiveness: 'Forgiveness',
    success: 'Success',
    change: 'Change',
    choice: 'Choice',
    dream: 'Dream',
    kindness: 'Kindness',
    truth: 'Truth',
    work: 'Work',
    anxiety: 'Anxiety',
    confidence: 'Confidence',
    inspiration: 'Inspiration',
    life: 'Life',
    love: 'Love',
    today: 'Today',
    time: 'Time',
    pain: 'Pain',
    living: 'Living',
    leadership: 'Leadership',
    fear: 'Fear',
    failure: 'Failure',
    future: 'Future',
    courage: 'Courage',
    death: 'Death',
    fairness: 'Fairness',
    mad: 'Mad',
    believe: 'Believe'
};

const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const tagsElement = document.querySelector('.tags');
const newQuoteButton = document.getElementById('new-quote');
const copyQuoteButton = document.getElementById('copy-quote');

// fungsi untuk mengambil quote dari api Quotable.io
async function fetchQuote() {
   try {
        const response = await fetch('https://dummyjson.com/quotes/random')
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        return {content: data.quote, author: data.author};
   }catch (error) {
        quoteElement.textContent = 'Failed to fetch quote. Please try again.';
        authorElement.textContent = '';
        console.error(error);
        return null;
   }
}

// fungsi menentukan tag
function addTagsToQuote(quote, keywordToTags) {
    const tags = [];
    if (quote && quote.content){
        for (const [keyword, tag] of Object.entries(keywordToTags)){
            if (quote.content.toLowerCase().includes(keyword.toLowerCase())){
                tags.push(tag);
            }
        }
    }
    return { ...quote, tags }; // tambah tag ke object kutipan
}

function renderTags(tags, container) {
    container.innerHTML = '';

    if (tags.length > 0) {
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            container.appendChild(span);
        });
    }else {
        container.textContent = '';
    }
}

// event listener untuk tombol
newQuoteButton.addEventListener('click', async () => {
    const quote = await fetchQuote(); // ambil kutipan baru
    if (quote) {
        const taggedQuote = addTagsToQuote(quote, keywordToTags); // tambah tags
        quoteElement.textContent = `"${taggedQuote.content}"`;
        authorElement.textContent = `${taggedQuote.author}`;
        renderTags(taggedQuote.tags, tagsElement);
    }
});

// panggil fetchQuote saat pertama kali halaman dimuat
window.addEventListener('DOMContentLoaded', async () => {
    const quote = await fetchQuote(); // ambil kutipan pertama
    if (quote) {
        const taggedQuote = addTagsToQuote(quote, keywordToTags); // tambahkan tags
        quoteElement.textContent = `"${taggedQuote.content}"`;
        authorElement.textContent = `${taggedQuote.author}`;
        renderTags(taggedQuote.tags, tagsElement);
    }
});

// event listener untuk tombol copy
copyQuoteButton.addEventListener('click', () => {
    if (!quoteElement.textContent.trim()) {
        alert('No quote to copy!');
        return;
    }

    const quoteText = quoteElement.textContent;
    const authorText = authorElement.textContent;
    const textToCopy = `${quoteText} ${authorText}`;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Quote copied to clipboard!');
        })
        .catch(err => {
            alert('Failed to copy quote. Please try again.');
            console.error(err);
        });
});

