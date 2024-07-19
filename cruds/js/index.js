
var productNameInput = document.getElementById('productName'); // input kolo
var productPriceInput = document.getElementById('productPrice'); // input kolo 
var productCategoryInput = document.getElementById('productCategory'); // input kolo 
var productDescInput = document.getElementById('productDesc'); // input kolo 
var productsContainer = [];
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var currentProductIndex = null;

addBtn.addEventListener('click', addProduct);
updateBtn.addEventListener('click', updateProduct);
productNameInput.addEventListener('input', validateProductName); 

if (localStorage.getItem('products') !== null) {
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts(productsContainer);
}

function addProduct() {
    if (validateProductName()) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        };
        productsContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
    }
}

function clearForm() {
    productNameInput.value = '';
    productCategoryInput.value = '';
    productDescInput.value = '';
    productPriceInput.value = '';
    validateProductName(); 
}

function displayProducts(arr) {
    var cartoona = '';
    for (var i = 0; i < arr.length; i++) {
        cartoona += `<tr>
                <td>${arr[i].name}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].category}</td>
                <td>${arr[i].desc}</td>
                <td><button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>`;
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

function searchProducts(term) {
    var matchedProducts = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            matchedProducts.push(productsContainer[i]);
        }
    }
    displayProducts(matchedProducts);
}

function setFormUpdate(i) {
    currentProductIndex = i;
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
    productNameInput.value = productsContainer[i].name;
    productCategoryInput.value = productsContainer[i].category;
    productDescInput.value = productsContainer[i].desc;
    productPriceInput.value = productsContainer[i].price;
    validateProductName(); 
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    var isValid = regex.test(productNameInput.value);
    var feedbackDiv = document.getElementById('validationFeedback');
    
    
    if (productNameInput.value.trim() === '') {
        feedbackDiv.innerHTML = ''; 
    } else if (isValid) {
        feedbackDiv.innerHTML = '<p class="valid-icon">✔️ </p>';
    } else {
        feedbackDiv.innerHTML = '<p class="invalid-icon">❌ </p>';
    }

    return isValid;
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    var isValid = regex.test(productNameInput.value);
    var feedbackDiv = document.getElementById('validationFeedback');
    
   
    if (productNameInput.value.trim() === '') {
        feedbackDiv.innerHTML = '';
    } else if (isValid) {
        feedbackDiv.innerHTML = '<span class="valid-icon">✔️</span><span class="valid-feedback">Name is correct</span>';
    } else {
        feedbackDiv.innerHTML = '<span class="invalid-icon">❌</span><span class="invalid-feedback">Invalid product name</span>';
    }

    return isValid;
}


function updateProduct() {
    if (validateProductName()) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        };
        productsContainer[currentProductIndex] = product;
        localStorage.setItem("products", JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();
        addBtn.classList.replace('d-none', 'd-block');
        updateBtn.classList.replace('d-block', 'd-none');
    }
}

