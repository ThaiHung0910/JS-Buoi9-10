function Staff() {
  this.tknv = '';
  this.name = '';
  this.email = '';
  this.password = '';
  this.datepicker = '';
  this.luongCB = 0;
  this.chucvu = '';
  this.gioLam = 0;
  this.tongLuong = 0
  

  this.caculateSalary = function (type) {
    switch (type) {
      case "Giám đốc":
        return this.luongCB * 3;
      case "Trưởng phòng":
        return this.luongCB * 2;
      default:
        return this.luongCB;
    }
  };
  this.loai = "" 

  this.rankStaff = function (timeWork) {
    var result = "";
    if (timeWork >= 192) {
      result = "Xuất sắc";
    } else if (timeWork >= 176) {
      result = "Giỏi";
    } else if (timeWork >= 160) {
      result = "Khá";
    } else {
      result = "Trung bình";
    }
    return result;
  };

}
