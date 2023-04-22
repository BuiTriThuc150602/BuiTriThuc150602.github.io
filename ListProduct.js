$(document).ready(function () {
    loadProducts(getList());
})

function display(sp) {
    let item = "<div class='col-md-3'>" +
        "<a href='productInformation.html' onclick='getProductDetail(" + sp.id + ");' class='nav-link'>" +
        "<figure class='border'>" +
        "<img src='" + sp.img + "' alt='Hinh anh' class='rounded w-100' height='200'>" +
        "<figcaption class='text-center font-weight-bold'>" + sp.name + "</figcaption>" +
        "<figcaption class='text-danger font-italic font-weight-bold'> Giá Bán: " + sp.price + "</figcaption>" +
        "</figure></a>" +
        "</div>"
    $("#allProducts").append(item);
}
function getList(){
    let id = localStorage.getItem("listShow");
    let list;
    if (id == 'sk') {
        list = JSON.parse(localStorage.getItem("sanKhau"));
    }
    else if (id == 'gd') {
        list = JSON.parse(localStorage.getItem("giaDinh"));
    }
    else if(id == 'lr'){
        list = JSON.parse(localStorage.getItem("loaRoi"));
    }
    else if(id == 'pk'){
        list = JSON.parse(localStorage.getItem("phuKien"));
    }
    return list;
}
function loadProducts(list) {
    list.forEach(sp => {
        display(sp);
    });
};
function search(id) {
    let sp = getList().find(spTemp => spTemp.id == id);
    if (sp != null) {
        return sp;
    }
}
function getProductDetail(id) {
    let sp = search(id);
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

