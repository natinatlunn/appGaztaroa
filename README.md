## Ejercicio 1

En este ejercicio he aprendido a configurar el entorno de trabajo y a unir la app Expo Go del teléfono con el proyecto en Visual Studio.

El tiempo que le he dedicado ha sido de 1h.

## Ejercicio 2

En este ejercicio se crea un componente principal que es CampobaseComponent.js en el que se guarda la lista de las excursiones, muestra otro componente (CalendarioComponent.js) y le pasa como propiedad las excursiones.
En el calendario se recibe el array de excursiones y con Flatlist se muestra la lista.

El tiempo dedicado es de 1h

## Ejercicio 3

En el componente DetalleExcursionComponent.js se muestra la información de una excursión en la pantalla mediante una tarjeta (Card) con título, imagen y descripción.
Para esto se utiliza un componente llamado RenderExcursion, que se encarga de recibir los datos y dibujarlos en la interfaz, mientras que estos datos se pasan entre componentes para organizar mejor la información.
Con los cambios añadidos a Campobase lo que se hace es gestionar el estado de la excursión seleccionada y renderizar su detalle usando un filtro, integrando ambos componentes dentro de un View.

Tiempo del ejercicio 1h.

## Ejercicio 4

Para crear un menú de navegación en stack en React Native se utiliza el componente createNativeStackNavigator, que permite definir distintas screens y navegar entre ellas. Este navegador se usa con NavigationContainer, por que es el componente encargado de gestionar todo el estado de la navegación de la aplicación, actuando como el contenedor principal donde se controla qué pantalla se muestra en cada momento. Además, las screens representan cada una de las pantallas de la app y se definen dentro del Stack.Navigator, indicando su nombre y el componente que se renderiza.

En cuanto al paso de parámetros entre pantallas, el componente Calendario utiliza la función navigate para ir a la pantalla de detalle enviando información adicional. Cuando se pulsa sobre un elemento, se ejecuta navigate('DetalleExcursion', { excursionId: item.id }), lo que envía el identificador de la excursión dentro de route.params. Después, en el componente DetalleExcursion, se accede a este parámetro mediante this.props.route.params, extrayendo excursionId. Con este valor, la pantalla puede localizar la excursión correspondiente dentro del array y mostrar sus datos. Así, cada Screen recibe automáticamente la propiedad route, permitiendo acceder a los parámetros enviados durante la navegación.

El tiempo del ejercicio = 1h30m

## Ejercicio 5

Dentro del NavigationContainer solo puede haber un único árbol de navegación. Por eso, cuando se necesita usar varios tipos de navegadores a la vez (como un Stack y un Drawer), lo que se hace es anidarlos. Para solucionar esto, se crean varios Stack.Navigator independientes y luego se meten dentro de un Drawer.Navigator. Así, el Drawer funciona como la navegación principal de la app y cada opción del menú carga su propio stack interno. Con esto se consigue que la aplicación esté mejor organizada y que cada sección tenga su propia navegación por separado.

Además, se añade un stack navigator específico para el componente Home. De esta forma, la pantalla de inicio ya tiene su propia cabecera y es mucho más fácil ampliarla en el futuro con más pantallas si hace falta. Por otro lado, en el Drawer.Navigator se configura la opción headerShown: false para que el drawer no genere una cabecera extra. Esto es importante porque lo que queremos es que se vea la cabecera de cada Stack interno, que ya tiene sus propios estilos. 

Tiempo del ejercicio = 2h

## Ejercicio 6

Se han desarrollado e integrado los componentes Contacto y Quiénes somos, completando la estructura de secciones de la aplicación. Para la pantalla de contacto, se ha utilizado un componente funcional que renderiza una Card de React Native Paper con la información de contacto y un Divider para separar el título del cuerpo de texto. En el caso de "Quiénes somos", se ha implementado un componente de clase que combina un componente funcional llamado Historia para el bloque superior y una FlatList para mostrar dinámicamente el listado de actividades y recursos, importando los datos desde el archivo actividades.js.

En el apartado de navegación, se ha actualizado el Drawer.Navigator en CampobaseComponent.js para incluir estas nuevas secciones, que cada una envuelta en su propio Stack.Navigator. Además, se ha modificado la estética de los componentes Home y DetalleExcursion sustituyendo las cabeceras estándar de las Card por un contenedor.

Tiempo del ejercicio = 2h

## Ejercicio 7

Se ha ampliado el componente DetalleExcursion mediante la creación de un nuevo componente funcional llamado renderComentario. Este componente extrae la información del archivo comentarios.js y renderiza una Card que incluye el texto del comentario, la valoración en estrellas, el autor y la fecha formateada . La lógica de visualización se basa en el filtrado de los comentarios mediante el excursionId, garantizando que solo se muestren los datos pertinentes a la excursión seleccionada. Para la interacción del usuario, se ha integrado el componente IconButton de la librería React Native Paper. Esta funcionalidad permite marcar una excursión como "favorita", alterando el estado de la aplicación mediante un array favoritos[] que se actualiza con concat. El icono cambia dinámicamente entre heart y heart-outline según el estado del elemento, empleando el método some para verificar si el ID de la excursión ya existe en el listado de favoritos.

También se ha customizado el Drawer Menu para mejorar visualmente la aplicación. Esto incluye la creación de un componente CustomDrawerContent que integra el logotipo del club y el nombre "Gaztaroa" en la parte superior del menú lateral . Además, se han añadido iconos de MaterialCommunityIcons a cada opción del menú (home, information, calendar, card-account-phone). Sobre la estructura de navegación, se ha definido un componente BotonMenu que mediante DrawerActions.toggleDrawer(), permite desplegar el menú desde un botón en la cabecera . Esta configuración se ha aplicado mediante la función auxiliar menuHeaderOptions, utilizando la propiedad headerLeft en los stacks de navegación.

Tiempo del ejercicio= 2h

## Ejercicio 8

Se ha instalado json-server@0.17.4 para tener un servidor API local que simula el backend. Para esto, se ha creado una carpeta json-server con el fichero db.json (que contiene toda la data que antes estaba en archivos .js) y se han movido las imágenes a una carpeta public/ para que el servidor las sirva de forma estática.

Para mantener el orden, se han hecho estos cambios clave: 
Configuración centralizada, se ha creado comun/comun.js para definir ahí la baseUrl del servidor y los colores de la app, así no hay que estar cambiando la IP o los colores en cada archivo.
Carga de imágenes: Se ha dejado de usar require() y ahora las imágenes se obtienen mediante uri usando la baseUrl del servidor.
Ajustes visuales: Se ha cambiado el color de los títulos a blanco en la vista de detalle para que contrasten mejor sobre las imágenes de fondo.

Tiempo del ejercicio = 1h30m