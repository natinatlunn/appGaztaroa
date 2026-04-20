import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Card, Text, Divider, List } from 'react-native-paper';
import { Component } from 'react';
import { ACTIVIDADES } from '../comun/actividades';
import { getImageUrl } from '../comun/comun';



function Historia() {
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Un poquito de historia" style={styles.cardTitle} />
                <Divider />
                <Card.Content>
                    <Text style={styles.descripcion}>
                        El nacimiento del club de montaña Gaztaroa se remonta a la
                        primavera de 1976 cuando jóvenes aficionados a la montaña y
                        pertenecientes a un club juvenil decidieron crear la sección
                        montañera de dicho club. Fueron unos comienzos duros debido sobre
                        todo a la situación política de entonces. Gracias al esfuerzo
                        económico de sus socios y socias se logró alquilar una bajera.
                        Gaztaroa ya tenía su sede social.
                        Desde aquí queremos hacer llegar nuestro agradecimiento a todos
                        los montañeros y montañeras que alguna vez habéis pasado por el
                        club aportando vuestro granito de arena.
                        Gracias!
                    </Text>
                </Card.Content>
            </Card>
        </View>
    );
}

class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES,
        };
    }

    render() {
        const renderActividadItem = (item) => {
            return (
                <List.Item
                    key={item.id.toString()}
                    title={item.nombre}
                    description={item.descripcion}
                    left={(props) => (
                        <Image
                            source={{ uri: getImageUrl(item.imagen) }}
                            style={{ width: 40, height: 40 }}
                        />
                    )}
                />
            );
        };

    return(
        <ScrollView>
            <Historia /> 
            
            <Card style={{ margin: 10 }}>
                <Card.Title title='"Actividades y recursos"' />
            
                <Divider />

                {this.state.actividades.map(renderActividadItem)}
            </Card>
        </ScrollView>
    );


    }

}


const styles = StyleSheet.create({
    card: {
        margin: 8,
    },
    image: {
        marginHorizontal: 0,
    },
    descripcion: {
        marginTop: 20,
        marginBottom: 20,
    },
    titulo: {
        textAlign: 'center',
    },
    cardTitle: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default QuienesSomos;
