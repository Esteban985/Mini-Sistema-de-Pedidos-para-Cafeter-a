class Producto {
    #nombre;
    #precio;
    #categoria;
    #descripcion;
    #id;
    #cantidad;
    #subTotal;

    constructor(nombre, precio, categoria, descripcion) {
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.descripcion = descripcion
        this.#id = Producto.generadorId()
        this.#cantidad = 0
        this.#subTotal = 0
    }

    set nombre(value) {
        this.#nombre = value
    }

    set precio(value) {
        this.#precio = value
    }

    set categoria(value) {
        this.#categoria = value
    }

    set descripcion(value) {
        this.#descripcion = value
    }

    get nombre() {
        return this.#nombre
    }

    get precio() {
        return this.#precio
    }

    get categoria() {
        return this.#categoria
    }

    get descripcion() {
        return this.#descripcion
    }

    get id() {
        return this.#id
    }

    get cantidad() {
        return this.#cantidad
    }

    get subTotal() {
        return this.#subTotal
    }

    static generadorId() {
        return Date.now() + Math.random()
    }

    aumentarCantidad() {
        this.#cantidad = this.#cantidad + 1
    }

    calcularSubtotal() {
        this.#subTotal = this.#precio * this.#cantidad
    }
}

class Pedido {
    #productos;
    #impuesto;
    #producto;
    #subTotalGeneral;
    #total;

    constructor() {
        this.#impuesto = 0
        this.#productos = []
        this.#subTotalGeneral = 0
        this.#total = 0
    }

    set productos(value) {
        this.#productos = value
    }

    get productos() {
        return this.#productos
    }

    get subTotalGeneral() {
        return this.#subTotalGeneral
    }

    get impuesto() {
        return this.#impuesto.toFixed(1)
    }

    get total() {
        return this.#total.toFixed(2)
    }

    agregarProducto(producto) {
        if (this.#productos.includes(producto)) {
            producto.aumentarCantidad()
        } else {
            this.#productos.push(producto)
            producto.aumentarCantidad()
        }
    }

    calcularTotalGeneral() {
        this.#subTotalGeneral = 0
        this.#productos.forEach(item => {
            this.#subTotalGeneral += item.subTotal
        })
    }

    calcularImpuesto() {
        this.#impuesto = 0.05 * this.subTotalGeneral
    }

    calcularTotal() {
        this.#total = this.#subTotalGeneral + this.#impuesto
    }
}

let producto1 = new Producto('Café Americano', 12, 'Bebidas Calientes', 'Café negro tradicional')
let producto2 = new Producto('Café Latte', 18, 'Bebidas Calientes', 'Café con leche espumada')
let producto3 = new Producto('Frappe de Chocolate', 25, 'Bebidas Frias', 'Bebida fría con chocolate y crema')
let producto4 = new Producto('Smoothie de Fresa', 22, 'Bebidas Frias', 'Batido natural de fresa')
let producto5 = new Producto('Muffin de Vainilla', 15, 'Postres', 'Pan dulce suave de vainilla')
let producto6 = new Producto('Cheesecake', 28, 'Postres', 'Pastel frío de queso')
let producto7 = new Producto('Sandwich de Pollo', 30, 'Postres', 'Sandwich con pollo y vegetales')
let producto8 = new Producto('Bagel con Queso', 20, 'Postres', 'Bagel tostado con queso crema')

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]

let contProducto = document.querySelector('#products-container')
let pedidosActuales = document.querySelector('#order-items-container')
let mostrarSubtotalGeneral = document.querySelector('#summary-subtotal')
let mostrarImpuesto = document.querySelector('#summary-tax')
let mostrarTotal = document.querySelector('#summary-total')
let mostrarPedidoCompletado = document.querySelector('#modal-receipt-items')
let btnFinalizar = document.querySelector('#btn-checkout')
let numeroTotal = document.querySelector('#modal-total-paid')

let pedido = new Pedido()

contProducto.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-add-order')) {
        productos.forEach(item => {
            if (item.id == event.target.id) {
                pedido.agregarProducto(item)
                item.calcularSubtotal()
                pedido.calcularTotalGeneral()
                pedido.calcularImpuesto()
                pedido.calcularTotal()
                mostrarPedido(pedido.total, pedido.impuesto, pedido.subTotalGeneral, pedido.productos)
            }
        })
    }
})

btnFinalizar.addEventListener('click',(event)=>{
    completarPedido(pedido)
})

pedidosActuales.addEventListener('click',(event)=>{
    if(event.target.classList.contains('bi-plus')){
        console.log(event.target.id)
    }
})

const agregarProductos = (contProducto, productos) => {
    let html = ''

    productos.forEach(producto => {
        html += `
        <div class="col">
                        <div class="card h-100 product-card shadow-sm border-0">
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="card-title h6 mb-0 text-dark fw-bold">${producto.nombre}</h5>
                                    <span class="badge bg-amber text-dark">${producto.categoria}</span>
                                </div>
                                <p class="card-text text-muted small flex-grow-1">${producto.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center mt-3">
                                    <span class="fs-5 fw-bold text-primary">Q${producto.precio}.00</span>
                                    <button id="${producto.id}" class="btn btn-sm btn-add-order rounded-pill px-3">
                                        <i class="bi bi-plus-lg me-1"></i>Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
        </div>
        `
    })
    contProducto.innerHTML = html
}

const mostrarPedido = (totalFinal, totalImpuesto, subTotalGeneral, productos) => {
    let html = ''

    productos.forEach(item => {
        html += `
            <div class="p-3 border-bottom order-item">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                                        <h6 class="mb-0 fw-bold text-dark">${item.nombre}</h6>
                                        <small class="text-muted">Precio unitario: Q${item.precio}.00</small>
                    </div>
                    <span class="fw-bold text-dark" id="item-subtotal">Q${item.subTotal}.00</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                    <div class="btn-group btn-group-sm rounded-pill shadow-sm bg-light" role="group">
                                        <button type="button" class="btn btn-light border-0 px-2">
                                        <i id='${item.id}' class="bi bi-dash"></i></button>
                                        <span
                                            class="btn btn-light border-0 bg-white px-3 fw-bold disabled text-dark">${item.cantidad}</span>
                                        <button type="button" class="btn btn-light border-0 px-2">
                                        <i id='${item.id}' class="bi bi-plus"></i></button>
                                    </div>
                                    <button id='${item.id}' class="btn btn-sm text-danger border-0 p-1" title="Eliminar del pedido">
                                        <i class="bi bi-trash3-fill"></i> Eliminar
                                    </button>
                </div>
             </div>
        `
    })

    pedidosActuales.innerHTML = html
    mostrarSubtotalGeneral.textContent = `Q${subTotalGeneral}.00`
    mostrarImpuesto.textContent = `Q${totalImpuesto}`
    mostrarTotal.textContent = `Q${totalFinal}`
}

const completarPedido = (pedido) => {
    let html1 = '<p class="fw-bold text-secondary border-bottom pb-1 mb-2">Productos:</p>'
    let html2 = ''

    pedido.productos.forEach(item => {
        html2 += `
        <div class="d-flex justify-content-between small text-dark mb-1">
            <span>${item.nombre} x${item.cantidad}</span>
            <span>Q${item.subTotal}</span>
        </div>
        `
    })

    mostrarPedidoCompletado.innerHTML = html1 + html2
    numeroTotal.textContent = `Q${pedido.total}`
}


agregarProductos(contProducto, productos)