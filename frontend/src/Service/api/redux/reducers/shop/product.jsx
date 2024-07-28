const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT_BY_ID = 'UPDATE_PRODUCT_BY_ID';
const DELETE_PRODUCT_BY_ID = 'DELETE_PRODUCT_BY_ID';

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const updateProductById = (product) => ({
  type: UPDATE_PRODUCT_BY_ID,
  payload: product,
});

export const deleteProductById = (productId) => ({
  type: DELETE_PRODUCT_BY_ID,
  payload: productId,
});

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case UPDATE_PRODUCT_BY_ID:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case DELETE_PRODUCT_BY_ID:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default productReducer;