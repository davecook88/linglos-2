import {
  SET_CURRENT_DATE,
} from '../actions/types';


const initialState = {
  date:new Date(),
};

export default function(state = initialState, action){
  switch (action.type){
      case SET_CURRENT_DATE:
          return {
              ...state,
              date:action.payload
          };
      default:
          return state;
  }
}