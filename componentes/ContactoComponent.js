import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { CONTACTO } from '../comun/contacto';


function ContactInfo() {
    const item = CONTACTO[0];

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title={item.nombre} style={styles.cardTitle} />
                <Divider />
                <Card.Content>
                    <Text style={styles.descripcion}>Kaixo Mendizale!</Text>

                    <Text>
                        Si quieres participar en las salidas de montaña que organizamos o
                        quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a
                        través de diferentes medios. Puedes llamarnos por teléfono los jueves
                        de las semanas que hay salida (de 20:00 a 21:00). También puedes
                        ponerte en contacto con nosotros escribiendo un correo electrónico, o
                        utilizando la aplicación de esta página web. Y además puedes
                        seguirnos en Facebook.
                    </Text>

                    <Text style={styles.descripcion}>Tel: {item.tel}</Text>
                    <Text style={styles.descripcion}>Email: {item.email}</Text>
                </Card.Content>
            </Card>

        </View>
    );
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
        justifyContent: 'flex-start',
    },
});

export default ContactInfo;