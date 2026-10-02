/* =============================================================================
   THE COOKIE BAKEHOUSE — manifest.js
   -----------------------------------------------------------------------------
   AQUÍ EDITAS TODO LO QUE CAMBIA A MENUDO: textos, sabores, número de WhatsApp,
   redes sociales, horarios. Abre este archivo con el Bloc de notas, cambia lo
   que necesites entre comillas "así", guarda, y sube la carpeta de nuevo a
   Hostinger. No toques las comas ni las llaves { } [ ] si no estás seguro.

   Ver README.md para instrucciones paso a paso.
   ============================================================================= */
(function () {
  "use strict";

  window.__BAKEHOUSE__ = {

    brand: {
      name: "The Cookie Bakehouse",
      shortName: "Bakehouse",
      tagline: "Galletas NYC style, gruesas, de borde crujiente y centro fundente.",
      kicker: "Galletería de autor · 100% online",
      established: "DESDE 2024",
      origin: "Hecho a mano · Envíos a toda España",

      // Redes y contacto — edítalo según vuestros canales reales
      instagram: "@thecookiebakehouse",
      instagramUrl: "https://instagram.com/thecookiebakehouse",
      whatsapp: "+34 600 11 22 33",
      whatsappLink: "https://wa.me/34600112233",
      email: "hola@thecookiebakehouse.com",

      // Horario de pedidos / atención (no hay tienda física)
      schedule: "Pedidos online · lunes a sábado",
      shippingNote: "Hacemos hornadas martes y viernes. Pide con 48h de antelación.",

      copyrightYear: "2026"
    },

    // ---------------------------------------------------------------------
    // CARTA DE GALLETAS — 8 sabores NYC style
    // Cada galleta: nombre, subtítulo, descripción, ingredientes (lista),
    // acento de color (paleta otoñal) y "liquid" usado solo de forma
    // decorativa en el SVG (color del relleno/topping ilustrado).
    // ---------------------------------------------------------------------
    cookies: [
      {
        id: "c-01",
        name: "Borgoña Negra",
        series: "Clásica",
        subtitle: "Doble chocolate intenso",
        description: "Masa de cacao oscuro, dos tipos de chocolate troceado a cuchillo y un golpe de sal en escamas. La galleta de la casa: borde crujiente, centro casi sin cuajar.",
        ingredients: ["Chocolate negro 70%", "Chocolate con leche", "Sal en escama", "Mantequilla tostada"],
        accent: "#5C1A2B",
        crumb: "#3A1410"
      },
      {
        id: "c-02",
        name: "Mostaza Tostada",
        series: "Clásica",
        subtitle: "Mantequilla de cacahuete y caramelo",
        description: "Pasta de cacahuete tostado en la propia masa, trozos de caramelo salado y un toque de canela. Densa, untuosa, con ese punto dulce-salado que no cansa.",
        ingredients: ["Mantequilla de cacahuete", "Caramelo salado", "Cacahuete tostado", "Canela"],
        accent: "#B8862E",
        crumb: "#7A4A18"
      },
      {
        id: "c-03",
        name: "Olivo y Pistacho",
        series: "Clásica",
        subtitle: "Pistacho y chocolate blanco",
        description: "Pistacho molido en la masa, trozos enteros por encima y pepitas de chocolate blanco. La más elegante de la carta, pensada para quien no quiere solo cacao.",
        ingredients: ["Pistacho molido", "Pistacho entero", "Chocolate blanco", "Mantequilla"],
        accent: "#5C6B2E",
        crumb: "#7A8C3E"
      },
      {
        id: "c-04",
        name: "Castaño Ahumado",
        series: "Clásica",
        subtitle: "Nueces tostadas y miel oscura",
        description: "Nuez tostada a baja temperatura, miel oscura de montaña y una base de mantequilla avellanada. Sabor de otoño en cada bocado.",
        ingredients: ["Nuez tostada", "Miel oscura", "Mantequilla avellanada", "Vainilla"],
        accent: "#6B4226",
        crumb: "#4A2C18"
      },
      {
        id: "c-05",
        name: "Terracota Especiada",
        series: "Temporada",
        subtitle: "Calabaza, canela y nuez moscada",
        description: "Puré de calabaza asada integrado en la masa, especias cálidas y una costra de azúcar moreno. Edición de temporada, solo mientras dura la cosecha.",
        ingredients: ["Calabaza asada", "Canela", "Nuez moscada", "Azúcar moreno"],
        accent: "#A14E2A",
        crumb: "#7A3618"
      },
      {
        id: "c-06",
        name: "Higo y Cacao",
        series: "Temporada",
        subtitle: "Higos secos y chocolate amargo",
        description: "Higo seco troceado, chocolate 85% en trozos grandes y una pizca de pimienta negra que despierta el dulce. Para los que prefieren el amargo al empalagoso.",
        ingredients: ["Higo seco", "Chocolate 85%", "Pimienta negra", "Mantequilla"],
        accent: "#4A1F3D",
        crumb: "#2E1228"
      },
      {
        id: "c-07",
        name: "Avena y Pasas al Bourbon",
        series: "Temporada",
        subtitle: "Avena gruesa y pasas maceradas",
        description: "Pasas maceradas en un toque de bourbon, copos de avena gruesa y canela. La galleta menos dulce de la carta, con textura masticable de verdad.",
        ingredients: ["Avena gruesa", "Pasas al bourbon", "Canela", "Nuez moscada"],
        accent: "#8C6A1E",
        crumb: "#5C4310"
      },
      {
        id: "c-08",
        name: "Café y Nuez Pecana",
        series: "Temporada",
        subtitle: "Espresso y nuez pecana caramelizada",
        description: "Espresso concentrado en la masa, nuez pecana caramelizada por encima y un velo de chocolate con leche. Para quien quiere postre y café en una sola pieza.",
        ingredients: ["Espresso", "Nuez pecana caramelizada", "Chocolate con leche", "Mantequilla"],
        accent: "#5A3414",
        crumb: "#3A200C"
      }
    ],

    // ---------------------------------------------------------------------
    // CÓMO PEDIR — pasos del proceso (sin carrito de pago, todo por WhatsApp/IG)
    // ---------------------------------------------------------------------
    howToOrder: [
      {
        step: "01",
        title: "Elige tu caja",
        text: "Mira la carta y decide qué sabores quieres. Las cajas son de 6 o 12 unidades, mezclando los sabores que prefieras."
      },
      {
        step: "02",
        title: "Escríbenos",
        text: "Mándanos un WhatsApp o un mensaje por Instagram con la caja que quieres y tu código postal. Te confirmamos disponibilidad y precio en minutos."
      },
      {
        step: "03",
        title: "Hornada fresca",
        text: "Horneamos martes y viernes. Tu caja se hace el mismo día que se envía o se recoge, nunca antes."
      },
      {
        step: "04",
        title: "Recibe o recoge",
        text: "Envío a toda España en caja térmica, o recogida en punto de encuentro a convenir si estás cerca. Te avisamos con el seguimiento."
      }
    ],

    // ---------------------------------------------------------------------
    // SOBRE NOSOTROS
    // ---------------------------------------------------------------------
    about: {
      kicker: "01 · La casa",
      title: "Empezamos horneando para amigos. Ahora horneamos para vosotros.",
      lead: "The Cookie Bakehouse nació en una cocina pequeña, probando masas hasta encontrar la textura exacta: borde que cruje, centro que casi no ha terminado de cuajar. Ese punto intermedio que en Nueva York se da por hecho y que aquí, casi nadie hacía bien.",
      body: "Cada caja se hornea por encargo, nunca de stock. Usamos mantequilla de verdad, chocolate troceado a cuchillo y nada de mezclas premezcladas. Si una hornada no sale como tiene que salir, no sale a la venta — así de simple.",
      facts: [
        { label: "Fundada", value: "2024" },
        { label: "Hornadas", value: "Mar · Vie" },
        { label: "Envíos", value: "Toda España" },
        { label: "Pedido mínimo", value: "Caja de 6" }
      ]
    },

    // ---------------------------------------------------------------------
    // TESTIMONIOS (placeholder editorial — sustituir por reseñas reales)
    // ---------------------------------------------------------------------
    testimonials: [
      {
        quote: "Las pedí para un cumpleaños y desaparecieron en diez minutos. La de mostaza tostada con caramelo es un vicio.",
        name: "Marta R."
      },
      {
        quote: "Llegaron perfectas, con el centro tierno tal y como prometen. Mejor que muchas que he probado en Nueva York.",
        name: "Pol S."
      },
      {
        quote: "Pedimos la caja de 12 para la oficina y ya es ritual de los viernes. La de café y pecana es la favorita de todos.",
        name: "Laia G."
      }
    ]
  };
})();
