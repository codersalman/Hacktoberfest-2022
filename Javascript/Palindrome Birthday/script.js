const userBirthDate = document.querySelector("#birth-date");
const btn = document.querySelector(".btn");
const outputMsg = document.querySelector(".output-msg");

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPallindrome(str) {
  return str == reverseStr(str);
}

function convertDateToString(date) {
  let dateStr = { date: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}
function getAllDateFormats(date) {
  let dateStr = convertDateToString(date);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function isAllDateFormatsArePallindrome(date) {
  let dateFormatList = getAllDateFormats(date);
  let flag = false;
  for (let i = 0; i < dateFormatList.length; i++) {
    if (isPallindrome(dateFormatList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 == 0) {
    return true;
  }
  if (year % 100 == 0) {
    return false;
  }
  if (year % 4 == 0) {
    return true;
  }

  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonths[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}
function getNextPallindromeDate(date) {
  let count = 0;
  let nextDate = getNextDate(date);
  // console.log(nextDate)
  while (1) {
    count++;
    let isDatePallindrome = isAllDateFormatsArePallindrome(nextDate);
    if (isDatePallindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}

btn.addEventListener("click", () => {
  if(userBirthDate.value==''){
    alert('Please Enter your BirthDate')
    return;
  }
  userBirthDateInArrFormat = userBirthDate.value.split("-");
  date = {
    day: Number(userBirthDateInArrFormat[2]),
    month: Number(userBirthDateInArrFormat[1]),
    year: Number(userBirthDateInArrFormat[0]),
  };
  outputMsg.innerHTML = `<img src='https://thumbs.gfycat.com/EnchantingInbornDogwoodtwigborer-size_restricted.gif' />
  <p>Calculating...</p>`;
  setTimeout(() => {
    if (isAllDateFormatsArePallindrome(date)) {
      outputMsg.innerText = "Yay!!🥳🥳 Your BirthDay is a Pallindrome..";
    } else {
      let [count, nextDate] = getNextPallindromeDate(date);

      outputMsg.innerText = `The next Pallindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days! 🤪`;
    }
  }, 5000);
});
