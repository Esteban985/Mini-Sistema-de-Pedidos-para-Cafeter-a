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

    disminuirCantidad() {
        this.#cantidad = this.#cantidad - 1
    }

    calcularSubtotal() {
        this.#subTotal = this.#precio * this.#cantidad
    }

    limpiarValores() {
        this.#cantidad = 0
        this.#subTotal = 0
    }
}

class Pedido {
    #productos;
    #impuesto;
    #subTotalGeneral;
    #total;

    constructor() {
        this.#impuesto = 0
        this.#productos = []
        this.#subTotalGeneral = 0
        this.#total = 0
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

    eliminarProducto(id) {
        let temporal = []
        this.#productos.forEach(item => {
            if (item.id != id) {
                temporal.push(item)
            }
        })
        this.#productos = temporal
    }

    calcularTotalGeneral() {
        this.#subTotalGeneral = 0
        this.#productos.forEach(item => {
            this.#subTotalGeneral += item.subTotal
        })
    }

    calcularImpuesto() {
        this.#impuesto = 0.05 * this.#subTotalGeneral
    }

    calcularTotal() {
        this.#total = this.#subTotalGeneral + this.#impuesto
    }

    vaciarPedido() {
        this.#productos.forEach(item => {
            item.limpiarValores()
        })
        this.#productos = []
        this.#impuesto = 0
        this.#subTotalGeneral = 0
        this.#total = 0
    }
}

let producto1 = new Producto('Café Americano', 12, 'Bebida-Caliente', 'Café negro tradicional')
let producto2 = new Producto('Café Latte', 18, 'Bebida-Caliente', 'Café con leche espumada')
let producto3 = new Producto('Frappe de Chocolate', 25, 'Bebida-Fria', 'Bebida fría con chocolate y crema')
let producto4 = new Producto('Smoothie de Fresa', 22, 'Bebida-Fria', 'Batido natural de fresa')
let producto5 = new Producto('Muffin de Vainilla', 15, 'Postre', 'Pan dulce suave de vainilla')
let producto6 = new Producto('Cheesecake', 28, 'Postre', 'Pastel frío de queso')
let producto7 = new Producto('Sandwich de Pollo', 30, 'Postre', 'Sandwich con pollo y vegetales')
let producto8 = new Producto('Bagel con Queso', 20, 'Postre', 'Bagel tostado con queso crema')
let producto9 = new Producto('Tostadas con Aguacate', 30, 'Comida', 'Pan tostado con aguacate y especias')
let producto10 = new Producto('Hot Dog Especial', 25, 'Comida', 'Salchicha con salsas y vegetales')
let producto11 = new Producto('Nachos con Queso', 28, 'Comida', 'Totopos crujientes cubiertos con queso')
let producto12 = new Producto('Pan con Pollo', 30, 'Comida', 'Pan suave relleno de pollo desmenuzado')
let producto13 = new Producto('Baguette de Pavo', 35, 'Comida', 'Pan baguette con pavo y vegetales frescos')
let producto14 = new Producto('Mini Pizza Personal', 38, 'Comida', 'Pizza individual de queso y salsa de tomate')
let producto15 = new Producto('Empanada de Carne', 18, 'Comida', 'Empanada horneada rellena de carne')

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15]

let contProducto = document.querySelector('#products-container')
let pedidosActuales = document.querySelector('#order-items-container')
let mostrarSubtotalGeneral = document.querySelector('#summary-subtotal')
let mostrarImpuesto = document.querySelector('#summary-tax')
let mostrarTotal = document.querySelector('#summary-total')
let mostrarPedidoCompletado = document.querySelector('#modal-receipt-items')
let btnFinalizar = document.querySelector('#btn-checkout')
let numeroTotal = document.querySelector('#modal-total-paid')
let btnVaciar = document.querySelector('#btn-clear')
let btnFinalizarCompra = document.querySelector('#btnTerminarCompra')
let filtrarCategoria = document.querySelector('#category-filters')
let inputBuscar = document.querySelector('#search-input')

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

btnFinalizar.addEventListener('click', (event) => {
    completarPedido(pedido)
})

