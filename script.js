// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: "1111",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: "2222",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: "3333",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90, -30],
  interestRate: 1,
  pin: "4444",
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

let currentUser;
// let currentBalance;
let loggedIn;

// BALANCE DISPLAY FUNCTION
const balanceFun = function (account = currentUser) {
  const balance = account.movements.reduce((acc, cur) => acc + cur);
  return balance;
};

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

  deposit.textContent = `${IN}€`;
  withdraw.textContent = `${Math.abs(OUT)}€`;
  interestdisplay.textContent = `${Math.abs(interest)}€`;

  // console.log(IN);
};

const displayTransaction = function (movements) {
  transactionDIV.textContent = "";

  let htmlString;

  movements.forEach((cur, i) => {
    if (cur > 0) {
      htmlString = `<div
                            class="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                            <div
                            class="bg-gradient-to-tl from-[#39b385] to-[#9be15d] uppercase text-white rounded-full py-0.5 px-1.5">
                            <p class="text-[10px] font-semibold">${
                              i + 1
                            } deposit</p>
                            </div>

                            <div class="ml-auto"><p>${cur}€</p></div>
                         </div>`;
    } else {
      htmlString = `<div
                            class="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                            <div
                            class="bg-gradient-to-tl from-[#e52a5a] to-[#ff585f] uppercase text-white rounded-full py-0.5 px-1.5">
                            <p class="text-[10px] font-semibold">${
                              i + 1
                            } deposit</p>
                            </div>

                            <div class="ml-auto"><p>${cur}€</p></div>
                         </div>`;
    }

    transactionDIV.insertAdjacentHTML("afterbegin", htmlString);
  });
};

// TO DISPLAY AND UPDATE THE CHANGES
const updateUI = function (account) {
  currentUserBalance.textContent = `${balanceFun(account)}€`;

  summaryDisplay(currentUser);

  displayTransaction(account.movements);
};

loginBTN.addEventListener("click", (e) => {
  e.preventDefault();

  currentUser = accounts.find((acc) => acc.username === inputUsername.value);

  if (currentUser && currentUser?.pin === inputPIN.value) {
    loggedIn = true;

    welcome.textContent = `Welcome ${currentUser.owner.split(" ")[0]}`;

    currentUser.balance = balanceFun(currentUser);

    updateUI(currentUser);
  } else {
    console.log("not found");
    console.log(currentUser);
  }

  inputUsername.value = inputPIN.value = "";
  inputPIN.blur();
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(transferAmount.value);

  const getTransferAcoount = accounts.find(acc => acc.username === transferToName.value);

  if (
    getTransferAcoount &&
    currentUser &&
    amount &&
    amount <= currentUser.balance &&
    currentUser.username !== transferToName.value
  ) {

    currentUser.movements.push(-amount);
    getTransferAcoount.movements.push(amount)

    updateUI(currentUser);

    console.log(currentUser.balance);
    console.log(getTransferAcoount);
  }

  transferToName.value = transferAmount.value = "";
  transferAmount.blur();
});
