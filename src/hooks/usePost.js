import { useReducer } from 'react';

const INITIAL_STATE = {
  loading: false,
  errorState: { err: '', message: '' },
  data: '',
};

function postReducer(state, { type, payload }) {
  switch (type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        errorState: payload,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
}

export function usePost() {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  async function executePostFnc(postFnc, request) {
    dispatch({ type: 'SET_LOADING', payload: true });

    const response = await postFnc(request);
    if (!response.ok) {
      dispatch({ type: 'SET_ERROR', payload: response });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    dispatch({ type: 'SET_DATA', payload: response });
    dispatch({ type: 'SET_LOADING', payload: false });
  }
  return {
    state,
    executePostFnc,
  };
}
