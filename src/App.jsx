import { useEffect, useMemo, useState } from 'react'
import './App.css'

const demoProducts = [
  {
    id: 1,
    name: 'Taladro Percutor 13mm',
    brand: 'Bosch Professional',
    sku: 'GBM13-2RE',
    description:
      'Taladro eléctrico de 750W con velocidad variable y sistema de percusión para concreto, metal y madera.',
    category: 'Electricidad',
    price: 159.99,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1527358040820-09d9d5c4725f?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-588e25a58d1d?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1582719478250-4dd1c92f9ae1?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'En stock inmediato',
    leadTime: 'Despacho en 24h para Lima Metropolitana',
    features: [
      'Motor de 750W para trabajos continuos',
      'Portabrocas automático de 13mm con bloqueo rápido',
      'Selector de velocidad y reversa para mayor control',
    ],
    specs: {
      Potencia: '750 W',
      Velocidad: '0-3,000 rpm',
      Percusión: '48,000 ipm',
      Peso: '1.8 kg',
    },
    downloads: [
      {
        label: 'Ficha técnica Bosch',
        url: 'https://www.bosch-pt.com/wcsstore/BoschProfessionalB2BStorefrontAssetStore/ocsmedia/optimized/large/678/GBH_2-26_DRE.pdf',
      },
      {
        label: 'Manual de usuario',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    ],
  },
  {
    id: 2,
    name: 'Juego de Brocas Multiuso 15 piezas',
    brand: 'DeWalt',
    sku: 'DW1354',
    description:
      'Set con recubrimiento de titanio y estuche magnético para perforaciones en metal, madera y PVC.',
    category: 'Accesorios',
    price: 42.5,
    unit: 'juego',
    image:
      'https://images.unsplash.com/photo-1515573990-aee0a0ee3c8d?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Envío en 48h',
    leadTime: 'Stock en almacén Ate y Callao',
    features: [
      'Puntas afiladas para perforación rápida',
      'Recubrimiento de titanio de larga duración',
      'Estuche magnético con clip para cinturón',
    ],
    specs: {
      Presentación: '15 piezas',
      Material: 'Acero HSS recubierto',
      Diámetros: '1.5 mm a 10 mm',
      Peso: '0.6 kg',
    },
    downloads: [
      {
        label: 'Catálogo DeWalt accesorios',
        url: 'https://www.dewalt.com/sites/default/files/2022-03/DEWALT-Access-oryCatalog.pdf',
      },
    ],
  },
  {
    id: 3,
    name: 'Martillo Carpintero 20oz',
    brand: 'Truper',
    sku: 'MART-20F',
    description: 'Mango de fibra de vidrio con grip ergonómico anti vibraciones.',
    category: 'Manuales',
    price: 18.75,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1517348025100-4d1d6308b0a3?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Disponible para retiro en tienda',
    leadTime: 'Entrega a provincia en 72h',
    features: [
      'Cabeza pulida y balanceada',
      'Zona magnética para fijar clavos',
      'Garantía de 10 años contra defectos',
    ],
    specs: {
      Peso: '0.9 kg',
      Longitud: '33 cm',
      Material: 'Acero forjado / fibra de vidrio',
      Garantía: '10 años',
    },
    downloads: [
      {
        label: 'Ficha técnica Truper',
        url: 'https://www.truper.com.mx/Documentos/000020877.pdf',
      },
    ],
  },
  {
    id: 4,
    name: 'Llave Stillson 14"',
    brand: 'Ridgid',
    sku: '31020',
    description: 'Cuerpo de hierro dúctil y mordazas templadas para tuberías hasta 2".',
    category: 'Plomería',
    price: 36.95,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1616628182500-94e3326d6c7c?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597003037667-359b8d4a239b?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1582719478442-7aa7d61b52f9?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Stock permanente',
    leadTime: 'Cobertura nacional con operadores aliados',
    features: [
      'Ajuste rápido gracias a rosca trapezoidal',
      'Mordazas reemplazables y dentado agresivo',
      'Estructura de hierro dúctil resistente a impactos',
    ],
    specs: {
      Longitud: '355 mm',
      Apertura: 'Hasta 60 mm',
      Material: 'Hierro dúctil y acero aleado',
      Peso: '1.5 kg',
    },
    downloads: [
      {
        label: 'Catálogo Ridgid tuberías',
        url: 'https://cdn2.ridgid.com/resources/media?key=ridgid_pipe_wrenches_catalog.pdf',
      },
    ],
  },
  {
    id: 5,
    name: 'Escalera Multiuso 12 pasos',
    brand: 'Werner',
    sku: 'MT-17',
    description:
      'Estructura de aluminio reforzado con 24 configuraciones y certificación ANSI tipo IA.',
    category: 'Equipos',
    price: 229.0,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1569428034239-5c76dc1123cf?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Bajo pedido 24h',
    leadTime: 'Despachos programados a obra con coordinación previa',
    features: [
      '24 configuraciones entre escalera recta y tijera',
      'Capacidad de carga de 150 kg certificada',
      'Bisagras con bloqueo automático y peldaños antideslizantes',
    ],
    specs: {
      'Altura máxima': '5.2 m',
      Material: 'Aluminio 6005-T5',
      Certificación: 'ANSI IA / OSHA',
      Peso: '20.4 kg',
    },
    downloads: [
      {
        label: 'Guía de uso Werner',
        url: 'https://www.wernerco.com/us/-/media/Project/OneWerner/Documents/ProductLiterature/Multi-Position-Ladder-Manual.pdf',
      },
    ],
  },
  {
    id: 6,
    name: 'Disco Corte Metal 7"',
    brand: '3M Cubitron II',
    sku: '66514',
    description: 'Disco abrasivo premium para cortes limpios en acero al carbono e inoxidable.',
    category: 'Accesorios',
    price: 6.8,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Stock alto',
    leadTime: 'Disponibilidad inmediata en Lima y provincias',
    features: [
      'Abrasivo cerámico de autoafilado',
      'Reduce la generación de chispas y rebabas',
      'Duración hasta 2x frente a discos tradicionales',
    ],
    specs: {
      Diámetro: '180 mm',
      Espesor: '1.6 mm',
      'RPM máx.': '8,600',
      Aplicación: 'Corte en frío de acero',
    },
    downloads: [
      {
        label: 'Ficha Cubitron II',
        url: 'https://multimedia.3m.com/mws/media/1549904O/cubitron-ii-cut-off-wheels-brochure.pdf',
      },
    ],
  },
  {
    id: 7,
    name: 'Guantes Nitrilo Premium',
    brand: 'Ansell',
    sku: '37-175',
    description: 'Protección contra químicos e hidrocarburos con palma texturizada.',
    category: 'Seguridad',
    price: 5.6,
    unit: 'par',
    image:
      'https://images.unsplash.com/photo-1619972828020-2c1e1d4b53ef?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-4a46f608bae2?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1582719478250-ccb2e9fe09d6?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Stock por tallas S-M-L',
    leadTime: 'Reabastecimiento semanal',
    features: [
      'Nitrilo de alta resistencia a químicos',
      'Acabado arenoso para máximo agarre',
      'Forro de algodón flocado interior',
    ],
    specs: {
      Largo: '330 mm',
      Espesor: '0.38 mm',
      Norma: 'EN 374, EN 388',
      Color: 'Verde',
    },
    downloads: [
      {
        label: 'Hoja de seguridad Ansell',
        url: 'https://assets.ansell.com/documents/chemical-gloves/solvex-37-175-PI-es.pdf',
      },
    ],
  },
  {
    id: 8,
    name: 'Kit Instalación Sanitarios',
    brand: 'Vainsa',
    sku: 'KIT-SANI-01',
    description:
      'Set completo con codos, sellos, teflón y válvula de cierre para proyectos residenciales.',
    category: 'Plomería',
    price: 64.9,
    unit: 'kit',
    image:
      'https://images.unsplash.com/photo-1582719478250-04fd7c3d0a3d?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Listo para despacho',
    leadTime: 'Envíos en 48h a Lima y provincias principales',
    features: [
      'Incluye válvula de esfera y llave de paso cromada',
      'Sellos y empaques de silicona grado sanitario',
      'Manual ilustrado paso a paso',
    ],
    specs: {
      Componentes: '18 piezas',
      Materiales: 'PVC, latón cromado, PTFE',
      Uso: 'Instalaciones sanitarias domésticas',
      Garantía: '2 años',
    },
    downloads: [
      {
        label: 'Guía de instalación',
        url: 'https://www.orimi.com/pdf-test.pdf',
      },
    ],
  },
  {
    id: 9,
    name: 'Pintura Epóxica Bicomponente',
    brand: 'Sika',
    sku: 'Sikafloor-263',
    description: 'Recubrimiento epóxico autonivelante resistente a químicos y abrasión.',
    category: 'Acabados',
    price: 129.0,
    unit: 'kit 20kg',
    image:
      'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Producción bajo pedido 72h',
    leadTime: 'Asistencia técnica en obra incluida',
    features: [
      'Acabado autonivelante de alto brillo',
      'Excelente resistencia química y mecánica',
      'Compatible con sistemas antideslizantes',
    ],
    specs: {
      Rendimiento: '0.7 kg/m² por mm',
      Curado: '48h tránsito peatonal',
      Acabado: 'Brillante',
      Colores: 'Carta Sika Industrial',
    },
    downloads: [
      {
        label: 'Ficha técnica Sika',
        url: 'https://per.sika.com/dms/getdocument.get/94ab14da-e5d0-3c96-9116-73cf17a4c0cb/sikafloor-263-sl.pdf',
      },
      {
        label: 'Guía de preparación de superficies',
        url: 'https://per.sika.com/dms/getdocument.get/eb47779f-6957-3f58-9109-4ff57c939728/preparacion-superficies.pdf',
      },
    ],
  },
  {
    id: 10,
    name: 'Soldadora Inverter 200A',
    brand: 'Lincoln Electric',
    sku: 'Invertec 170S',
    description: 'Equipo portátil de soldadura SMAW/GTAW con tecnología IGBT y ventilación inteligente.',
    category: 'Soldadura',
    price: 499.0,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1582719478250-1df4c08eddf4?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Incluye capacitación inicial',
    leadTime: 'Entrega en 72h con instalación',
    features: [
      'Tecnología IGBT de alto desempeño',
      'Protección contra sobrecarga y polvo',
      'Compatible con generadores y variaciones de voltaje',
    ],
    specs: {
      Corriente: '10-170 A',
      Alimentación: '220 V monofásica',
      Peso: '9.5 kg',
      Garantía: '3 años',
    },
    downloads: [
      {
        label: 'Brochure Lincoln Electric',
        url: 'https://assets.lincolnelectric.com/assets/EU/DM/CE/EN-170S.pdf',
      },
    ],
  },
  {
    id: 11,
    name: 'Detector Láser Multilínea',
    brand: 'Stanley',
    sku: 'STHT77594',
    description: 'Nivel láser de líneas 360° con alcance de 25 metros y auto nivelación.',
    category: 'Medición',
    price: 215.0,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Incluye trípode y estuche rígido',
    leadTime: 'Retiro en tienda el mismo día',
    features: [
      'Rango de trabajo de 25 m (50 m con detector)',
      'Batería recargable con autonomía de 10h',
      'Base magnética giratoria 360°',
    ],
    specs: {
      Precisión: '±3 mm a 10 m',
      Protección: 'IP54',
      Batería: 'Li-ion 4 Ah',
      Peso: '0.9 kg',
    },
    downloads: [
      {
        label: 'Manual Stanley',
        url: 'https://www.stanleytools.com/sites/stanleytools/files/STHT77594_manual.pdf',
      },
    ],
  },
  {
    id: 12,
    name: 'Compresor de Aire 3HP 50L',
    brand: 'Ingersoll Rand',
    sku: 'SS3J5.5GH-WB',
    description: 'Compresor lubricado para trabajos industriales ligeros con tanque de 50 litros.',
    category: 'Neumática',
    price: 699.0,
    unit: 'unidad',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=640&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-35a19f8ecf66?auto=format&fit=crop&w=960&q=80',
      'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=960&q=80',
    ],
    availability: 'Incluye puesta en marcha',
    leadTime: 'Instalación y pruebas en 5 días',
    features: [
      'Capacidad de 11.8 CFM @ 90 PSI',
      'Motor de 3 HP con protector térmico',
      'Bomba de hierro fundido de dos etapas',
    ],
    specs: {
      Tanque: '50 L',
      'Presión máxima': '135 PSI',
      Alimentación: '220 V monofásica',
      Peso: '68 kg',
    },
    downloads: [
      {
        label: 'Ficha técnica Ingersoll Rand',
        url: 'https://www.ingersollrand.com/bin/productdocs/supportmaterials/air-compressor-ss3-manual.pdf',
      },
      {
        label: 'Checklist de mantenimiento',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    ],
  },
]

const solutionShowcase = [
  {
    title: 'Ferretería industrial',
    description:
      'Suministro de herramientas eléctricas y neumáticas para obras de gran escala, con trazabilidad de lote y soporte técnico.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=720&q=80',
    metric: 'Catálogo +850 SKUs',
  },
  {
    title: 'Infraestructura hidráulica',
    description:
      'Tubos, válvulas y accesorios certificados para plantas de tratamiento y proyectos de saneamiento.',
    image:
      'https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=720&q=80',
    metric: 'Cobertura 12 ciudades',
  },
  {
    title: 'Seguridad y EPP',
    description:
      'Inventario permanente de equipos de protección personal para minería, petróleo y construcción.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=720&q=80',
    metric: 'Despachos en 48h',
  },
]

const projectHighlights = [
  {
    title: 'Modernización de planta cementera',
    description:
      'Abastecimos líneas de potencia, anclajes y sistemas de seguridad con entregas programadas en obra.',
    image:
      'https://images.unsplash.com/photo-1582719478250-9ff3fe5cf29c?auto=format&fit=crop&w=960&q=80',
  },
  {
    title: 'Red de gas natural Lima Norte',
    description:
      'Coordinamos el suministro de herramientas de corte, válvulas y tuberías para más de 30 cuadrillas simultáneas.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c4b7b1b2b00b?auto=format&fit=crop&w=960&q=80',
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
  const [selectedProduct, setSelectedProduct] = useState(null)

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
          <div
            className="brand"
            onClick={() => setActiveView('home')}
            onKeyDown={(event) => event.key === 'Enter' && setActiveView('home')}
            role="button"
            tabIndex={0}
          >
            <img
              src="https://losgigantes.sistinfo.com/empresa/imagenes/brand_logo.png"
              alt="Los Gigantes Compañía Ferretera"
              className="brand-logo"
            />
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
            onSelectProduct={setSelectedProduct}
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

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={(product) => {
            addToCart(product)
            setSelectedProduct(null)
          }}
        />
      )}

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
          <div className="hero-image" aria-hidden="true" role="presentation" />
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

      <section className="showcase-grid">
        <header>
          <h2>Especialidades que potenciamos</h2>
          <p>
            Presenta tu portafolio estratégico con imágenes de proyectos reales y datos
            relevantes para cada vertical.
          </p>
        </header>
        <div className="showcase-cards">
          {solutionShowcase.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div>
                <span className="showcase-metric">{item.metric}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
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

      <section className="project-gallery">
        <header>
          <h2>Casos recientes</h2>
          <p>
            Demuestra el alcance de tu operación con ejemplos reales de sectores que confían en
            Los Gigantes.
          </p>
        </header>
        <div className="project-grid">
          {projectHighlights.map((project) => (
            <article key={project.title}>
              <img src={project.image} alt={project.title} loading="lazy" />
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
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
  onSelectProduct,
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
        <div className="filter-group">
          <p className="filter-label">Aplicaciones frecuentes</p>
          <ul className="filter-tags">
            {['Montaje industrial', 'Remodelación residencial', 'Minería y energía', 'Acabados'].map(
              (tag) => (
                <li key={tag}>
                  <span>{tag}</span>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="filter-cta">
          <p>¿Buscas algo específico?</p>
          <a href="https://wa.me/51999999999" target="_blank" rel="noreferrer">
            Escríbenos por WhatsApp
          </a>
        </div>
        <div className="filter-insight">
          <h3>Servicios incluidos</h3>
          <ul>
            <li>Asesoría técnica para selección de equipos</li>
            <li>Coordinación logística y entrega en obra</li>
            <li>Gestión de garantías y mantenimiento</li>
          </ul>
        </div>
      </aside>

      <div className="product-results">
        <header className="catalog-header">
          <span className="eyebrow">Catálogo profesional</span>
          <h2>Equipos y suministros listos para tus proyectos</h2>
          <p>
            Explora nuestra selección de productos destacados para el MVP. Cada ficha incluye
            datos técnicos, fotografías de referencia y descargas listas para compartir con tus
            clientes.
          </p>
          <dl className="catalog-stats">
            <div>
              <dt>{products.length}</dt>
              <dd>Productos filtrados actualmente</dd>
            </div>
            <div>
              <dt>12 líneas</dt>
              <dd>Inventario base en demostración</dd>
            </div>
            <div>
              <dt>+30</dt>
              <dd>Documentos descargables vinculados</dd>
            </div>
          </dl>
        </header>

        {products.length === 0 ? (
          <div className="empty-state">
            <h3>Sin coincidencias</h3>
            <p>
              Ajusta tu búsqueda o selecciona otra categoría para seguir explorando el catálogo.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <article
                className="product-card"
                key={product.id}
                onClick={() => onSelectProduct(product)}
                onKeyDown={(event) => event.key === 'Enter' && onSelectProduct(product)}
                role="button"
                tabIndex={0}
              >
                <figure className="product-media">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="product-badge">{product.category}</div>
                </figure>
                <div className="product-content">
                  <span className="product-brand">{product.brand}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {product.features?.length > 0 && (
                    <ul className="product-feature-list">
                      {product.features.slice(0, 3).map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="product-footer">
                  <div className="product-pricing">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <span className="product-unit">/ {product.unit}</span>
                  </div>
                  <div className="product-actions">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        addToCart(product)
                      }}
                    >
                      Añadir a cotización
                    </button>
                    <button
                      type="button"
                      className="ghost"
                      onClick={(event) => {
                        event.stopPropagation()
                        onSelectProduct(product)
                      }}
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductDetail({ product, onClose, addToCart }) {
  const [activeImage, setActiveImage] = useState(product.gallery?.[0] ?? product.image)

  const images = useMemo(() => {
    const allImages = [product.image, ...(product.gallery ?? [])]
    return Array.from(new Set(allImages.filter(Boolean)))
  }, [product])

  useEffect(() => {
    setActiveImage(product.gallery?.[0] ?? product.image)
  }, [product])

  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden')
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [])

  return (
    <div
      className="product-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-detail-${product.id}`}
    >
      <button type="button" className="product-detail-backdrop" onClick={onClose} aria-label="Cerrar" />
      <div className="product-detail-dialog">
        <header className="product-detail-header">
          <span className="detail-brand">{product.brand}</span>
          <h2 id={`product-detail-${product.id}`}>{product.name}</h2>
          <div className="detail-meta">
            <span>SKU: {product.sku}</span>
            <span>{product.category}</span>
          </div>
          <button type="button" className="detail-close" onClick={onClose}>
            Cerrar
          </button>
        </header>

        <div className="product-detail-grid">
          <div className="detail-gallery">
            <figure className="detail-main-image">
              <img src={activeImage} alt={product.name} />
            </figure>
            {images.length > 1 && (
              <ul className="detail-thumbnails">
                {images.map((image) => (
                  <li key={image}>
                    <button
                      type="button"
                      className={image === activeImage ? 'active' : ''}
                      onClick={() => setActiveImage(image)}
                    >
                      <img src={image} alt={`${product.name} referencia`} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="detail-info">
            <p className="detail-description">{product.description}</p>
            <div className="detail-highlights">
              <article>
                <h3>Disponibilidad</h3>
                <p>{product.availability}</p>
              </article>
              <article>
                <h3>Lead time</h3>
                <p>{product.leadTime}</p>
              </article>
            </div>

            {product.features?.length > 0 && (
              <section>
                <h3>Beneficios clave</h3>
                <ul className="detail-feature-list">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </section>
            )}

            {product.specs && (
              <section>
                <h3>Especificaciones técnicas</h3>
                <dl className="detail-specs">
                  {Object.entries(product.specs).map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {product.downloads?.length > 0 && (
              <section>
                <h3>Descargables</h3>
                <ul className="detail-downloads">
                  {product.downloads.map((item) => (
                    <li key={item.url}>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <footer className="detail-footer">
              <div>
                <span className="product-price">${product.price.toFixed(2)}</span>
                <span className="product-unit">/ {product.unit}</span>
              </div>
              <button type="button" onClick={() => addToCart(product)}>
                Agregar a cotización
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
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
            <img
              src="https://losgigantes.sistinfo.com/empresa/imagenes/brand_logo.png"
              alt="Los Gigantes Compañía Ferretera"
            />
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
