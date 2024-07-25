
import shopAuthReducer from "./reducers/auth/shopAuth";
import userAuthReducer from "./reducers/auth/userAuth"
 export default  configureStore({
  reducer: {
    shopAuth:shopAuthReducer,
    userAuth:userAuthReducer,

  },
});
