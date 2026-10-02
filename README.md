# The Cookie Bakehouse — tu web

¡Hola! Aquí tienes tu web ya montada. Este documento explica, en lenguaje sencillo, cómo verla, subirla a internet y editarla tú mismo sin tocar código.

---

## 1. ¿Cómo veo la web en mi ordenador?

Dentro de esta carpeta tienes un archivo llamado **`index.html`**.

1. Haz doble clic en `index.html`.
2. Se abrirá en tu navegador (Chrome, Edge, Safari…) y verás la web funcionando, con todas las animaciones.

Si alguna vez algo no carga bien al hacer doble clic, no te preocupes — al subirla a Hostinger funcionará perfectamente (algunos navegadores son más estrictos al abrir archivos locales que al verlos ya publicados en internet).

---

## 2. ¿Cómo la subo a Hostinger?

1. Entra en tu panel de Hostinger.
2. Ve a **Archivos → Administrador de archivos** (File Manager).
3. Entra en la carpeta `public_html` (o la carpeta raíz de tu dominio).
4. **Arrastra toda la carpeta** `the-cookie-bakehouse` completa (o todo su contenido: `index.html`, `styles.css`, `main.js`, las carpetas `lib/` y `assets/`, y el archivo `.htaccess`) dentro de `public_html`.
5. Espera a que termine de subir.
6. Abre tu dominio en el navegador — ya está en marcha.

**Importante:** el archivo `.htaccess` es invisible en muchos sistemas (empieza por un punto). Asegúrate de que también se ha subido — si usas el File Manager de Hostinger, activa "mostrar archivos ocultos" si no lo ves en la lista, o simplemente arrastra la carpeta entera, que lo incluirá automáticamente.

---

## 3. ¿Cómo cambio los textos, sabores o el número de WhatsApp?

Todo lo que cambia a menudo está centralizado en un único archivo:

```
lib/manifest.js
```

Ábrelo con el **Bloc de notas** (clic derecho → Abrir con → Bloc de notas, o en Mac con TextEdit en modo texto sin formato). Verás bloques de texto entre comillas, así:

```js
whatsapp: "+34 600 11 22 33",
whatsappLink: "https://wa.me/34600112233",
```

- Para cambiar el **número de WhatsApp**, edita ambas líneas:
  - `whatsapp`: el número con espacios, tal cual se lee.
  - `whatsappLink`: el mismo número sin espacios ni símbolos, después de `wa.me/` (y sin el `+`).
- Para cambiar el **Instagram**, edita `instagram` y `instagramUrl`.
- Para cambiar los **sabores de galletas**, busca el bloque `cookies: [ ... ]`. Cada galleta tiene `name`, `subtitle`, `description` e `ingredients`. Cambia el texto entre comillas, pero **no borres las comas ni las llaves** `{ }`.

Guarda el archivo (Ctrl+S) y vuelve a subirlo a Hostinger sobreescribiendo el anterior.

**Atención:** además del `manifest.js`, el número de WhatsApp también aparece escrito directamente en `index.html` (en el botón del formulario y en el pie de página) como respaldo, por si el archivo de datos no cargara. Si cambias el número, busca también en `index.html` (Ctrl+F → busca `wa.me`) y sustitúyelo ahí para que todo quede coherente.

---

## 4. ¿Cómo sustituyo las ilustraciones por fotos reales?

Esta primera versión de la web usa **ilustraciones dibujadas** (no fotografías) para representar las galletas, en los mismos colores de tu marca. Esto es a propósito: así la web no depende de fotos de stock que no son tuyas.

Cuando tengas fotos reales de tus galletas:

1. Guárdalas en la carpeta `assets/img/` con nombres sencillos, por ejemplo `galleta-borgona-negra.jpg`.
2. Dile a tu diseñador/a (o vuelve a pedírmelo a mí) que sustituya el dibujo SVG de cada tarjeta por un `<img>` apuntando a esa foto. Es un cambio sencillo de código que no deberías hacer tú mismo con el Bloc de notas, para no romper el diseño.

---

## 5. Si algo no se actualiza después de subir cambios

A veces, después de subir un cambio, el navegador sigue mostrando la versión antigua porque la tiene guardada en su memoria caché. Si te pasa:

1. Pulsa **Ctrl + F5** (o **Cmd + Shift + R** en Mac) para forzar una recarga completa.
2. Si sigue sin verse el cambio, abre `index.html` y `styles.css` con el Bloc de notas, busca al final de cada línea algo como `?v=20260628`, y cambia esos 8 números por la fecha de hoy (formato AAAAMMDD). Guarda y vuelve a subir. Esto "engaña" al navegador para que descargue la versión nueva sí o sí.

---

## 6. Resumen de la carpeta

```
the-cookie-bakehouse/
├── index.html          ← la página completa
├── styles.css           ← todos los estilos y colores
├── main.js              ← las animaciones e interacciones
├── lib/
│   ├── manifest.js       ← AQUÍ EDITAS textos, sabores, WhatsApp, Instagram
│   ├── gsap.min.js        ← librería de animación (no tocar)
│   └── ScrollTrigger.min.js ← librería de animación (no tocar)
├── assets/
│   ├── img/               ← carpeta para fotos futuras
│   └── credits.json        ← créditos de imágenes (vacío, no usamos stock)
├── tools/                  ← carpeta de uso interno, puedes ignorarla o borrarla
└── .htaccess               ← configuración técnica para que la web cargue rápido (no tocar)
```

---

Si en algún momento quieres que añada más sabores, cambie colores, o conecte un catálogo más grande, dímelo y lo actualizamos juntos.

¡Que disparéis muchas cajas! 🍪
