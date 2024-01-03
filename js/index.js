var arrStaffList = [];
const btnThemNV = document.getElementById('btnThemNV')
const btnCapNhat = document.getElementById("btnCapNhat")
const formStaff = document.getElementById("form__staff")
const accountStaff = document.getElementById("tknv")
const headerTitle = document.getElementById("header-title")

function getValueStaff(action) {
  var newStaff = new Staff();
  var isValid = true;
  var arrInput = document.querySelectorAll("form input, form select");
  var arrError = document.querySelectorAll("form span.sp-thongbao");

  for (var i = 0; i < arrInput.length; i++) {
    var inputValue = arrInput[i].value;
    var inputId = arrInput[i].id;
    var errorId = arrError[i].id;
    switch (inputId) {
      case "tknv":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkAccount(inputValue, 4, 6, errorId) && checkDuplicate(inputValue, arrStaffList, "tknv", errorId, action)
        break;
      case "name":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkText(inputValue, errorId);
        break;
      case "email":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkEmail(inputValue, errorId);
        break;
      case "password":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkPassword(inputValue, 6, 10, errorId);
        break;
      case "datepicker":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkDate(inputValue, errorId);
        break;
      case "luongCB":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkSalary(inputValue, 1, 20, errorId);
        break;
      case "gioLam":
        isValid &=
          checkEmptyValue(inputValue, errorId) &&
          checkTimeWork(inputValue, 80, 200, errorId);
        break;
      default:
        isValid &= checkEmptyValue(inputValue, errorId);
        if(!checkEmptyValue(inputValue, errorId)) {
          document.getElementById(errorId).innerHTML = "Vui lòng chọn chức vụ"
        }
    }

    newStaff[inputId] = inputValue;
  }
  if (isValid) {
    newStaff.tongLuong = newStaff.caculateSalary(newStaff.chucvu)
    newStaff.loai = newStaff.rankStaff(newStaff.gioLam)
    return newStaff;
  }
}

function showStaff(arr = arrStaffList) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var newArr = arr[i];
    // var newArrStaffList = new Staff();
    // newArr = Object.assign(newArrStaffList, newArr);
    content += `
    <tr>
      <th>
      ${newArr.tknv}
      </th>
      <th>${newArr.name}</th>
      <th>${newArr.email}</th>
      <th>${newArr.datepicker}</th>
      <th>${newArr.chucvu}</th>
      <th>${newArr.tongLuong}</th>
      <th>${newArr.loai}</th>
      <th>
       <button data-toggle="modal"
       data-target="#myModal" onclick="editStaff('${
         newArr.tknv
       }')" class="btn btn-info">Sửa</button>
       <button onclick="deleteStaff('${
         newArr.tknv
       }')" class="btn btn-danger">Xóa</button>
      </th>
    </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

function saveValueLocalStorage(key, value) {
  var stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

function getValueLocalStorage(key) {
  var dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    arrStaffList = JSON.parse(dataLocal);
    showStaff();
  }
}

getValueLocalStorage("arrStaffList");

function deleteStaff(tknv) {
  /* Filter
    arrStaffList = arrStaffList.filter((arr) => arr.tknv != tknv)
  */
  for (var i = 0; i < arrStaffList.length; i++) {
    if (arrStaffList[i].tknv == tknv) {
      arrStaffList.splice(i, 1);
    }
  }
  saveValueLocalStorage("arrStaffList", arrStaffList);

  showStaff();
}

function editStaff(tknv) {
  var arrInput = document.querySelectorAll("form input, form select");

  for (var i = 0; i < arrStaffList.length; i++) {
    if (arrStaffList[i].tknv == tknv) {
      for (var j = 0; j < arrInput.length; j++) {
        arrInput[j].value = arrStaffList[i][arrInput[j].id];
      }
    }
  }

  accountStaff.readOnly = true;
  btnThemNV.style.display = "none"
  btnCapNhat.style.display = "block"
  headerTitle.innerHTML = "Update"
}

function updateStaff() {
  var staff = getValueStaff("capnhat");

  for (var i = 0; i < arrStaffList.length; i++) {
    if (arrStaffList[i].tknv == staff.tknv) {
      arrStaffList[i] = staff;
    }
  }
  saveValueLocalStorage("arrStaffList", arrStaffList);
  showStaff();

  formStaff.reset();
  accountStaff.readOnly = false;
}


function searchStaff(rank) {
  var searchList = []
  var isFound = false
  for(var i = 0; i < arrStaffList.length; i++) {
    if(arrStaffList[i].loai == rank) {
      searchList.push(arrStaffList[i])
      isFound = true
    }
  }
  
  if(isFound) {
    showStaff(searchList)
  } else {
    alert('Không tìm thấy kết quả ! Vui lòng thử lại.')
    showStaff()
  }
}







document.getElementById('btnThem').addEventListener("click", function() {
  headerTitle.innerHTML = "Log In"
  btnThemNV.style.display = "block"
  btnCapNhat.style.display = "none"
  accountStaff.readOnly = false;
  formStaff.reset();
})

btnThemNV.addEventListener("click", function () {
  // var newStaff = new Staff();
  // var arrList = document.querySelectorAll("form input, form select");
  // var staff = getValueStaff(newStaff, arrList)
  var staff = getValueStaff("them");
  if (staff) {
    arrStaffList.push(staff);

    saveValueLocalStorage("arrStaffList", arrStaffList);

    showStaff();

    formStaff.reset();
  }
});


btnCapNhat.addEventListener("click", function () {
  updateStaff();
});


document.getElementById('btnTimNV').addEventListener("click", function() {
  var searchName = document.getElementById('searchName').value.trim()
  searchStaff(searchName)
})