function getElement(element) {
  return document.getElementById(element)
}

var message = ["Vui lòng không bỏ trống", "Vui lòng chỉ nhập chữ", "Vui lòng nhập đúng định dạng email", "Vui lòng nhập đúng định dạng tháng/ngày/năm","Vui lòng chỉ nhập số"]

function checkEmptyValue(value, errorId) {
  if(value) {
    getElement(errorId).style.display = 'none' 
    return true
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = message[0]
    return false
  }
}


function checkAccount (value, min, max, errorId) {
  
  var inputValue = value.trim().length

  if(inputValue >= min && inputValue <= max) {
    getElement(errorId).style.display = 'none' 
    return true
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = `Tài khoản phải từ ${min} - ${max} ký số`
    return false
  }
}

function checkText(value, errorId) {
  var regexText = /^[a-zA-Z_ ]*$/
  
  if(regexText.test(value)) {
    getElement(errorId).style.display = 'none' 
    return true
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = message[1]
    return false
  }
}

function checkEmail(value, errorId) {
  var regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(regexEmail.test(value)) {
    getElement(errorId).style.display = 'none' 
    return true
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = message[2]
    return false
  }
}

function checkPassword(value, min, max, errorId) {
  var regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/
  if(regexPassword .test(value)) {
    getElement(errorId).style.display = 'none' 
    return true
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = `Mật khẩu phải từ ${min} - ${max} ký tự, có ít nhất 1 số, 1 chữ in hoa, 1 ký tự đặc biệt`
    return false
  }
}

function checkDate(value, errorId) {
  var regexDate = /^(1[0-2]|0?[1-9])(\/|-)(3[01]|[12][0-9]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/;
  if(regexDate.test(value)) {
    getElement(errorId).style.display = 'none' 
    return true
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = message[3]
    return false
  }

}

// function checkNumber(value, errorId) {
//   var regexNumber = /^[0-9]+$/
//   if(regexNumber.test(value)) {
//     getElement(errorId).style.display = 'none' 
//     return true
//   } else {
//     getElement(errorId).style.display = 'block' 
//     getElement(errorId).innerHTML = "Vui lòng nhập số"
//     return false
//   }
// }

function checkSalary(value, min, max, errorId) {
  var regexNumber = /^[0-9]+$/
  var mil = 1000000
  if(regexNumber.test(value)) {
    if(value >= min * mil && value <= max * mil) {
      getElement(errorId).style.display = 'none' 
      return true
    } else {
      getElement(errorId).style.display = 'block' 
      getElement(errorId).innerHTML = `Lương cơ bản nằm trong khoảng ${min*mil} - ${max*mil}`
      return false
    }
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = message[4]
    return false
  }
}

function checkTimeWork(value, min, max, errorId) {
  var regexNumber = /^[0-9]+$/
  if(regexNumber.test(value)) {
    if(value >= min && value <= max) {
      getElement(errorId).style.display = 'none' 
      return true
    } else {
      getElement(errorId).style.display = 'block' 
      getElement(errorId).innerHTML = `Số giờ làm trong tháng nằm trong khoảng ${min} - ${max} giờ`
    return false
    }
  } else {
    getElement(errorId).style.display = 'block' 
    getElement(errorId).innerHTML = message[4]
    return false
  }
}
