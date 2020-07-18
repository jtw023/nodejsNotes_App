const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if (noteToRead) {
        const title = chalk.magenta.underline(noteToRead.title);
        const body = noteToRead.body;
        console.log('\t \t', title);
        console.log('\t', body);
    } else {
        const noNote = chalk.red('Unable to find note.');
        console.log(noNote);
    }
};

const listNotes = () => {
    const notes = loadNotes();
    const gotEm = chalk.blueBright('Your notes:');
    console.log('\t', gotEm);
    notes.forEach((note) => console.log('\t', note.title));
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body,
        });

        saveNotes(notes);
        const added = chalk.green('New note added!');
        console.log(added);
    } else {
        const taken = chalk.red('Note title taken!');
        console.log(taken);
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    if (notes.length === notesToKeep.length) {
        const notRemoved = chalk.red('No note found!');
        console.log(notRemoved);
    } else {
        const removed = chalk.green('Note Removed!');
        console.log(removed);
    }
    // console.log(notesToKeep);
    saveNotes(notesToKeep);
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
};

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote,
};
