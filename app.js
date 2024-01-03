const MAIN_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".country");
const btn = document.querySelector("#btn");
const fromCount = document.querySelector(".from select");
const toCount = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
  for (code in countryList) {
    let obj = document.createElement("option");
    obj.innerText = code;
    obj.value = code;
    if (select.name === "from" && code === "USD") {
      obj.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      obj.selected = "selected";
    }
    select.append(obj);
  }

  select.addEventListener("change", (element) => {
    changeFlag(element.target);
  });
}

const changeFlag = (element) => {
  let flag = element.value;
  let countryCode = countryList[flag];
  let newFlag = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newFlag;
};

// const getUpdate = async (url) => {
//   let response = await fetch(url);
//   console.log(response);
//   let data = await response.json();
//   console.log(data.jpy);
//   para.innerText = `${amount} ${fromCount.value} = ${data.jpy} ${toCount.value}`;
// };

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amountVal = document.querySelector("input");
  let amount = amountVal.value;
  if (amount === "" || amount < 1 || amount === 0) {
    amount = 1;
    amountVal.value = "1";
  }
  let fromVal = fromCount.value.toLowerCase();
  let toVal = toCount.value.toLowerCase();
  const URL = `${MAIN_URL}/${fromVal}/${toVal}.json`;

  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  let rate = data[toVal];
  let finalValue = amount * rate;

  msg.innerText = `${amount} ${fromCount.value} = ${finalValue} ${toCount.value}`;
});
