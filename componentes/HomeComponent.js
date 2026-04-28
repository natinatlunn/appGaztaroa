import { Component } from 'react';
import { ImageBackground, ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { getImageUrl } from '../comun/comun';
import { connect } from 'react-redux';
import IndicadorActividad from './IndicadorActividadComponent';

function RenderItem(props) {

  if (props.isLoading) {
    return (
      <IndicadorActividad />
    );
  }

  else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }

  const item = props.item;

  if (item!=null) {
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
  else{
    return (<View></View>);
  }

 
}

class Home extends Component {
  render() {
    const cabeceras = this.props.cabeceras?.cabeceras ?? [];
    const excursiones = this.props.excursiones?.excursiones ?? [];
    const actividades = this.props.actividades?.actividades ?? [];

    return (
      <ScrollView>
        <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />
        <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />
        <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]}
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />
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