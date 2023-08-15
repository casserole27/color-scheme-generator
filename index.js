/****** VARIABLES ******/

let colorsArray = [];
const getSchemesBtn = document.getElementById('schemes-btn');

/****** FUNCTIONS ******/

function getColors() {
        //store user input in variables
        const seedColor = document.getElementById('seed-color').value;
        const colorMode = document.getElementById('color-schemes-select').value;
    
        //create parameters from these variables for search query
        const params = {
            hex: seedColor,
            mode: colorMode
        };
    
        //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
        //construct the query string from the parameters
        //URLSearchParams returns an object instance
        //.toString() method returns a string containing the query string, suitable for use in a URL
        const queryString = new URLSearchParams(params).toString();
    
        //create the url with the query string to pass to fetch
        const url = `https://www.thecolorapi.com/scheme?${queryString}`;
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            //assign the colors array of objects from the API to colorsArray
            colorsArray = data.colors;  
            renderColors() 
        });
};

function renderColors() {
    let htmlFeed = ''
    for (let color of colorsArray) {
        //for each color object, store the hex value in a variable
        //use that variable to pass the color and the text into the html feed
        const hexValue = color.hex.value;
        const colorName = color.name.value;
        htmlFeed += `
            <section>
                <div class="color" style="background-color:${hexValue};" tabindex = "0" data-hex=${hexValue}></div>
                    <div class="color-text-container">
                        <div class="text-container">
                            <button class="copy-btn" id="copy" aria-label="copy hex code" data-hex=${hexValue}></button>
                            <p class="text">${hexValue}</p>
                        </div>
                        <p class="color-name" id="color-name">${colorName}</p>
                    </div>
            </section>
            `
    }
    document.getElementById('main-container').innerHTML = htmlFeed;
}

//copy hex values to clipboard using click or enter button
function copyHex(e) {
    const hexCopyValue = e.target.dataset.hex
    if (e.key === 'Enter' || e.type === 'click') {
        if (hexCopyValue) {
            navigator.clipboard.writeText(hexCopyValue);
            //copy to clipboard alert  
            getSchemesBtn.textContent = 'Copied to clipboard';
            getSchemesBtn.style.backgroundColor = 'gold';
            //remove alert
            setTimeout(() => {
                getSchemesBtn.textContent = 'Get color scheme';
                getSchemesBtn.style.backgroundColor = 'white';
            }, 3000)
        }
    }    
};

/****** EVENT LISTENERS ******/

document.getElementById('schemes-btn').addEventListener('click', getColors);
document.addEventListener('click', copyHex);
document.addEventListener('keypress', copyHex);

