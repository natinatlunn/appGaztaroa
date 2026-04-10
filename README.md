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