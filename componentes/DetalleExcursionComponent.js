import { Component } from 'react';
import { ImageBackground, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';


function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={require('./imagenes/40Años.png')}
          style={styles.image}
          imageStyle={styles.imageContent}
        >
          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>{excursion.nombre}</Text>
          </View>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>
            {excursion.descripcion}
          </Text>
        </Card.Content>
        <View style={styles.iconoContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPress()
            }
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  return (
    <Card style={styles.card}>
      <Card.Title title='Comentarios' />
      <Card.Content>
        {comentarios.map((comentario) => {
          const valoracion = Math.max(0, Math.min(5, comentario.valoracion));
          const estrellas = '★'.repeat(valoracion) + '☆'.repeat(5 - valoracion);
          const fechaNormalizada = new Date(String(comentario.dia).replace(/\s+/g, ''));
          const fechaLegible = Number.isNaN(fechaNormalizada.getTime())
            ? comentario.dia
            : new Intl.DateTimeFormat('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(fechaNormalizada);

          return (
            <View key={comentario.id} style={styles.comentarioItem}>
              <Text>{comentario.comentario}</Text>
              <Text style={styles.estrellas}>{estrellas}</Text>
              <Text style={styles.autorFecha}>{comentario.autor} - {fechaLegible}</Text>
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
}


class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
      favoritos: [],
    };

    this.marcarFavorito = this.marcarFavorito.bind(this);
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.state.excursiones[+excursionId]}
          favorita={this.state.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.state.comentarios.filter(
            (comentario) => comentario.excursionId === +excursionId
          )}
        />
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
  estrellas: {
    marginTop: 8,
  },
  autorFecha: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  comentarioItem: {
    marginBottom: 12,
  },
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default DetalleExcursion;