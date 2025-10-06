import { useMemo, useState } from 'react'
import './App.css'

const demoProducts = [
  {
    id: 1,
    name: 'Taladro Percutor 13mm',
    description:
      'Taladro eléctrico de 750W con velocidad variable, ideal para concreto y metal.',
    category: 'Electricidad',
    price: 159.99,
    unit: 'unidad',
  },
  {
    id: 2,
    name: 'Juego de Brocas Multiuso',
    description:
      'Set de 15 brocas con estuche magnético para madera, metal y concreto.',
    category: 'Accesorios',
    price: 42.5,
    unit: 'juego',
  },
  {
    id: 3,
    name: 'Martillo Carpintero 20oz',
    description: 'Mango de fibra de vidrio, cabeza anti rebote y grip ergonómico.',
    category: 'Manuales',
    price: 18.75,
    unit: 'unidad',
  },
  {
    id: 4,
    name: 'Llave Stilson 14"',
    description: 'Ajuste rápido para instalaciones hidráulicas y de gas domésticas.',
    category: 'Plomería',
    price: 36.95,
    unit: 'unidad',
  },
  {
    id: 5,
    name: 'Escalera Multiuso 12 pasos',
    description:
      'Aluminio reforzado con certificación industrial y soporte hasta 150kg.',
    category: 'Equipos',
    price: 229.0,
    unit: 'unidad',
  },
  {
    id: 6,
    name: 'Disco Corte Metal 7"',
    description: 'Disco abrasivo premium para cortes limpios en acero al carbono.',
    category: 'Accesorios',
    price: 6.8,
    unit: 'unidad',
  },
  {
    id: 7,
    name: 'Guantes de Seguridad Nitrilo',
    description: 'Resistentes a hidrocarburos, palma texturizada, talla universal.',
    category: 'Seguridad',
    price: 5.6,
    unit: 'par',
  },
  {
    id: 8,
    name: 'Kit Instalación Sanitarios',
    description:
      'Incluye codos, sellos, teflón y válvula de cierre para proyectos residenciales.',
    category: 'Plomería',
    price: 64.9,
    unit: 'kit',
  },
]

const views = {
  home: 'Inicio',
  catalog: 'Catálogo',
  cart: 'Cotizador',
  contact: 'Contacto',
}

