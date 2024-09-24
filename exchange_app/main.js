/*
1. 박스 두개 만들기
2. dropdown list 만들기
3. 환율정보 들고오기
4. dropdown list에서 아이템 선택하면 아이템 변경
5. 금액입력하면 환전됨
6. dropdown list에서 아이템 선택하면 다시 그 단위 기준으로 환전됨
7. 숫자를 한국어로 읽는 법
8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율 적용됨
*/

const currencyRatio = {
    USD:{
        KRW:1333.36,
        USD:1,
        CNY:7.20,
        CHF:0.88,
        VND:24720.00,
        unit:"달러",
        img:"images/usa_img.png"
    },
    KRW:{
        KRW:1,
        USD:0.00075,
        CNY:0.0054,
        CHF:0.00066,
        VND:18.54,
        unit:"원",
        img:"images/kor_img.png"
    },
    CNY:{
        KRW:185.31,
        USD:0.14,
        CNY:1,
        CHF:0.13,
        VND:3431.80,
        unit:"위안",
        img:"images/chi_img.png"
    },
    CHF:{
        KRW:1509.64,
        USD:1.13,
        CNY:8.15,
        CHF:1,
        VND:27956.30,
        unit:"프랑",
        img:"images/swi_img.png"
    },
    VND:{
        KRW:0.054,
        USD:0.000040,
        CNY:0.00029,
        CHF:0.000036,
        VND:1,
        unit:"동",
        img:"images/vtm_img.png"
    },
};


let unitWords = ["", "만", "억", "조", "경"];
let splitUnit = 10000;
let toButton = document.getElementById("toButton");
let fromButton = document.getElementById("fromButton");
let fromCurrency = "USD";
let toCurrency = "KRW";


document.querySelectorAll("#fromCurrencyList li").forEach(function (item) {
  item.addEventListener("click", function () {
    fromCurrency = this.id;
    fromButton.innerHTML = `<img class="flagImg"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
    convert("from");
  });
});

document.querySelectorAll("#toCurrencyList li").forEach(function (item) {
  item.addEventListener("click", function () {
    toCurrency = this.id;
     toButton.innerHTML = `<img class="flagImg"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
    convert("from");
  });
});


function convert(type) {
    console.log("here");
    let amount = 0;
    if (type == "from") {
      // 입력값 받기
      amount = document.getElementById("fromInput").value;
      // 환전하기
      let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
      // 환전한값 보여주기
      document.getElementById("toInput").value = convertedAmount;
      // 환전한값 한국어로 변경
      renderKoreanNumber(amount, convertedAmount);
    } else {
      amount = document.getElementById("toInput").value;
      let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
      document.getElementById("fromInput").value = convertedAmount;
      renderKoreanNumber(convertedAmount, amount);
    }
  };
  function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent =
      readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent =
      readNum(to) + currencyRatio[toCurrency].unit;
  };
  function readNum(num) {
    let resultString = "";
    let resultArray = [];
    for (let i = 0; i < unitWords.length; i++) {
      let unitResult =
        (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }
    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
  };