// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: "1111",

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: "2222",

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: "3333",

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90, -30],
  interestRate: 1,
  pin: "4444",

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-06-25T18:49:59.371Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

accounts.forEach((acc) => {
  acc.username = acc.owner
    .split(" ")
    .map((str) => str[0])
    .join("")
    .toLowerCase();
});

// console.log(account1.username);

const loginBTN = document.querySelector("#loginBTN");
const inputUsername = document.querySelector("#input-username");
const inputPIN = document.querySelector("#input-pin");
const welcome = document.querySelector("#welcome");
const currentUserBalance = document.querySelector("#current-digit");
const deposit = document.querySelector("#deposit");
const withdraw = document.querySelector("#withdraw");
const interestdisplay = document.querySelector("#interest");
const transactionDIV = document.querySelector("#transactions");
const btnTransfer = document.querySelector("#btnTransfer");
const transferToName = document.querySelector("#transferToName");
const transferAmount = document.querySelector("#transferAmount");
const closeAccBtn = document.querySelector("#closeAccBtn");
const closeACCUser = document.querySelector("#closeACCUser");
const closeAccPin = document.querySelector("#closeAccPin");
const requestLoanBtn = document.querySelector("#requestLoanBtn");
const inputLoanAmount = document.querySelector("#inputLoanAmount");
const sortMovements = document.querySelector("#sortMovements");
const balanceDate = document.querySelector("#balanceDate")

let currentUser;
// let currentBalance;
let loggedIn;

// BALANCE DISPLAY FUNCTION
const balanceFun = function (account = currentUser) {
  const balance = account.movements.reduce((acc, cur) => acc + cur);
  return balance.toFixed(2);

};

//BALANCE DATE FUNCTION
const balDate = function (acc) {
  const date = new Date(acc);
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth()}`.padStart(2, 0);
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${day}/${month}/${year}`;
}

// SUMMARY DISPLAY FUNCTION
const summaryDisplay = function (account) {
  const IN = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur);

  const OUT = account.movements
    .filter((mov) => mov < 0)
    ?.reduce((acc, cur) => acc + cur);

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * account.interestRate) / 100)
    .filter((dep) => dep >= 1)
    .reduce((acc, cur) => acc + cur);

  deposit.textContent = `${IN.toFixed(2)}€`;
  withdraw.textContent = `${Math.abs(OUT).toFixed(2)}€`;
  interestdisplay.textContent = `${interest.toFixed(2)}€`;

  // console.log(IN);
};

const displayTransaction = function (account, bool = false) {
  transactionDIV.textContent = "";

  const moves = bool ? [...account.movements].sort((a, b) => a - b) : account.movements;

  let htmlString;

  moves.forEach((cur, i) => {

    const movDate = balDate(account.movementsDates[i])

    if (cur > 0) {
      htmlString = `<div
                            class="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                            <div class="flex items-center space-x-2">
                            <div
                            class="bg-gradient-to-tl from-[#39b385] to-[#9be15d] uppercase text-white rounded-full py-0.5 px-1.5">
                            <p class="text-[10px] font-semibold">${
                              i + 1
                            } deposit</p>
                            </div>
                  <span id="movementdate">${movDate}</span>
                            </div>

                            <div class="ml-auto"><p>${cur.toFixed(2)}€</p></div>
                         </div>`;
    } else {
      htmlString = `<div
                            class="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                            <div class="flex items-center space-x-2">
                            <div
                            class="bg-gradient-to-tl from-[#e52a5a] to-[#ff585f] uppercase text-white rounded-full py-0.5 px-1.5">
                            <p class="text-[10px] font-semibold">${
                              i + 1
                            } deposit</p>
                            </div>
                  <span id="movementdate">${movDate}</span>
                            </div>

                            <div class="ml-auto"><p>${cur.toFixed(2)}€</p></div>
                         </div>`;
    }

    transactionDIV.insertAdjacentHTML("afterbegin", htmlString);
  });
};

let bool = true;

// TO DISPLAY AND UPDATE THE CHANGES
const updateUI = function (account) {
  if (loggedIn) {
    currentUserBalance.textContent = `${balanceFun(account)}€`;
    balanceDate.textContent = balDate(account.movementsDates[0])

    summaryDisplay(currentUser);

    displayTransaction(account);

    bool = !bool
  } else {
    currentUserBalance.textContent = `05€`;
    currentUser = "";
    displayTransaction([0]);
    deposit.textContent = `05€`;
    withdraw.textContent = `05€`;
    interestdisplay.textContent = `05€`;
  }

};

loginBTN.addEventListener("click", (e) => {
  e.preventDefault();

  currentUser = accounts.find((acc) => acc.username === inputUsername.value);

  if (currentUser && currentUser?.pin === inputPIN.value) {
    loggedIn = true;

    welcome.textContent = `Welcome ${currentUser.owner.split(" ")[0]}`;

    currentUser.balance = balanceFun(currentUser);

    updateUI(currentUser, bool);
  } else {
    console.log("not found");
    console.log(currentUser);
  }

  inputUsername.value = inputPIN.value = "";
  inputPIN.blur();
});

// Event Handlers

// Transfer Account
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(transferAmount.value);

  const getTransferAcoount = accounts.find(
    (acc) => acc.username === transferToName.value
  );

  if (
    getTransferAcoount &&
    currentUser &&
    amount &&
    amount <= currentUser.balance &&
    currentUser.username !== transferToName.value
  ) {
    currentUser.movements.push(-amount);
    getTransferAcoount.movements.push(amount);

    updateUI(currentUser);

    console.log(currentUser.balance);
    console.log(getTransferAcoount);
  }

  transferToName.value = transferAmount.value = "";
  transferAmount.blur();
});

// Close Account
closeAccBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // alert("deleted")

  const user = closeACCUser.value;
  const pin = closeAccPin.value;

  if (loggedIn && currentUser.username === user && currentUser.pin === pin) {
    alert("yeah");

    const index = accounts.findIndex((acc) => acc.username === user);

    console.log(index);

    accounts.splice(index, 1);

    loggedIn = false;

    updateUI(currentUser, bool);
  }

  closeACCUser.value = closeAccPin.value = "";
});

// Request Loan
requestLoanBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputLoan = Number(inputLoanAmount.value);
  const average = currentUser.movements.some((mov) => mov > inputLoan / 10);
  if (loggedIn && average) {
    // alert(`${inputLoan} ${average}`);

    currentUser.movements.push(inputLoan);

    updateUI(currentUser);
  }

  inputLoanAmount.value = "";
});


// sorting function
sortMovements.addEventListener("click", () => {
  if (loggedIn) {
    displayTransaction(currentUser, !bool);
    bool = !bool;
  }
});


