import Constants from 'expo-constants';

const hostUri = String(Constants.expoConfig?.hostUri || '');
const ipMatch = hostUri.match(/(\d{1,3}(?:\.\d{1,3}){3})/);
const hostFromExpo = ipMatch ? ipMatch[1] : '192.168.1.14';

export const baseUrl = `http://${hostFromExpo}:3002/`;
export const getImageUrl = (rutaImagen) => encodeURI(baseUrl + rutaImagen);
export const colorGaztaroaOscuro = '#015afc'; 
export const colorGaztaroaClaro = '#c2d3da'; 