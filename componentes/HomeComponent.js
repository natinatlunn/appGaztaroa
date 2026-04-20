import { Component } from 'react';
import { ImageBackground, ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { getImageUrl } from '../comun/comun';

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: getImageUrl(item.imagen) }}
        style={styles.image}
        imageStyle={styles.imageContent}
      >
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>{item.nombre}</Text>
        </View>
      </ImageBackground>
      <Card.Content>
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>
      </Card.Content>
    </Card>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      cabeceras: CABECERAS,
      actividades: ACTIVIDADES,
    };
  }

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.state.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    height: 180,
    justifyContent: 'flex-end',
  },
  imageContent: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tituloContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    textAlign: 'center',
    color: 'chocolate',
  },
});

export default Home;