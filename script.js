function loadProduct(){
    const products = getProductFromStorage();
    displayProduct(products)
}
function addProduct() {
    const valid = validate();
    if(!valid) return;
    const product = getProduct();
    const productList = getProductFromStorage();
    productList.push( product);
    saveProductToStorage(productList);
    displayProduct(productList);
    clearForm();
}

function getProduct(){
    const productNameBox = document.getElementById("productName");
    const productPriceBox = document.getElementById("productPrice");
    const imageLinkBox = document.getElementById("imageLink");
    const OptionBox = document.getElementById("catagorySelect");

    const productName = productNameBox.value;
    const productPrice = productPriceBox.value;
    const imageLink = imageLinkBox.value;
    const option = OptionBox.value;

    const product = {
        productName,
        productPrice,
        imageLink,
        option,
    }
    productNameBox.focus();
    return product;
}
function displayProduct(productList){
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML ="";
    for(const product of productList){
        const row = `
        <tr>
        <td>${product.productName}</td>
        <td>${product.productPrice}</td>
        <td>${product.option}</td>
        <td><img src="${product.imageLink}" style=" width: 80px;" ></td>
        <td><button type="button" onclick="deleteProduct(${productList.indexOf(product)})">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    }
}

function clearForm(){
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("imageLink").value = "";
    document.getElementById("catagorySelect").value = "";
    document.getElementById("productName").focus();
}
function validate(){
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const imageLink = document.getElementById("imageLink").value;
    const catagorySelect = document.getElementById("catagorySelect").value;
    
    const productNameError = document.getElementById("productNameError");
    const productPriceError = document.getElementById("productPriceError");
    const imageLinkError = document.getElementById("imageLinkError");
    const catagorySelectError = document.getElementById("catagorySelectError");


    productNameError.innerText = "";
    productPriceError.innerText = "";
    imageLinkError.innerText = "";
    catagorySelectError.innerText = "";
    if(productName === ""){
        productNameError.innerText="Enter Product Name!";
        return false;
    }
    if(productPrice === "" || productPrice <= 0 ){
        productPriceError.innerText="Enter Product Price!";
        return false;
    }
    if(imageLink === ""){
        imageLinkError.innerText="Enter Product Photo Link!";
        return false;
    }
    if(catagorySelect === ""){
        catagorySelectError.innerText="Enter catagory!";
        return false;
    }
    return true;
}
function deleteProduct(index){
    const productList = getProductFromStorage();
    productList.splice(index, 1); 
    saveProductToStorage(productList); 
    displayProduct(productList);
}
function deleteAllProduct(){
    const product = document.getElementById("tableBody");
    product.innerHTML = "";
    localStorage.removeItem("products");
};
function getProductFromStorage(){
    const str = localStorage.getItem("products");
    const products = ( str === null ) ? [] : JSON.parse( str );
    return products;
}
function saveProductToStorage(arr){
    const str = JSON.stringify(arr);
    localStorage.setItem("products",str);
}