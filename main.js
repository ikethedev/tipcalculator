const billedAmount = document.querySelector("#bill_amount");
const tipContainer = document.querySelector(".tip-buttons");
const customTip = document.querySelector(".input_btn");
const partySize = document.querySelector(".party");
const tip = document.querySelector("#personTip");
const billPerPerson = document.querySelector("#personBill");
const resetBtn = document.querySelector("#reset");

const tipInfo = {
  totalBill: 0,
  tipPercent: 0,
  partySize: 0,
};

const updateTipInfo = (key, value) => {
  value = parseInt(value);
  if (tipInfo.hasOwnProperty(key)) {
    tipInfo[key] = value;
  }
};

const setActiveTip = (e) => {
  e.preventDefault();
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    }
  });

  if (e.target.tagName === "BUTTON") {
    e.target.classList.add("selected");
    updateTipInfo("tipPercent", e.target.value);
    console.log(e.target.value);
    return;
  }
  updateTipInfo("tipPercent", customTip.value);
};

const changeBilledAmount = () => {
  updateTipInfo("totalBill", billedAmount.value);
};

const changePartySize = () => {
  updateTipInfo("partySize", partySize.value);
  checkForErrors();
  updateDOM()
};

const checkForErrors = () => {
  if (tipInfo.partySize === 0 || tipInfo.partySize === "") {
    partySize.classList.add("error");
    document.querySelector(".message").classList.remove("hidden");
  } else {
    partySize.classList.remove("error");
    document.querySelector(".message").classList.add("hidden");
  }
};

const calculateTip = () => {
  let tipAmount = tipInfo.totalBill * (tipInfo.tipPercent / 100);
  console.log(tipAmount)
  return tipAmount.toFixed(2);
};

const calculateEachBill = () => {
  let tip = calculateTip();
  let billSplit = parseInt(tipInfo.totalBill) / parseInt(tipInfo.partySize);
  let eachBill = parseInt(tip) + parseInt(billSplit);
  console.log(typeof tipInfo.totalBill)
  console.log(typeof tipInfo.partySize)
  return eachBill;
};

const updateDOM = () => {
  tip.textContent = calculateTip();
  billPerPerson.textContent = calculateEachBill();
};

const resetDOM = () => {
  tipInfo.totalBill = 0;
  tipInfo.tipPercent = 0;
  tipInfo.partySize = 0;
  tip.textContent = `$0.00`;
  billPerPerson.textContent = `$0.00`;
  billedAmount.value = 0;
  partySize.value = 0;
};

billedAmount.addEventListener("input", changeBilledAmount);
partySize.addEventListener("change", changePartySize);
tipContainer.addEventListener("click", setActiveTip);
customTip.addEventListener("input", setActiveTip);
resetBtn.addEventListener("click", resetDOM);