function App() {
  const [activeView, setActiveView] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [cartItems, setCartItems] = useState([])

  const categories = useMemo(
    () => ['Todas', ...new Set(demoProducts.map((product) => product.category))],
    [],
  )

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return demoProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todas' || product.category === selectedCategory
      const matchesTerm =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)

      return matchesCategory && matchesTerm
    })
  }, [searchTerm, selectedCategory])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prev, { product, quantity: 1 }]
    })
    setActiveView('cart')
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setCartItems([])

  const orderTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const whatsappMessage = useMemo(() => {
    if (cartItems.length === 0) return ''

    const lines = cartItems.map(
      (item) =>
        `• ${item.product.name} (${item.quantity} ${item.product.unit}) - $${item.product.price.toFixed(2)}`,
    )

    return encodeURIComponent(
      `Hola, me gustaría cotizar:\n${lines.join('\n')}\nTotal estimado: $${orderTotal.toFixed(
        2,
      )}`,
    )
  }, [cartItems, orderTotal])

  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="brand" onClick={() => setActiveView('home')} role="button">
          <span className="brand-mark">Los Gigantes</span>
          <span className="brand-subtitle">Ferretería industrial & hogar</span>
        </div>
        <nav className="main-nav">
          {Object.entries(views).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={key === activeView ? 'active' : ''}
              onClick={() => setActiveView(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="content-area">
        {activeView === 'home' && <Home setActiveView={setActiveView} />}
        {activeView === 'catalog' && (
          <Catalog
            products={filteredProducts}
            addToCart={addToCart}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {activeView === 'cart' && (
          <Cart
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            orderTotal={orderTotal}
            whatsappMessage={whatsappMessage}
            clearCart={clearCart}
          />
        )}
        {activeView === 'contact' && <Contact />}
      </main>

      <a
        className="whatsapp-fab"
        href={
          whatsappMessage
            ? `https://wa.me/51999999999?text=${whatsappMessage}`
            : 'https://wa.me/51999999999'
        }
        target="_blank"
        rel="noreferrer"
      >
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

function Home({ setActiveView }) {
  return (
    <section className="home-view">
      <article className="hero">
        <div>
          <p className="eyebrow">Ferretería Mayorista y Minorista</p>
          <h1>Todo para construir, mantener y mejorar tus proyectos</h1>
          <p>
            Presenta tu catálogo completo con un flujo ágil: búsqueda lateral, filtros
            dinámicos y cotización directa por WhatsApp.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={() => setActiveView('catalog')}>
              Ver catálogo
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => setActiveView('contact')}
            >
              Habla con un asesor
            </button>
          </div>
        </div>
        <ul className="hero-highlights">
          <li>
            <h3>+1,200 productos</h3>
            <p>Clasificados por rubro, con fichas técnicas y stock actualizado.</p>
          </li>
          <li>
            <h3>Catálogo inteligente</h3>
            <p>Filtra por categoría, aplicación o marca en segundos.</p>
          </li>
          <li>
            <h3>Cotiza al instante</h3>
            <p>Selecciona los productos y envía el detalle por WhatsApp en un clic.</p>
          </li>
        </ul>
      </article>
      <section className="featured-categories">
        <h2>Rubros destacados</h2>
        <div className="category-grid">
          {['Electricidad', 'Plomería', 'Seguridad', 'Equipos'].map((category) => (
            <div className="category-card" key={category}>
              <h3>{category}</h3>
              <p>
                Componentes seleccionados para proyectos industriales y residenciales.
              </p>
              <button type="button" onClick={() => setActiveView('catalog')}>
                Ver productos
              </button>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

function Catalog({
  products,
  addToCart,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <section className="catalog-view">
      <aside className="filters">
        <h2>Buscar productos</h2>
        <label htmlFor="product-search" className="filter-label">
          Palabra clave
        </label>
        <input
          id="product-search"
          type="search"
          placeholder="Taladro, broca, escalera..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="filter-group">
          <p className="filter-label">Categorías</p>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className={category === selectedCategory ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter-cta">
          <p>¿Buscas algo específico?</p>
          <a href="https://wa.me/51999999999" target="_blank" rel="noreferrer">
            Escríbenos por WhatsApp
          </a>
        </div>
      </aside>

      <div className="product-results">
        <header>
          <h2>Catálogo</h2>
          <p>
            {products.length} producto{products.length !== 1 && 's'} disponibles según tu
            búsqueda.
          </p>
        </header>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-badge">{product.category}</div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-footer">
                <div>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <span className="product-unit">/ {product.unit}</span>
                </div>
                <button type="button" onClick={() => addToCart(product)}>
                  Añadir a cotización
                </button>
              </div>
            </article>
          ))}
          {products.length === 0 && (
            <div className="empty-state">
              <h3>Sin coincidencias</h3>
              <p>
                Ajusta tu búsqueda o selecciona otra categoría para seguir explorando el
                catálogo.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Cart({ cartItems, updateQuantity, orderTotal, whatsappMessage, clearCart }) {
  return (
    <section className="cart-view">
      <header>
        <h2>Resumen de cotización</h2>
        <p>
          Ajusta cantidades y envía la selección completa directamente a nuestro equipo de
          ventas.
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <h3>Tu carrito está vacío</h3>
          <p>Explora el catálogo y añade productos para armar tu cotización.</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.product.id}>
                <div>
                  <h3>{item.product.name}</h3>
                  <p>{item.product.description}</p>
                  <span className="cart-meta">{item.product.category}</span>
                </div>
                <div className="cart-actions">
                  <label htmlFor={`quantity-${item.product.id}`}>Cantidad</label>
                  <input
                    id={`quantity-${item.product.id}`}
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.product.id, Number(event.target.value))
                    }
                  />
                  <span className="cart-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <footer className="cart-summary">
            <div>
              <p>Total estimado</p>
              <strong>${orderTotal.toFixed(2)}</strong>
            </div>
            <div className="cart-buttons">
              <button type="button" className="secondary" onClick={clearCart}>
                Vaciar carrito
              </button>
              <a
                className="primary"
                href={`https://wa.me/51999999999?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                Enviar por WhatsApp
              </a>
            </div>
          </footer>
        </>
      )}
    </section>
  )
}

function Contact() {
  return (
    <section className="contact-view">
      <header>
        <h2>Contacto comercial</h2>
        <p>
          Cuéntanos qué necesitas y nuestro equipo de ventas preparará la cotización más
          conveniente.
        </p>
      </header>
      <div className="contact-grid">
        <form className="contact-form">
          <label htmlFor="contact-name">Nombre y empresa</label>
          <input id="contact-name" type="text" placeholder="Ingresa tus datos" />

          <label htmlFor="contact-email">Correo electrónico</label>
          <input id="contact-email" type="email" placeholder="tucorreo@empresa.com" />

          <label htmlFor="contact-phone">Teléfono</label>
          <input id="contact-phone" type="tel" placeholder="999 999 999" />

          <label htmlFor="contact-message">Detalle de la solicitud</label>
          <textarea
            id="contact-message"
            rows="4"
            placeholder="Incluye cantidades, marcas o plazos aproximados"
          />

          <button type="submit">Solicitar cotización</button>
        </form>
        <aside className="contact-info">
          <h3>También puedes visitarnos</h3>
          <p>
            Av. Principal 123, Lima. <br />
            Lunes a sábado de 8:00 a 18:00.
          </p>
          <h3>Atención inmediata</h3>
          <ul>
            <li>Central telefónica: (01) 555-8899</li>
            <li>Ventas corporativas: ventas@losgigantes.pe</li>
            <li>Servicio técnico: soporte@losgigantes.pe</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default App
