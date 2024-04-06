import initFirebase from "./initFirebase.js"


function getHTML(sVal, cVal, quote, css, h1, p, code1, code2, name1, name2) {
    quote = quote.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');

    return `
    
    <div id="app"><style>${css}</style>
    <div class="meter-and-quote"><h1>${h1}</h1>
    <p>${p}</p>
    <div class="meters-and-button"><div class="meters"><div class="meter"><label for="${code1}">${name1}</label>
    <input type="range" id="${code1}" name="${name1}" max="100" value="${sVal}"></div>
    <div class="meter"><label for="${code2}">${name2}</label>
    <input type="range" id="${code2}" name="${name2}" max="100" value="${cVal}"></div></div>
    <button id="save-button">Save</button></div>
    <blockquote class="quote">${quote}</blockquote></div></div>
    `
}
const state = {};
initFirebase((user) => {
    // document.getElementsByTagName('h1')[0].innerHTML = 'Welcome. You are logged in. This is a protected page.'
    user.getIdToken().then(async function (accessToken) {
        console.log('User ' + user.email + ' is signed in, with token : ' + accessToken);

        const firestore = firebase.firestore();

        const doc = await firestore.doc('keystore/meter').get();
        const meterData = doc.data();
        console.log(meterData);
        const quotesDoc = await firestore.doc('keystore/quotes').get();
        console.log("quotes-");
        const quotes = Object.values(quotesDoc.data());

        let quote = quotes[Math.floor(Math.random() * quotes.length)];

        //replace space in quote by &nbsp;, and new line by <br>
        quote = quote.replace(/ /g, '&nbsp;').replace(/\\n/g, '<br>');

        const htmlDoc = await firestore.doc('keystore/html').get();
        const htmlData = htmlDoc.data();

        document.getElementById("app").innerHTML = getHTML(meterData.sVal, meterData.cVal, quote, htmlData.css, htmlData.h1, htmlData.p, htmlData.code1, htmlData.code2, htmlData.name1, htmlData.name2);

        document.getElementById("save-button").addEventListener("click", async () => {


            //get input range value
            const inputElement1 = document.getElementById("sVal");
            const inputElement2 = document.getElementById("cVal");

            const sVal = inputElement1.value;
            const cVal = inputElement2.value;

            const firestore = firebase.firestore();
            firestore.doc('keystore/meter').set({
                sVal: sVal,
                cVal: cVal,
            });
        })

    });
}
);
//get the current signed in user's email

console.log("firebase initiated")

//firebase.auth().currentUser.auth.currentUser.accessToken
//const x = await auth.currentUser.getIdToken()