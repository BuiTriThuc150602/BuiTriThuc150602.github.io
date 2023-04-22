$(document).ready(function () {
    $("#btnCancel").click(function () {
        goHome();
    });
    $("#txtFullName").blur(checkName);
    $("#txtUserName").blur(checkUser);
    $("#txtPassword").blur(checkPassword);
    $("#txtRePassword").blur(checkRePassword);
    $("#txtEmail").blur(checkEmail);
    $("#txtAddress").blur(checkAddress);
    $("#btnRegist").click(function () {
        if (!checkName() || !checkUser() || !checkPassword() || !checkRePassword() || !checkEmail() || !checkAddress()) {
            return false;
        }
        else {
            createAccount();
            loadModal();
            return true;
        }
    });
})
function goHome() { window.location = "index.html"; };
function checkName() {
    let name = $("#txtFullName").val().trim();
    let regexFName = /^([a-zA-Z]+\s?){2,}$/;
    if (isEmpty(name)) {
        $("#errorFullName").html("Không bỏ trống");
        return false;
    }
    if (!checkRegex(regexFName, name)) {
        $("#errorFullName").html("Tên không chứa ký tự đặt biệt");
        return false;
    }
    $("#errorFullName").html("");
    return true;
}
function checkUser() {
    let user = $("#txtUserName").val().trim();
    let regexUser = /^[a-zA-Z\d]{2,}$/;
    if (isEmpty(user)) {
        $("#errorUserName").html("Không bỏ trống");
        return false;
    }
    else {
        if (!checkRegex(regexUser, user)) {
            $("#errorUserName").html("Tên đăng nhập ít nhất 2 ký tự chữ hoặc số");
            return false;
        }
        else {
            $("#errorUserName").html("");
            return true;
        }
    }
}
function checkEmail() {
    let email = $("#txtEmail").val().trim();
    let regexEmail = /^([a-zA-Z\d])+\@(([a-zA-Z\d])+\.)([a-zA-Z\d]+)$/;
    if (isEmpty(email)) {
        $("#errorEmail").html("Không bỏ trống");
        return false;
    }
    else {
        if (!checkRegex(regexEmail, email)) {
            $("#errorEmail").html("Email sai định dạng (ex: example123@something.com)");
            return false;
        }
        else {
            $("#errorEmail").html("");
            return true;
        }
    }
}
function checkPassword() {
    let pass = $("#txtPassword").val().trim();
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (isEmpty(pass)) {
        $("#errorPassword").html("Không bỏ trống");
        return false;
    }
    else {
        if (!checkRegex(regexPassword, pass)) {
            $("#errorPassword").html("Mật khẩu ít nhất 6 ký tự, bao gồm chữ và số ");
            return false;
        }
        else {
            $("#errorPassword").html("");
            return true;
        }
    }
}
function checkRePassword() {
    let pass = $("#txtPassword").val().trim();
    let rePass = $("#txtRePassword").val().trim();
    if (isEmpty(rePass)) {
        $("#errorRePassword").html("Không bỏ trống");
        return false;
    }
    else {
        if (rePass != pass) {
            $("#errorRePassword").html("Mật khẩu nhập lại không khớp");
            return false;
        }
        else {
            $("#errorRePassword").html("");
            return true;
        }
    }
}
function checkAddress() {
    let address = $("#txtAddress").val().trim();
    let regexAddress = /^([a-zA-Z\d\/,-]+\s?)+$/;
    if (isEmpty(address)) {
        $("#errorAddress").html("Không bỏ trống");
        return false;
    }
    else {
        if (!checkRegex(regexAddress, address)) {
            $("#errorAddress").html("Địa chỉ không hợp lệ");
            return false;
        }
        else {
            $("#errorAddress").html("");
            return true;
        }
    }
}
function checkRegex(regex, value) {
    return regex.test(value) ? true : false;
}
function isEmpty(string) {
    return string == "" ? true : false;
}
function createAccount() {
    let name = $("#txtFullName").val().trim();
    let user = $("#txtUserName").val().trim();
    let email = $("#txtEmail").val().trim();
    let pass = $("#txtPassword").val().trim();
    let address = $("#txtAddress").val().trim();
    let account = JSON.parse(localStorage.getItem("account"));
    let newUser = {
        name: name,
        userName: user,
        pwd: pass,
        email: email,
        address: address
    };
    account.push(newUser);
    localStorage.setItem("account", JSON.stringify(account));
    localStorage.setItem("newUser", JSON.stringify(newUser));
    console.log(localStorage.getItem("account"))
}
function loadModal() {
    let newUser =JSON.parse(localStorage.getItem("newUser"));
    console.log(newUser)
    $("#modalInfo").modal();
    $("#accName").html(newUser.name);
    $("#accUser").html(newUser.userName);
    $("#accPass").html(newUser.pwd);
    $("#accEmail").html(newUser.email);
    $("#accAddress").html(newUser.address);
    
}

