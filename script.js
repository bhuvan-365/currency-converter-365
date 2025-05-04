let exchangeURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const FinalAmt = document.querySelector(".msg");

for (const select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "NPR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }






    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

const updateRate = async () => {

    let amount = document.querySelector("#amtMain");
    let amtVal = amount.value;
    console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const fromURL = `${exchangeURL}/${fromCurr.value.toLowerCase()}.json`;
    let responseFrom = await fetch(fromURL);
    let dataFrom = await responseFrom.json();

    let fromRate = dataFrom[fromCurr.value.toLowerCase()]; // Access the object for the "from" currency
    let toRate = fromRate[toCurr.value.toLowerCase()]; // Access the value for the "to" currency
    // console.log(toRate);

    let finalAmt = (amtVal * toRate).toFixed(3);
    // console.log(finalAmt);

    FinalAmt.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
  
    let countrycode = countryList[currCode];
    let newLink = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = newLink;
    imgTag.alt = `flag of ${currCode}`;
}
button.addEventListener("click", async (e) => {
    e.preventDefault();
    
    updateRate();
   
});

window.addEventListener("load", () => {
updateRate();

})