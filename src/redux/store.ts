// src/redux/store.ts
import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './features/authSlice';
import cartReducer from './features/cartSlice';

// Define the root state interface
interface RootState {
  auth: ReturnType<typeof authReducer>;
  cart: ReturnType<typeof cartReducer>;
}

// Create a custom error handling middleware
const errorMiddleware: Middleware = () => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error('Caught an error in Redux middleware:', error);
    // You could dispatch an error action here if needed
    return next(action);
  }
};

// Configure persistence with proper typing
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'cart'], // Persist both auth and cart
  blacklist: [], // Don't persist these reducers
};

// Combine reducers with proper typing
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// Create persisted reducer with error handling
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with proper error handling
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // Add custom error handling middleware
    }).concat(errorMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor with error handling
export const persistor = persistStore(store, null, () => {
  // Handle any initialization errors here
  console.log('Rehydration completed');
});

// Export typed versions of hooks
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Add error boundary
export function handleStoreError(error: Error): void {
  console.error('Redux Store Error:', error);
  // You could implement additional error handling here
}

// Export RootState type
export type { RootState };