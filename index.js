import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://note-tracker-264b0-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDb = ref(database, "notes")

console.log(database);

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const listEl = document.getElementById("list-el");
const deleteBtn = document.getElementById("delete-btn");

onValue(referenceInDb, (snapshot) => {
    if(snapshot.exists()) {
        const snapshotValues = snapshot.val()
        const notes = Object.values(snapshotValues)
        renderArray(notes) 
    }
})

inputBtn.addEventListener("click", () => {
    if (inputEl.value) {
        console.log(inputEl.value);
        push(referenceInDb, inputEl.value)
        inputEl.value = ""
    }
});

deleteBtn.addEventListener("dblclick", () => {
    remove(referenceInDb)
    listEl.innerHTML = "";
});

function renderArray(array) {
    let list = "";
    for (let i = 0; i < array.length; i++) {
        list += `
            <li>
                ${
                    isCorrectUrl(array[i]) ?
                    `
                    <a target='_blank' href=${array[i]}>
                        ${array[i]}
                    </a>
                    ` :
                    `${array[i]}`
                }
            </li>
        `;
    }
    listEl.innerHTML = list;
}

function isCorrectUrl(str) {
    try {
        new URL(str);
        return true;
    } catch (err) {
        return false;
    }
}