pedidosActuales.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-plus') || event.target.classList.contains('aumentar')) {
        pedido.productos.forEach(item => {
            if (item.id == event.target.id) {
                pedido.agregarProducto(item)
                item.calcularSubtotal()
                pedido.calcularTotalGeneral()
                pedido.calcularImpuesto()
                pedido.calcularTotal()
                mostrarPedido(pedido.total, pedido.impuesto, pedido.subTotalGeneral, pedido.productos)
            }
        })
    } else if (event.target.classList.contains('bi-dash') || event.target.classList.contains('disminuir')) {
        pedido.productos.forEach(item => {
            if (item.id == event.target.id) {
                if (item.cantidad <= 1) {
                    item.disminuirCantidad()
                    pedido.eliminarProducto(item.id)
                    pedido.calcularTotalGeneral()
                    pedido.calcularImpuesto()
                    pedido.calcularTotal()
                    mostrarPedido(pedido.total, pedido.impuesto, pedido.subTotalGeneral, pedido.productos)
                } else {
                    item.disminuirCantidad()
                    item.calcularSubtotal()
                    pedido.calcularTotalGeneral()
                    pedido.calcularImpuesto()
                    pedido.calcularTotal()
                    mostrarPedido(pedido.total, pedido.impuesto, pedido.subTotalGeneral, pedido.productos)
                }
            }
        })
    } else if (event.target.title == 'Eliminar del pedido') {
        pedido.productos.forEach(item => {
            if (item.id == event.target.id) {
                item.limpiarValores()
            }
        })
        pedido.eliminarProducto(event.target.id)
        pedido.calcularTotalGeneral()
        pedido.calcularImpuesto()
        pedido.calcularTotal()
        mostrarPedido(pedido.total, pedido.impuesto, pedido.subTotalGeneral, pedido.productos)
    }
})

btnVaciar.addEventListener('click', (event) => {
    if (pedido.productos.length == 0) {
        alert('No hay ningun producto para eliminar')
    } else {
        pedido.vaciarPedido()
        mostrarPedido(pedido.total, pedido.impuesto, pedido.subTotalGeneral, pedido.productos)
    }
})

btnFinalizarCompra.addEventListener('click', (event) => {
    pedido.vaciarPedido()
    mostrarPedido(pedido.total, pedido.impuesto, pedido.subTotalGeneral, pedido.productos)
})

filtrarCategoria.addEventListener('click', (event) => {
    if (event.target.classList.contains('bebida-caliente')) {
        agregarProductos(contProducto, productos, 'bebida-caliente')
    } else if (event.target.classList.contains('bebida-fria')) {
        agregarProductos(contProducto, productos, 'bebida-fria')
    } else if (event.target.classList.contains('postre')) {
        agregarProductos(contProducto, productos, 'postre')
    } else if (event.target.classList.contains('todo')) {
        agregarProductos(contProducto, productos, 'todo')
    } else if (event.target.classList.contains('comida')) {
        agregarProductos(contProducto, productos, 'comida')
    }
})

const agregarProductos = (contProducto, productos, queMostrar) => {
    let html = ''

    productos.forEach(producto => {
        if (queMostrar == 'bebida-caliente') {
            if (producto.categoria.toLowerCase() == queMostrar) {
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
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        } else if (queMostrar == 'bebida-fria') {
            if (producto.categoria.toLowerCase() == queMostrar) {
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
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        } else if (queMostrar == 'postre') {
            if (producto.categoria.toLowerCase() == queMostrar) {
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
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        } else if (queMostrar == 'todo') {
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
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`
        } else if (queMostrar == 'comida') {
            if (producto.categoria.toLowerCase() == queMostrar) {
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
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        }
    })
    contProducto.innerHTML = html
    btnFinalizar.disabled = true
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
                                        <button id='${item.id}' type="button" class="disminuir btn btn-light border-0 px-2">
                                        <i id='${item.id}' class="bi bi-dash"></i></button>
                                        <span
                                            class="btn btn-light border-0 bg-white px-3 fw-bold disabled text-dark">${item.cantidad}</span>
                                        <button id='${item.id}' type="button" class="aumentar btn btn-light border-0 px-2">
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

    if (productos.length == 0) {
        btnFinalizar.disabled = true
    } else {
        btnFinalizar.disabled = false
    }
}

const completarPedido = (pedido) => {
    let html1 = '<p class="fw-bold text-secondary border-bottom pb-1 mb-2">Productos:</p>'
    let html2 = ''
    let html3 = `<div class="d-flex justify-content-between small text-dark mb-1">
            <span>Impuesto/Recargo (5%):</span>
            <span>Q${pedido.impuesto}</span>
        </div>`

    pedido.productos.forEach(item => {
        html2 += `
        <div class="d-flex justify-content-between small text-dark mb-1">
            <span>${item.nombre} x${item.cantidad}</span>
            <span>Q${item.subTotal}</span>
        </div>
        `
    })

    mostrarPedidoCompletado.innerHTML = html1 + html2 + html3
    numeroTotal.textContent = `Q${pedido.total}`
}


agregarProductos(contProducto, productos, 'todo')