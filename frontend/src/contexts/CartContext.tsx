import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren, type ReactElement } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  stock: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shippingAddress: ShippingAddress | null;
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  saveShippingAddress: (address: ShippingAddress) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_KEY = 'ks_cart_items';
const SHIPPING_KEY = 'ks_shipping_address';

const readLocalStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch (error) {
    return fallback;
  }
};

const persistLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore storage errors
  }
};

export const CartProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [items, setItems] = useState<CartItem[]>(() => readLocalStorage<CartItem[]>(CART_KEY, []));
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(() =>
    readLocalStorage<ShippingAddress | null>(SHIPPING_KEY, null)
  );

  useEffect(() => {
    persistLocalStorage(CART_KEY, items);
  }, [items]);

  useEffect(() => {
    if (shippingAddress) {
      persistLocalStorage(SHIPPING_KEY, shippingAddress);
    }
  }, [shippingAddress]);

  const addToCart = useCallback((newItem: CartItem) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === newItem.productId);

      if (existing) {
        const updatedQty = Math.min(existing.qty + newItem.qty, newItem.stock);
        return prevItems.map((item) =>
          item.productId === newItem.productId ? { ...item, qty: updatedQty, stock: newItem.stock } : item
        );
      }

      return [...prevItems, { ...newItem, qty: Math.min(newItem.qty, newItem.stock) }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, qty: Math.min(Math.max(qty, 1), item.stock) } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    persistLocalStorage(CART_KEY, []);
  }, []);

  const saveShippingAddress = useCallback((address: ShippingAddress) => {
    setShippingAddress(address);
    persistLocalStorage(SHIPPING_KEY, address);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.qty, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      shippingAddress,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      saveShippingAddress,
    }),
    [items, totalItems, subtotal, shippingAddress, addToCart, updateQuantity, removeFromCart, clearCart, saveShippingAddress]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
