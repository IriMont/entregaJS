const clickButton = document.querySelectorAll('.boton')
const tbody = document.querySelector('.tbody')
const listaPostres = document.querySelector('.table tbody')
let carrito = []

clickButton.forEach(btn => {
    btn.addEventListener ('click', addToCarritoItem)
})

//Agregar producto en carrito
function addToCarritoItem (e){
    const boton = e.target
    const item = boton.closest('.card-1')
    const itemNombre = item.querySelector('.card-title').textContent;
    const itemPrecio = item.querySelector('.precio').textContent;
    const itemImagen = item.querySelector('.card-img-top').src;

    const newItem = {
        nombre: itemNombre,
        precio: itemPrecio,
        imagen: itemImagen,
        cantidad: 1
    }

    addItemCarrito (newItem)
    
}

//Manejo de cantidades en carrito
function addItemCarrito(newItem){
    for(let i=0; i < carrito.length; i++){
        if(carrito[i].nombre === newItem.nombre){
            carrito[i].cantidad ++;
            carritoTotal()
            return null
        }
    }
    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const content = `
            <td class="table__productos">
              <img class="uk-preserve-width uk-border-circle" src=${item.imagen} width="80" alt="productoCompra">
              <h6 class="nombre">${item.nombre}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" class="num" value=${item.cantidad}>
              <button class="delete btn btn-danger">x</button>
            </td>`

            tr.innerHTML = content;
            tbody.append(tr)
            tr.querySelector(".delete").addEventListener('click', removerCarrito)
    })
    carritoTotal()
   
}

//Calcular monto total de compra
function carritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.cartTotal')
    carrito.forEach(item => {
        const precio = parseInt(item.precio)
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total S/${Total}`
    addLocalStorage()
}

//Eliminar producto de carrito de compra
function removerCarrito(e){
    const botonDelete = e.target
    const tr = botonDelete.closest('.ItemCarrito')
    const nombre = tr.querySelector('.nombre').textContent;
    for(let i=0; i<carrito.length; i++){
        if(carrito[i].nombre.trim() === nombre.trim()){
            carrito.splice(i,1)
        }
    }
    tr.remove()
    carritoTotal()

}

//LocalStorage

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      renderCarrito()
    }
}

//Filtro segun tipo de productos
const filterItems = document.querySelector('.filterMenu').children;
const itemsCategories = document.querySelector('.container').children;

for(let i = 0; i < filterItems.length; i++){
    filterItems[i].addEventListener('click', function(){
        for(let j = 0; j< filterItems.length; j++){
            filterItems[j].classList.remove('current');
        }

        this.classList.add('current');
        

        let targetData = this.getAttribute('data-target');

        for(let k = 0; k < itemsCategories.length; k++){
            itemsCategories[k].classList.remove('active');
            itemsCategories[k].classList.add('delete');

            if(itemsCategories[k].getAttribute('data-item') == targetData || targetData == "all"){
                itemsCategories[k].classList.remove('delete');
                itemsCategories[k].classList.add('active');
            }
        }
    });
}



//CREACIÓN DE ELEMENTO PRIMERA SECCIÓN H1
$("#titular").prepend("<p>Sorprende siempre con los mejores dulces</p>");


//CREACIÓN ELEMENTO TERCERA SECCIÓN H3
$('.subintro1').prepend("<p>Cómo pedir</p>");
$(".subintro").prepend("<p>Queremos que tu compra sea sencilla y de acuerdo a lo que necesites. Conoce la mejor opción para ti.</p>")

//EVENTO EN FORMATOS DE PEDIDOS
let despacho=document.getElementById("efectoPrimero");

despacho.onmouseover=function(){
    despacho.innerHTML="Gratuito"
}

despacho.onmouseout=function(){
    despacho.innerHTML="Recoge en tienda"
}

let delivery=document.getElementById("efectoSegundo");

delivery.onmouseover=function(){
    delivery.innerHTML="Costo según distancia"
}

delivery.onmouseout=function(){
    delivery.innerHTML="Delivery a donde quieras"
}
