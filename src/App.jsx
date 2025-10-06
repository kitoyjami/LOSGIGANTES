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

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="header-top">
          <span>Distribuidores oficiales con cobertura nacional</span>
          <div className="top-links">
            <a href="tel:+5115558899">Central: (01) 555-8899</a>
            <a href="mailto:ventas@losgigantes.pe">ventas@losgigantes.pe</a>
          </div>
        </div>
        <div className="header-main">
          <div className="brand" onClick={() => setActiveView('home')} role="button">
            <span className="brand-mark">Los Gigantes</span>
            <span className="brand-subtitle">Compañía Ferretera</span>
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
                {key === 'cart' && cartCount > 0 && (
                  <span className="nav-count">{cartCount}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="header-cta"
              onClick={() => setActiveView('contact')}
            >
              Contacta a un asesor
            </button>
            <button
              type="button"
              className={`cart-trigger${activeView === 'cart' ? ' active' : ''}`}
              onClick={() => setActiveView('cart')}
            >
              Mi cotización
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
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

      <Footer setActiveView={setActiveView} />

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
        <div className="hero-copy">
          <p className="eyebrow">Ferretería mayorista y proyectos</p>
          <h1>Soluciones profesionales para la industria, la minería y el hogar</h1>
          <p>
            Integrá un catálogo con filtros inteligentes, precios referenciales y un flujo de
            cotización que llega directo a WhatsApp para acelerar tus ventas.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={() => setActiveView('catalog')}>
              Explorar catálogo
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => setActiveView('contact')}
            >
              Agendar asesoría
            </button>
          </div>
          <dl className="hero-metrics">
            <div>
              <dt>+1,200</dt>
              <dd>SKUs en stock inmediato</dd>
            </div>
            <div>
              <dt>48h</dt>
              <dd>Promedio de despacho en Lima</dd>
            </div>
            <div>
              <dt>24/7</dt>
              <dd>Atención para proyectos críticos</dd>
            </div>
          </dl>
        </div>
        <div className="hero-showcase">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-card">
            <h3>Logística de confianza</h3>
            <p>
              Coordinamos entregas programadas y soporte técnico con cobertura nacional.
            </p>
            <button type="button" onClick={() => setActiveView('catalog')}>
              Ver líneas de producto
            </button>
          </div>
        </div>
      </article>

      <section className="commitment">
        <h2>Nuestro compromiso</h2>
        <div className="commitment-grid">
          <article>
            <span role="img" aria-hidden="true">
              🛠️
            </span>
            <h3>Herramientas certificadas</h3>
            <p>Trabajamos con marcas líderes y garantías directas del fabricante.</p>
          </article>
          <article>
            <span role="img" aria-hidden="true">
              🚚
            </span>
            <h3>Delivery especializado</h3>
            <p>Unidades equipadas para entregas voluminosas y seguimiento en tiempo real.</p>
          </article>
          <article>
            <span role="img" aria-hidden="true">
              🤝
            </span>
            <h3>Atención personalizada</h3>
            <p>Ejecutivos comerciales dedicados a cada sector y necesidad.</p>
          </article>
        </div>
      </section>

      <section className="featured-categories">
        <div className="featured-copy">
          <h2>Rubros destacados</h2>
          <p>
            Organiza tu inventario por especialidad y permite que tus clientes encuentren todo
            en segundos.
          </p>
        </div>
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

      <section className="brands-strip" aria-label="Marcas aliadas">
        <p>Distribuidores autorizados de:</p>
        <ul>
          {['Truper', 'Stanley', 'Bosch', 'DeWalt', 'Sika', '3M'].map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
      </section>

      <section className="cta-banner">
        <div>
          <h2>¿Listo para cotizar tu próximo proyecto?</h2>
          <p>
            Integra tu catálogo, define tus precios referenciales y recibe las solicitudes por
            WhatsApp sin fricciones.
          </p>
        </div>
        <button type="button" onClick={() => setActiveView('cart')}>
          Revisar mi cotización
        </button>
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

function Footer({ setActiveView }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-column">
          <div className="footer-brand">
            <span className="brand-mark">Los Gigantes</span>
            <span className="brand-subtitle">Compañía Ferretera</span>
          </div>
          <p>
            Soluciones integrales para construcción, minería e industria. Acompañamos tus
            proyectos con asesoría técnica y logística confiable.
          </p>
        </div>
        <div className="footer-column">
          <h3>Enlaces</h3>
          <ul>
            {Object.entries(views).map(([key, label]) => (
              <li key={key}>
                <button type="button" onClick={() => setActiveView(key)}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contacto</h3>
          <ul>
            <li>Av. Principal 123, Lima</li>
            <li>
              <a href="tel:+5115558899">(01) 555-8899</a>
            </li>
            <li>
              <a href="mailto:ventas@losgigantes.pe">ventas@losgigantes.pe</a>
            </li>
            <li>Lunes a sábado de 8:00 a 18:00</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>Recibe novedades, lanzamientos y promociones especiales.</p>
          <form className="footer-form">
            <input type="email" placeholder="tu correo" aria-label="Correo electrónico" />
            <button type="submit">Suscribirme</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Los Gigantes Compañía Ferretera. Todos los derechos reservados.</p>
        <div className="footer-socials">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default App
