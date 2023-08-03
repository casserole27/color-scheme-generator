/****** VARIABLES ******/

let colorsArray = [];


/****** FUNCTIONS ******/

// https://scrimba.com/learn/frontend/blogspace-reset-form-co5d64f86a26b8ced0c846d7b

function renderColors() {
    let htmlFeed = ''
    for (let color of colorsArray) {
        //for each color object, store the hex value in a variable
        //use that variable to pass the color and the text into the html feed
        const hexValue = color.hex.value;
        htmlFeed += `
            <div class="color" style="background-color:${hexValue};"></div>
            <div class="text">${hexValue}</div>
        `
    }
    document.getElementById('main-container').innerHTML = htmlFeed;
}

/****** EVENT LISTENERS ******/

document.getElementById('schemes-btn').addEventListener('click', () => {
    //store user input in variables
    const seedColor = document.getElementById('seed-color').value;
    const colorMode = document.getElementById('color-schemes-select').value;

    //create parameters from these variables for search query
    const params = {
        hex: seedColor,
        mode: colorMode
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    //construct the query string from the parameters
    //URLSearchParams returns an object instance
    //.toString() method returns a string containing the query string, suitable for use in a URL
    const queryString = new URLSearchParams(params).toString();
    // console.log(queryString)

    //create the url with the query string to pass to fetch
    const url = `https://www.thecolorapi.com/scheme?${queryString}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        //assign the colors array of objects from the API to colorsArray
        colorsArray = data.colors  
        renderColors()   
    })
})   