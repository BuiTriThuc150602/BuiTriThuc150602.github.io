$(document).ready(function () {
    loadProducts();
    $("#btnOpen").click(function () {
        if(loadOrderFrom()){
            $("#modelOrder").modal();
        }
        else{
            alert("Bạn chưa đăng nhập");
            window.location = "index.html";
        }
    })
    $("#txtFullName").blur(checkName);
    $("#txtEmail").blur(checkEmail);
    $("#txtAddress").blur(checkAddress);

    $("#btnOrder").click(function () {
        if (!checkName() || !checkEmail() || !checkAddress() || !checkPhone()) {
            return false;
        }
        else {
            $("#modelOrder").modal("hide");
            return true;
        }
    });
})

function display(sp) {
    let item = "<div class='row border rounded-lg p-3 m-3'>" +
        "<div class='col-md-5'>" +
        "<img src='" + sp.image + "' class='img-thumbnail' style='height: 100%;'></div>" +
        "<div class='col-md-7'>" +
        "<h3>" + sp.name + "</h3>" +
        "<label class='title font-weight-bold'>Giá: " + sp.price + "</label></div></div >";
    $("#cartList").append(item);

}
function loadProducts() {
    let list = JSON.parse(localStorage.getItem("cart"));
    let total = 0;
    list.forEach(sp => {
        display(sp);
        total += eval(sp.price);
    });
    $("#lblTotal").html(total);
};

function loadOrderFrom() {
    let user = JSON.parse(localStorage.getItem("userCurrent"));
    if(user == null){
        return false;
    }
    $("#txtFullName").val(user.name);
    $("#txtEmail").val(user.email);
    $("#txtAddress").val(user.address);
    let products = [];
    let total = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(item => {
        products.push(item.name + "");
        total += eval(item.price);
    })
    $("#txtProducts").val(products);
    $("#txtTotal").val(total);
    return true;
}


function checkName() {
    let name = $("#txtFullName").val().trim();
    if (isEmpty(name)) {
        $("#errorFullName").html("Không bỏ trống");
        return false;
    }
    $("#errorFullName").html("");
    return true;
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
function checkAddress() {
    let address = $("#txtAddress").val().trim();
    if (isEmpty(address)) {
        $("#errorAddress").html("Không bỏ trống");
        return false;
    }
    $("#errorAddress").html("");
    return true;
}
function checkPhone() {
    let phone = $("#txtPhone").val().trim();
    let regexPhone = /^(09|08|07)(\d){8}$/;
    if (isEmpty(phone)) {
        $("#errorPhone").html("Không bỏ trống");
        return false;
    }
    else {
        if (!checkRegex(regexPhone, phone)) {
            $("#errorPhone").html("Số điện thoại gồm 10 ký số, bắt đầu bằng 09,08 hoặc 07");
            return false;
        }
        else {
            $("#errorPhone").html("");
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