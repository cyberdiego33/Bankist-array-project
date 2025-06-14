// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: "1111",

  movementsDates: [
    '2024-06-18T21:31:17.178Z',
    '2024-06-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-04-01T10:17:24.185Z',
    '2025-05-08T14:11:59.604Z',
    '2025-05-27T17:01:17.194Z',
    '2025-06-10T23:36:17.929Z',
    '2025-06-11T10:51:36.790Z',
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
    '2024-11-01T13:15:33.035Z',
    '2024-12-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-05-08T14:11:59.604Z',
    '2025-05-27T17:01:17.194Z',
    '2025-06-08T18:49:59.371Z',
    '2025-06-10T12:01:20.894Z',
    '2025-06-11T10:51:36.790Z',
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
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-02-05T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-06-04T18:49:59.371Z',
    '2025-06-09T12:01:20.894Z',
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
    '2025-05-01T13:15:33.035Z',
    '2025-05-30T09:48:16.867Z',
    '2025-05-25T06:04:23.907Z',
    '2025-06-07T14:11:59.604Z',
    '2025-06-10T17:01:17.194Z',
    '2025-06-11T18:49:59.371Z',
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
const balDate = function (acc, locale) {

  const calcDaysPast = function(date1, date2) {
    return Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  }

  const date = new Date(acc);
  const getDate = calcDaysPast(new Date(), date);

  if (getDate === 0) return `Today`;

  else if (getDate === 1) return `Yesterday`;

  else if (getDate <= 7) return `${getDate} Days Ago`;

  else {
  const day = new Intl.DateTimeFormat(locale).format(date);

  return day;
  }
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

    const movDate = balDate(account.movementsDates[i],  account.locale)

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

    const option = {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
      minute: 'numeric',
      hour: 'numeric',
      // weekday: 'short'
    }


    currentUserBalance.textContent = `${balanceFun(account)}€`;
    balanceDate.textContent = new Intl.DateTimeFormat(currentUser.locale, option).format(new Date());

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
    const presentTime = new Date().toISOString();

    currentUser.movements.push(-amount);
    currentUser.movementsDates.push(presentTime);
    getTransferAcoount.movements.push(amount);
    getTransferAcoount.movementsDates.push(presentTime)

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
    const presentTime = new Date().toISOString();

    currentUser.movements.push(inputLoan);
    currentUser.movementsDates.push(presentTime);

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

const option = {
  hour: 'numeric',
  minute: '2-digit',
  // year: 'numeric',
  // month: 'short',
  // day: '2-digit',
  weekday: 'long',
}


const now = new Date();
const formatDate = new Intl.DateTimeFormat('en-US', option).format(now);


console.log(formatDate);

