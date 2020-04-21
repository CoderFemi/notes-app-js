import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// Generate DOM Elements
const generateNotesDOM = (note) => {
    const noteElement = document.createElement('a')
    const textElement = document.createElement('p')
    const statusElement = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textElement.textContent = note.title
    } else {
        textElement.textContent = 'Unnamed note'
    }
    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)

    // Setup the link
    noteElement.setAttribute('href', `/edit.html#${note.id}`)
    noteElement.classList.add('list-item')

    // Setup the status message
    statusElement.textContent = generateLastEdited(note.updatedAt)
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)
    return noteElement
}

// Render notes to the DOM
const renderNotes = () => {
    const notesElement = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(notes,filters.sortBy)
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesElement.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            document.querySelector('#notes').appendChild(generateNotesDOM(note))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show!'
        emptyMessage.classList.add('empty-message')
        notesElement.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')
    const notes = getNotes()
    const note = notes.find(function (note) {
        return note.id === noteId

    })

    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateNotesDOM, renderNotes, generateLastEdited, initializeEditPage }