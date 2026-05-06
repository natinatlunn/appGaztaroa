import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.ADD_COMENTARIO: {
      const newComentario = {
        ...action.payload,
        id: state.comentarios.length > 0
          ? Math.max(...state.comentarios.map((comentario) => comentario.id)) + 1
          : 0,
      };

      return {
        ...state,
        comentarios: state.comentarios.concat(newComentario),
      };
    }

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};