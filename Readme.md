# FakeStore API - Gestión de Productos

Aplicación de consola desarrollada con **Node.js** que permite consultar, crear y eliminar productos utilizando la API de [FakeStore API](https://fakestoreapi.com/).

El proyecto recibe los comandos mediante `process.argv` y utiliza `fetch` para realizar las peticiones HTTP.

## Requisitos

- Node.js instalado.
- npm instalado.
- Conexión a Internet para acceder a FakeStore API.

## Instalación

Clonar o descargar el proyecto y acceder al directorio:

```bash
cd nombre-del-proyecto
```

Inicializar npm si todavía no se hizo:

```bash
npm init -y
```

El proyecto utiliza ES Modules, por lo que el archivo `package.json` debe contener:

```json
{
  "type": "module"
}
```

También debe incluir el script de ejecución:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

## Ejecución

El programa se ejecuta mediante:

```bash
npm run start
```

Los argumentos del comando se agregan después del nombre del script.

También puede utilizarse `--` para indicar explícitamente que los siguientes argumentos deben enviarse al programa:

```bash
npm run start -- GET products
```

## Comandos disponibles

### 1. Consultar todos los productos

Obtiene la lista completa de productos disponibles en FakeStore API.

```bash
npm run start GET products
```

También:

```bash
npm run start -- GET products
```

La respuesta se muestra directamente en la consola.

---

### 2. Consultar un producto específico

Permite obtener un producto utilizando su ID.

Sintaxis:

```bash
npm run start GET products/<productId>
```

Ejemplo:

```bash
npm run start GET products/15
```

El ID debe ser un número entero positivo.

---

### 3. Crear un producto

Permite enviar un nuevo producto a la API.

Sintaxis:

```bash
npm run start POST products <title> <price> <category>
```

Ejemplo:

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

Los argumentos corresponden a:

| Argumento | Descripción |
|---|---|
| `title` | Nombre o título del producto |
| `price` | Precio del producto |
| `category` | Categoría del producto |

Por ejemplo:

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

envía a la API los siguientes datos:

```json
{
  "title": "T-Shirt-Rex",
  "price": 300,
  "category": "remeras"
}
```

---

### 4. Eliminar un producto

Permite eliminar un producto utilizando su ID.

Sintaxis:

```bash
npm run start DELETE products/<productId>
```

Ejemplo:

```bash
npm run start DELETE products/7
```

El ID debe ser un número entero positivo.

## Estructura del proyecto

```text
.
├── index.js
├── package.json
└── README.md
```

### `index.js`

Contiene la lógica principal de la aplicación:

- Procesamiento de argumentos mediante `process.argv`.
- Validación de comandos.
- Consulta de productos.
- Creación de productos.
- Eliminación de productos.
- Comunicación con FakeStore API mediante `fetch`.
- Manejo de errores.

### `package.json`

Contiene la configuración de Node.js, incluyendo:

- `"type": "module"` para utilizar ES Modules.
- Script `"start"` para ejecutar la aplicación.

## Tecnologías utilizadas

- **Node.js**
- **JavaScript**
- **npm**
- **Fetch API**
- **FakeStore API**
- **ES Modules**

## Funcionalidades

La aplicación implementa las siguientes operaciones:

```text
GET     /products
GET     /products/:id
POST    /products
DELETE  /products/:id
```

Las respuestas proporcionadas por la API se muestran en la terminal.

## Manejo de errores

El programa valida:

- Comandos incompletos.
- Métodos HTTP no soportados.
- Recursos incorrectos.
- IDs inválidos.
- Argumentos faltantes en `POST`.
- Precios inválidos.
- Respuestas HTTP no exitosas de la API.

Cuando se produce un error, se muestra un mensaje en la consola y el programa finaliza con un código de error.

## Ejemplos rápidos

Consultar todos los productos:

```bash
npm run start GET products
```

Consultar el producto `15`:

```bash
npm run start GET products/15
```

Crear un producto:

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

Eliminar el producto `7`:

```bash
npm run start DELETE products/7
```

## API utilizada

FakeStore API:

https://fakestoreapi.com/

Documentación:

https://fakestoreapi.com/docs
```