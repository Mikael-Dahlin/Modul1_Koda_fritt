// declaration of HTML variables using querySelector
const getPropertiesButtonEl = document.querySelector('.getProperties');
const reloadPageButtonEl = document.querySelector('.reloadPage');
const listWrapperEls = document.querySelectorAll('.listWrapper');

// function to get the properties of the location object and display them in 2 lists 
const getProperties = () => {
    const locationProperties = Object.getOwnPropertyNames(location).sort();
    console.log('Array of location property names:', locationProperties);
    
    // creates a list for the properties
    listWrapperEls[0].innerHTML = "";
    const propertyListEl = document.createElement('ul');
    const propertyListString = locationProperties
        .filter((property) => !`${location[property]}`.includes("function"))
        .map((property) => {
            return `<li><div class="property">${property}</div></li>`;
        }).join('');
    propertyListEl.innerHTML = propertyListString;
    listWrapperEls[0].appendChild(propertyListEl);
    
    // creates a list for the methods
    listWrapperEls[1].innerHTML = "";
    const methodsListEl = document.createElement('ul');
    const methodListString = locationProperties
        .filter((property) => `${location[property]}`.includes("function"))
        .map((property) => {
            return `<li><div class="property">${property}</div></li>`;
        }).join('');
    methodsListEl.innerHTML = methodListString;
    listWrapperEls[1].appendChild(methodsListEl);

    // calls a function that adds event listeners to the list items.
    document.querySelectorAll('.property').forEach((propertyEl) => {propertyListener(propertyEl)});
}

// function for adding event listeners that show the property value when you mouse over a list item
function propertyListener(element) {
    element.addEventListener('mouseover', (event) => {
        const propertyValueEl = document.createElement('div');
        let propertyValue = `${location[event.target.innerHTML]}`;
        if(propertyValue === "") propertyValue = "has no value";
        propertyValueEl.innerHTML = propertyValue;
        event.target.parentElement.appendChild(propertyValueEl);
    });

    element.addEventListener('mouseout', (event) => {
        event.target.parentElement.removeChild(event.target.parentElement.lastChild);
    });
}

// add event listeners to the buttons
getPropertiesButtonEl.addEventListener('click', getProperties);
reloadPageButtonEl.addEventListener('click', () => {location.reload()});