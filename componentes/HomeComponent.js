import { Component } from 'react';
import { ImageBackground, ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { getImageUrl } from '../comun/comun';
import { connect } from 'react-redux';

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
  render() {
    const cabeceras = this.props.cabeceras?.cabeceras ?? [];
    const excursiones = this.props.excursiones?.excursiones ?? [];
    const actividades = this.props.actividades?.actividades ?? [];

    return (
      <ScrollView>
        <RenderItem item={cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};

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

export default connect(mapStateToProps)(Home);