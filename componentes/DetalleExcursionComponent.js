import { Component } from 'react';
import { ImageBackground, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, IconButton, Modal, Portal, TextInput, Button } from 'react-native-paper';
import { getImageUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';



function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: getImageUrl(excursion.imagen) }}
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
          <IconButton
            size={28}
            onPress={props.onOpenComment}
            icon="pencil"
            color="chocolate"
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


  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }
  constructor(props) {
    super(props);
    this.state = {
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  resetForm = () => {
    this.setState({
      valoracion: 3,
      autor: '',
      comentario: '',
      showModal: false,
    });
  };

  handleCancel = () => {
    this.resetForm();
  };

  gestionarComentario = () => {
    const { excursionId } = this.props.route.params;
    const { valoracion, autor, comentario } = this.state;

    this.props.postComentario(+excursionId, valoracion, autor, comentario);
    this.resetForm();
  };

  render() {
    const { excursionId } = this.props.route.params;
    const excursiones = this.props.excursiones?.excursiones ?? [];
    const comentarios = this.props.comentarios?.comentarios ?? [];
    const idExcursion = +excursionId;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={excursiones[idExcursion]}
          favorita={this.props.favoritos.some((el) => el === idExcursion)}
          onPress={() => this.marcarFavorito(idExcursion)}
          onOpenComment={this.toggleModal}
        />
        <RenderComentario
          comentarios={comentarios.filter(
            (comentario) => comentario.excursionId === idExcursion
          )}
        />

        <Portal>
          <Modal visible={this.state.showModal} onDismiss={this.handleCancel} contentContainerStyle={styles.modalContainer}>
            <View>
              <Text style={{ textAlign: 'center', marginBottom: 8 }}>Valora la excursión</Text>
              <View style={styles.starsRow}>
                {[1,2,3,4,5].map((n) => (
                  <IconButton
                    key={n}
                    icon={n <= this.state.valoracion ? 'star' : 'star-outline'}
                    size={28}
                    color="gold"
                    onPress={() => this.setState({ valoracion: n })}
                    style={styles.starButton}
                  />
                ))}
              </View>

              <TextInput
                label="Nombre"
                value={this.state.autor}
                onChangeText={(text) => this.setState({ autor: text })}
                left={<TextInput.Icon name="account" />}
                style={{ marginTop: 12 }}
              />

              <TextInput
                label="Comentario"
                value={this.state.comentario}
                onChangeText={(text) => this.setState({ comentario: text })}
                left={<TextInput.Icon name="comment" />}
                multiline
                numberOfLines={4}
                style={{ marginTop: 12 }}
              />

              <View style={styles.modalButtons}>
                <Button mode="outlined" onPress={this.handleCancel} style={styles.modalButton}>Cancelar</Button>
                <Button mode="contained" onPress={this.gestionarComentario} style={styles.modalButton}>Confirmar</Button>
              </View>
            </View>
          </Modal>
        </Portal>

      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos.favoritos ?? [],
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

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
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 6,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    paddingHorizontal: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 6,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);