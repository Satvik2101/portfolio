
class MoneySplit {
    //shares is a map of string to number
    constructor(splits) {
        this.splits = splits;
    }

    addShare(friend, amount) {
        this.splits[friend] = amount;
    }

    getShare(friend) {
        return this.splits[friend] ?? 0;

    }

}


class Transaction {

    constructor({ description, amount, paidBy, split }) {
        this.description = description;
        this.totalAmount = amount;
        this.paidBy = paidBy;
        this.owes = split;
    }

    updateMatrixUtil(negi, posi) {
        const neg = state.negs[negi];
        const pos = state.poss[posi];
        const amount = Math.min(-state.balance[neg], state.balance[pos]);
        state.balance[neg] += amount;
        state.balance[pos] -= amount;
        state.owedBy[state.indexOf(neg)][state.indexOf(pos)] += amount;
        state.owedBy[state.indexOf(pos)][state.indexOf(neg)] += -amount;
        state.breakdown += `In ${this.description}, ${neg} owes ${pos} ${amount}<br>`

    }

    updateMatrix() {
        state.balance = {};
        state.negs = [];
        state.poss = [];

        state.friends.forEach((friend) => {
            state.balance[friend] = this.paidBy.getShare(friend) - this.owes.getShare(friend);
            if (state.balance[friend] < 0) {
                state.negs.push(friend);
            }
            else if (state.balance[friend] > 0) {
                state.poss.push(friend);
            }
        });

        let negi = 0;
        let posi = 0;

        while (negi < state.negs.length && posi < state.poss.length) {
            console.log(state.balance)
            this.updateMatrixUtil(negi, posi);
            if (state.balance[state.negs[negi]] === 0) {
                negi++;
            }
            if (state.balance[state.poss[posi]] === 0) {
                posi++;
            }
        }

    }

}


const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getPeopleAmountBoxes(n, row, suffix) {


    let out = "";
    for (let i = 0; i < n; i++) {
        const id = `Row${row}_person${i + 1}${suffix}`
        out += `
        <label for="${id}">${alphabet[i]}</label>
        <input type="number" id="${id}" name="${id}" value="0">
        `;
    }
    return out;
}

function getMoneyColumn(n, row, className) {

    const suffix = className[0].toUpperCase();
    return `
    <td class=${className}>
        ${getPeopleAmountBoxes(n, row, suffix)}
    </td>
    `
}

function getRow(n, row) {
    return `
    <tr>
        <td>${row}</td>
        <td><input type="text" id="desc${row}" placeholder="Description"></td>
        <td><input type="number" class="tr_amount" id="amount${row}" value="0"></td>
        ${getMoneyColumn(n, row, 'paid')}
        ${getMoneyColumn(n, row, 'owed')}
    </tr>
    `
}

const state = { n: 3 };

function initHelper(n) {
    state.friends = alphabet.slice(0, n).split('');
    state.indexOf = (friend) => state.friends.indexOf(friend);

    state.owedBy = Array.from({ length: n }, () => Array(n).fill(0));
    state.balance = {}
    state.negs = [];
    state.poss = [];
    state.breakdown = "";
}

function init(n) {
    state.n = n;
    state.breakdown = "";
    initHelper(n);

    resetTable();
    addRow();

}
function resetTable() {
    const table = document.getElementById('table');
    table.innerHTML = `
    <tr>
        <th>Row</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Paid</th>
        <th>Owed</th>
    </tr>
    `;
}
document.getElementById('numberOfPeople').addEventListener('change', (e) => {
    init(parseInt(e.target.value));
})

function addRow() {
    const table = document.getElementById('table');
    const row = table.insertRow(-1);
    row.innerHTML = getRow(state.n, table.rows.length - 1);
}


document.getElementById('addRow').addEventListener('click', addRow);
document.getElementById('calcSplit').addEventListener('click', () => {

    initHelper(state.n);
    const transactions = [];
    const table = document.getElementById('table');
    for (let i = 1; i < table.rows.length; i++) {
        const description = document.getElementById(`desc${i}`).value;
        const amount = parseInt(document.getElementById(`amount${i}`).value);
        const paid = new MoneySplit({});
        const owed = new MoneySplit({});
        state.friends.forEach((friend) => {
            paid.addShare(friend, parseInt(document.getElementById(`Row${i}_person${state.indexOf(friend) + 1}P`).value));
            owed.addShare(friend, parseInt(document.getElementById(`Row${i}_person${state.indexOf(friend) + 1}O`).value));
        });
        transactions.push(new Transaction({ description, amount, paidBy: paid, split: owed }));
    }

    transactions.forEach((transaction) => {
        transaction.updateMatrix();
    });

    console.log(state.owedBy);
    console.log(state.balance);
    console.log(state.negs);
    console.log(state.poss);

    const result = [];
    state.friends.forEach((neg) => {
        state.friends.forEach((pos) => {
            const amount = state.owedBy[state.indexOf(neg)][state.indexOf(pos)];
            if (amount > 0) {
                result.push(`${neg} owes ${pos} ${amount}`);
            }
        });
    });

    document.getElementById("result").innerHTML = result.join('<br>') + '<br><br>' + state.breakdown;
});


init(3);