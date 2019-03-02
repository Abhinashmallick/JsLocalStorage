/*====Variables====*/
const tweetList = document.getElementById('tweet-list');


/*====Event Listeners====*/
eventListeners();

function eventListeners() {
    /*----Form Submission----*/
    document.querySelector('#form').addEventListener('submit', newTweet);

    /*----Remove the tweet from the list----*/
    tweetList.addEventListener('click', removeTweet);

    /*----Document---*/
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}
 

/*====Functions====*/
function newTweet(event) {
    event.preventDefault();

    // console.log('Form Submitted!');

    /*----read the textarea value----*/
    const tweet = document.getElementById('tweet').value;
    // console.log(tweet);

    /*----Create the remove button----*/
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    /*----create an <li> element----*/
    const li = document.createElement('li');
    li.textContent = tweet;
    tweetList.appendChild(li);

    /*----Add Remove Button to each tweet----*/
    li.appendChild(removeBtn);

    /*----Add to the list----*/
    tweetList.appendChild(li);

    /*----Add to the localStorage----*/
    addTweetLocalStorage(tweet);

    /*----Add alert----*/
    alert('Tweet Added');

    /*----reset text area----*/
    this.reset();
}

/*----remove the tweet from the DOM----*/
function removeTweet(event) {
    if(event.target.classList.contains('remove-tweet')) {
        alert('Are You Sure to Remove it..?');
        event.target.parentElement.remove();
    }

    /*----Remove from Storage----*/
    removeTweetLocalStorage( event.target.parentElement.textContent );
}

/*----Add the tweet to the local storage----*/
function addTweetLocalStorage(tweet) {
    // console.log('Hello from the local storage');
    let tweets = getTweetsFromStorage();

    /*----Add the tweet into the array----*/
    tweets.push(tweet);

    /*----convert tweet array into string----*/
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    /*----get the values, if null is returned then we create an empty array----*/
    if(tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse( tweetsLS );
    }
    return tweets;
}

/*----Prints localStorage Tweeets OnLoad----*/
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    // console.log(tweets);
    /*----loop throught storage and then print the values----*/
    tweets.forEach(function(tweet) {
        /*----Create the remove button----*/
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        /*----create an <li> element----*/
        const li = document.createElement('li');
        li.textContent = tweet;
        tweetList.appendChild(li);

        /*----Add Remove Button to each tweet----*/
        li.appendChild(removeBtn);

        /*----Add to the list----*/
        tweetList.appendChild(li);
    });
}

/*----Removes the Tweet from the Local Storage----*/
function removeTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();
    // console.log(tweets);

    /*----remove the X from the tweet----*/
    const tweetDelete = tweet.substring(0, tweet.length - 1);

    /*----Loop throught the tweets and remove the tweet thats equal----*/
    tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });
    // console.log(tweets);
    /*----save the data----*/
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}