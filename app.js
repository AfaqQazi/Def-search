let box = document.querySelector('#box')

// when the page loads
for (var i = 0, len = localStorage.length; i < len; ++i ) {
    currHeading = localStorage.key(i)
    currContent = localStorage.getItem(currHeading)
    let allContent = `
    <div class="each">
    <button class='delete' onclick='deleteDefinitions(this)'>Delete</button> <button class='edit' onclick='editDefinitions(this)'>Edit</button>
    <div class="heading">
        <h2>${currHeading}</h2><span>:</span>
    </div>
    <div class="content">
        <p>${currContent}</p>
        
</div>
        <div style='margin:0 auto;width:80%;margin-top:20px'><hr></div>
     `
    box.insertAdjacentHTML( 'afterbegin', allContent);
  }

let filterInput = document.getElementById('searchbar'); // #searchbar
let searchBox = document.getElementById('searchbox');

// add button
let addBtn = document.querySelector('#searchbar button')

// events
searchBox.addEventListener('keyup' , filterNames)
addBtn.addEventListener('click' , addDefinitions)

function addDefinitions () {
    let searchBoxValue = document.getElementById('searchbox').value;
    let contentBoxValue = document.querySelector('#searchbar #contentbox').value

    if (searchBoxValue == ''  || contentBoxValue == '') {
        alert('Fill the boxes')
    } else {
        let allContent = `
            <div class="each">
            <button class='delete' onclick='deleteDefinitions(this)'>Delete</button> <button class='edit' onclick='editDefinitions(this)'>Edit</button>
                <div class="heading">
                    <h2>${searchBoxValue}</h2><span>:</span>
                </div>
                <div class="content">
                    <p>${contentBoxValue}</p>
            </div>
            <div style='margin:0 auto;width:80%;margin-top:20px'><hr></div>
        `
        box.insertAdjacentHTML( 'afterbegin', allContent);
        let contentSearchBox = document.querySelector('#contentbox')
        contentSearchBox.value = '';

        // store searchBoxValue and contentBoxValue in localstorage
        localStorage.setItem(searchBoxValue , contentBoxValue)
    }
}

function deleteDefinitions(thisBtn) {
    headingToRemove = thisBtn.nextElementSibling.nextElementSibling.querySelector('h2').innerHTML;
    localStorage.removeItem(`${headingToRemove}`)
    thisBtn.parentElement.remove()
}   

function editDefinitions(thisBtn) {
    let searchBoxValue = document.getElementById('searchbox').value;
    let contentBoxValue = document.querySelector('#searchbar #contentbox').value;
    headingToRemove = thisBtn.nextElementSibling.querySelector('h2').innerHTML;
    pToRemove = thisBtn.nextElementSibling.nextElementSibling.querySelector('p').innerHTML;
    document.getElementById('searchbox').value = headingToRemove;
    document.getElementById("contentbox").value = pToRemove;
    localStorage.removeItem(`${headingToRemove}`);
    thisBtn.parentElement.remove()
}

function filterNames() {
    // get value of input
    let filterValue = document.querySelector('#searchbar #searchbox').value.toUpperCase();
    // let contentValue = document.querySelector('#searchbar #contentbox').value
    // get each heading box
    let box = document.getElementById('box');
    // get definitions 
    let definitions = box.querySelectorAll('h2');
    // loop through all collection items
    for (let i = 0; i < definitions.length; i++) {
        let currentDef = definitions[i];
        let currentDefParent = currentDef.parentElement.parentElement
        // if matched
        if (currentDef.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            currentDefParent.style.display = '';
        } else {
            currentDefParent.style.display = 'none'
        }
    }
}

