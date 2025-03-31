/*
Further Features:
1. Add Title [done]
2. Mark a note as Important [done]
3. Separate notes by user 
4. Sync and host to web server 
*/

console.log('this is note app project')
showNotes()


//if user want to add a note then add it to local storage
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle')
    let addTxt = document.getElementById('addTxt')
    let notes = localStorage.getItem('notes')
    console.log(notes)
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myobj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myobj)
    console.log(notesObj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTitle.value = ''
    addTxt.value = " "
    //console.log(notes)
    showNotes()
})

//function to show the notes from the local storage
function showNotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = ''
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card ${element.important ? 'important' : ''}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text"> ${element.text}</p>
                <button onclick="toggleImportant(${index})" class="btn btn-warning">
                        ${element.important ? 'Unmark Important' : 'Mark Important'}
                    </button>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`
    });
    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use < b > & nbsp"Add a Note" & nbsp </b > above section to add notes.`
    }
}

//function to delete the note from the local storage
function deleteNote(index) {
    //console.log('i am deleting',index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}

// to mark important
function toggleImportant(index) {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes[index].important = !notes[index].important;  // Toggle the value
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

// to serach
let search = document.getElementById('searchTxt')
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase()
    //console.log('input event fired',inputVal)
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('h5')[0].innerText
        //console.log(cardTxt)
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block'
        }
        else {
            element.style.display = 'none'
        }
    })
})