// Import reducers
import authReducer from "./authSlice";

const {
  configureStore
} = require("@reduxjs/toolkit");

// root reducer
const rootReducer = {
  auth: authReducer,
};

// app store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_DEV_TOOLS == 1 ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
