import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  users: {},
  modalActive: false,
  user: {
    key: null,
    id: new Date().getTime(),
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    status: 0, // publish
    created_at: new Date().getTime(),
    deleted_at: null, // soft delete
  },
};

export default function reducer( state = initState, { type, payload, newRecord }) {
  switch (type) {
    case actions.LOAD_FROM_FIRESTORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
    };
    case actions.LOAD_FROM_FIRESTORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: false,
        users: payload.data,
    };
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        user: payload.data == null ? initState.user : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
    
      return {
        ...state,
        user: payload.data,
      };
    default:
      return state;
  }
}
