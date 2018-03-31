const SET_FIELD = 'SET_FIELD';
const RESET_FIELD = 'RESET_FIELD';

const initialState = {
  name: '',
  email: '',
  ticketType: 'standard',
  food: false,
  agree: false,
  countDown: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.key]: action.value,
      };
      break;
    case RESET_FIELD:
      return initialState;
    default:
      return state;
      break;
  }
};

export const setField = (key, value) => ({
  type: SET_FIELD,
  key,
  value,
});

export const resetField = () => ({
  type: RESET_FIELD,
});
