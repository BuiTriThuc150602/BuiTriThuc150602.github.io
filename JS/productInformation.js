$(document).ready(function(){
    $("#procductName").html(localStorage.getItem("name"));
    $("#myImg").attr("src",localStorage.getItem("image"));
    $("#lblDaiTan").html(localStorage.getItem("daiTan"));
    $("#lblTanSo").html(localStorage.getItem("tanSo"));
    $("#lblKhuechDai").html(localStorage.getItem("boKhuechDai"));
    $("#lblCongSuat").html(localStorage.getItem("congSuat"));
    $("#lblKichThuoc").html(localStorage.getItem("kichThuoc"));
    $("#lblTrongLuong").html(localStorage.getItem("trongLuong"));
    let price = eval(localStorage.getItem("price")).toLocaleString('en-US', {style:'currency', currency:'VND'});
    $("#lblPrice").html(price);
    $("#infor").html(localStorage.getItem("moTa"));

})

function addToCart(){
    let name = localStorage.getItem("name");
    let img = localStorage.getItem("image");
    let price = localStorage.getItem("price");
    let item = {
        name: name,
        image: img,
        price:price
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    cart.push(item);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Đã thêm sản phẩm " + name +" vào giỏ hàng");
}