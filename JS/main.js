$(document).ready(function () {
    loadNewProducts();
    initCart();
    initLogin();
    let login = localStorage.getItem("login");
    if (login == "yes") {
        loadUser();
    }
    let myInterval = setInterval(loadNewProducts, 10000);
    loadProducts(listSK, "SKProducts");
    loadProducts(listGD, "GDProducts");
    loadProducts(listR, "LRProducts");
    loadProducts(listPK, "PKProducts");
    $("#btnSearch").click(function () {
        clearInterval(myInterval);
        searchByName();
    });
    $("#btnConfirm").click(function () {
        let user = $("#txtUserName").val().trim();
        let pass = $("#txtPassword").val().trim();
        if (user == "") {
            $("#errorLoginName").html("Không bỏ trống");
            return false;
        }
        $("#errorLoginName").html("");
        if (pass == "") {
            $("#errorLoginPass").html("Không bỏ trống");
            return false;
        }
        $("#errorLoginPass").html("");
        if (!checkUser(user, pass)) {
            alert("Tài Khoản hoặc Mật Khẩu sai !")
            return false;
        }
        getUserLogin(user);
        $("#loginModal").modal("hide");
        $("#btnLogin").remove();
        localStorage.setItem("login", "yes");
        window.location = "index.html";
        return true;

    });
})
function initLogin() {
    let status = localStorage.getItem("login");
    if (status == null) {
        localStorage.setItem("login", "no");
    }
}

function initCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

function display(sp, id) {
    let item = "<div class='col-md-3'>" +
        "<a href='productInformation.html' onclick='getProductDetail(" + sp.id + ");' class='nav-link'>" +
        "<figure class='border'>" +
        "<img src='" + sp.img + "' alt='Hinh anh' class='rounded w-100' height='200'>" +
        "<figcaption class='text-center font-weight-bold'>" + sp.name + "</figcaption>" +
        "<figcaption class='text-danger font-italic font-weight-bold'> Giá Bán: " + sp.price + "</figcaption>" +
        "</figure></a>" +
        "</div>"
    $("#" + id).append(item);

}
function loadProducts(list, id) {
    let i = 0;
    list.forEach(sp => {
        if (i < 4) {
            display(sp, id);
        }
        i++;
    });
};
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function loadNewProducts() {
    $("#newProducts").html("");
    let list = getAll();
    let maxRnd = list.length;
    let i = 0;
    while (i < 4) {
        let id = getRndInteger(1, maxRnd);
        let sp = list.find(sp => sp.id == id);
        display(sp, "newProducts");
        i++;

    }
}
function showAllProduct(id) {
    localStorage.setItem("listShow", id);
}
function getAll() {
    let listSK = JSON.parse(localStorage.getItem("sanKhau"));
    let listGD = JSON.parse(localStorage.getItem("giaDinh"));
    let listRoi = JSON.parse(localStorage.getItem("loaRoi"));
    let listPK = JSON.parse(localStorage.getItem("phuKien"));
    let listAll = listSK.concat(listGD, listRoi, listPK);
    return listAll;
}

function getProductDetail(id) {
    let sp = getAll().find(spTemp => spTemp.id == id);
    localStorage.setItem("id", sp.id);
    localStorage.setItem("name", sp.name);
    localStorage.setItem("price", sp.price);
    localStorage.setItem("image", sp.img);
    localStorage.setItem("daiTan", sp.daiTan);
    localStorage.setItem("tanSo", sp.tanSo);
    localStorage.setItem("congSuat", sp.congSuat);
    localStorage.setItem("kichThuoc", sp.kichThuoc);
    localStorage.setItem("trongLuong", sp.trongLuong);
    localStorage.setItem("boKhuechDai", sp.boKhuechDai);
    localStorage.setItem("moTa", sp.moTa);
}

function searchByName() {
    let valSearch = $("#txtSearch").val().toLowerCase();
    let list = getAll();
    let result = [];
    if (valSearch.trim() == "") {
        $("#titleResult").html("Sản Phẩm Mới");
        loadNewProducts(); setInterval(loadNewProducts, 10000);
        return true;
    }
    list.forEach(sp => {
        let re = sp.name.toLowerCase().includes(valSearch);
        if (re) {
            result.push(sp);
        }
    });
    if (result.length == 0) {
        $("#error").html("Không tìm thấy sản phẩm nào");
        $("#titleResult").html("Sản Phẩm Mới"); setInterval(loadNewProducts, 10000);
        return false;
    }
    $("#error").html("");
    clearInterval();
    $("#newProducts").html("");
    $("#titleResult").html("Kết Quả Tìm Kiếm");
    result.forEach(sp => { display(sp, "newProducts") });
    return true;
}

function loadUser() {
    $("#btnLogin").html("Đăng Xuất");
    let user =JSON.parse(localStorage.getItem("userCurrent"));
    let userInfo = "<label><i class='fa-solid fa-user-check'></i> " + user.name + "</label>"
    $("#loginForm").append(userInfo);
}

function getUserLogin(userName) {
    let account = JSON.parse(localStorage.getItem("account"));    
    let userCurrent = account.find(user=>user.userName == userName);
    localStorage.setItem("userCurrent",JSON.stringify(userCurrent));
}
function checkUser(userName, password) {
    let account = JSON.parse(localStorage.getItem("account"));
    let i = 0;
    while (i < account.length) {
        if (account[i].userName == userName && account[i].pwd == password) {
            return true;
        }
        i++;
    }
    return false;
}