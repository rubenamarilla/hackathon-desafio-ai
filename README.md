# Desafío Hackathon: Explorador de Lugares con Chatbot

## Introducción:

Tu desafío es crear un chat bot integrado a un mapa que permita a los usuarios
buscar y visualizar lugares turísticos los cuales se deberán visualizar en el mapa.
Utilizarás la API de OpenAI para obtener información sobre estos lugares y se te proporcionará código
para mostrar los resultados en el mapa con marcadores pintados. 
Además, debes implementar un modal que muestre la información de cada lugar en forma de tarjetas.

## Requerimientos funcionales:

### Chatbot Integrado con Mapa:
* El usuario debe poder hacer consultas a un chatbot sobre lugares turísticos o de gastronomía.
* El chatbot debe utilizar la API de OpenAI para obtener la información solicitada.
* Las respuestas deben estar en un formato JSON compatible con la librería vis.gl/react-google-maps.

### Listado de Tarjetas en Modal:
El usuario debe desarrollar un modal que contenga un listado en forma de tarjetas con la información
sobre los lugares devueltos por el chatbot.

### Visualización de Marcadores:
Los usuarios deben poder visualizar los puntos actualizados en el mapa con marcadores pintados 
según el tipo de lugar (turístico o gastronómico). **Esta parte del código será proporcionada. Ver
[Base de Código](#Base-de-Código)**

## Base de Código:
Se proporciona un proyecto React con una base de código que contiene componentes REACT con lógica del mapa 
y los marcadores, además de las librerías necesarias para su funcionamiento.

También proveeremos los API Keys para Google Maps y OpenAI a través de un archivo **.env**.

## Instrucciones de Instalación y Ejecución:

A continuación, una guía de cómo instalar las librerías con npm y cómo ejecutar el proyecto.

### Repositorio:
```
git clone https://github.com/programandopy/desafioIA.git
cd desafioIA
```

### Configuración del archivo .env:
Crea un archivo **.env** en la raíz del proyecto con las siguientes variables:
```
VITE_GOOGLE_MAPS_API_KEY=google_maps_api_key
VITE_OPENAI_API_KEY=openai_api_key
```

Para acceder a las variables dentro del código puedes utilizar la siguiente sintaxis:
```
import.meta.env.VITE_OPENAI_API_KEY
```
Un ejemplo de esto lo puedes encontrar en el archivo [Map.jsx](src%2Fcomponents%2FMap.jsx)

### Instalación de las dependencias:
Instala las dependencias con el siguiente comando:
```
npm install
```

### Ejecución del proyecto:
Puedes ejecutar el proyecto con el siguiente comando:
```
npm run dev
```
Al ejecutar se despliega una página el mapa inicial.

## Instrucciones detalladas y TIPS:

### Configuración Inicial:
Clona el repositorio y configura tu entorno de desarrollo siguiendo la guía de instalación y ejecución 
proporcionada. 
> #### El desafío debe ser resuelto sin instalación de librerías adicionales.

### Estilos CSS:

Los estilos css se manejan utilizando [Tailwind CSS](https://tailwindcss.com). Las librerías necesarias ya están agregadas al proyecto base.

La documentación se provee en la sección de [Recursos](#Recursos).

### Librería de componentes:
El proyecto base provee una librería de componentes REACT que puede ser utilizada por los participantes.
La misma se denomina [headlessui](https://headlessui.com) y ofrece componentes pre-construidos que recomendamos utilizar 
como botones, inputs, modales, entre otros.

Esta librería no contiene estilos, por lo tanto, se debe estilizar utilizando Tailwind CSS o estilos CSS.

La documentación se provee en la sección de [Recursos](#Recursos).

### Llamadas HTTP:
Para realizar llamadas HTTP dejamos pre-instalada la librería **axios** pero puedes utilizar
**fetch** si lo deseas.


### Integración del Chatbot:
El chatbot debe consistir en algún componente que proveas un input donde los usuarios puedan ingresar sus consultas y
un botón para envíar la consulta a la API de OpenAI.

Utiliza la API de OpenAI para procesar las consultas y devolver información en el siguiente formato JSON compatible 
con la librería de mapas utilizada:
```
[
    {
        "key": "Nombre del lugar",
        "type": "turístico" | "comida",
        "location": { "lat": xx.xxxxx, "lng": xx.xxxxx }
        "description": "Una descripción con un texto devuelto por 
        el chat-bot explicando por qué el lugar fué incluido en la lista",
        "address": "Dirección del lugar"
    },
    ...
]
```

Para este desafío harás las consultas a la api de OpenAI desde un Browser, lo cual no es recomendado en
entornos de producción. Por tanto, debes agregar un parámetro especial a la configuración de OpenAI:
```
const configuration = {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
};
```

Para procesar las consultas puedes utilizar cualquiera de los siguientes modelos de OpenAI:

* [gpt-3-5-turbo](https://platform.openai.com/docs/models/gpt-3-5-turbo)
* [gpt-4o](https://platform.openai.com/docs/models/gpt-4o)

La documentación de la API se provee en la sección de [Recursos](#Recursos).

### Integración con el Mapa:
Se provee un componente con la lógica del mapa en el archivo [Map.jsx](src%2Fcomponents%2FMap.jsx)

El mismo posee un **prop** denominado **locations** que puede recibir una lista que debe ser generada procesando
la respuesta JSON devuelta por el chat-bot.

### Modal y Tarjetas:
Crea un modal que se active al hacer clic en un botón de la interfaz.
Dentro del modal, muestra un listado de tarjetas con la información de los lugares devueltos por el chatbot.
Cada tarjeta debe contener al menos los siguientes datos: 
* **nombre**,
* **tipo**
* **descripción**
* **dirección**,

### UI/UX

Se provee una pequeña ayuda con un componente pre-construido denominado [Loader](src%2Fcomponents%2FLoader.jsx) 
que muestra un modal con indicador de carga. El mismo puede ser utilizado a gusto por los participantes para cuestiones 
de usabilidad. Queda a criterio del participante la decisión de utilizarlo y de cómo utilizarlo.

Se provee además un componente denominado [Card](src%2Fcomponents%2FCard.jsx) que se puede utilizar para las tarjetas 
de información. El mismo tiene los props **nombre, tipo, direccion y descripcion**. Como utilizarlo en una lista
queda a la creatividad del participante.

## Flujo de trabajo
Para trabajar con tus cambios crea una **rama local** a partir de la rama **develop** con la siguiente nomenclatura y formato: 

`feature/nombre-equipo`

Para subir tus cambios crea un **Pull Request** con tus cambios a la rama **develop**, de forma que los supervisores
puedan revisarlo.


## Criterios de Evaluación:

* **Funcionalidad**: La aplicación debe cumplir con todos los requerimientos especificados.
* **Interfaz de Usuario (UI/UX)**: La interfaz debe ser intuitiva(usabilidad) y atractiva.
* **Creatividad**: Soluciones creativas y únicas serán valoradas.
* **Calidad del Código:** Buena estructura, legibilidad y uso adecuado de las mejores prácticas de desarrollo.
* **Utilización de React:** Utilización de hooks y componentes.
* **Utilización de GIT:** Creación de ramas y generación de Pull Request.

## TIPS

>El diseño de los prompts es fundamental para obtener los resultados deseados del chat-bot. Ten presente esto durante 
>el desarrollo del desafío.

>Organiza el trabajo en el grupo, asignando tareas específicas para cada integrante. También recuerda que 
> DOS cabezas piensan mejor que UNA :)

>Utiliza los buscadores de las documentaciones con palabras claves de acuerdo a lo que necesites.

>Divide y vencerás. Piensa de forma modular. Crea componentes específicos para cosas específicas.


# Recursos:

### OpenAI
* [API de OpenAI](https://platform.openai.com/docs/overview)

### React
* [Documentación de REACT](https://react.dev/reference/react)

### Tailwind CSS
* [Documentación de tailwind CSS](https://tailwindcss.com/docs)

### Headless UI
* [Documentación de Headless UI](https://headlessui.com)

### GITHUB
* [Documentación de GITHUB](https://docs.github.com/en)

## ¡Buena suerte y disfruta del desafío! :sunglasses: