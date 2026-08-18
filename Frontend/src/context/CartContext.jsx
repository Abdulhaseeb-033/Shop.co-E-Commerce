import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const CART_STORAGE_KEY = "shop_co_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1, color = "", size = "") => {
    if (!product) return;

    const selectedColor = color || (product.colors && product.colors[0]) || "Default";
    const selectedSize = size || (product.sizes && product.sizes[0]) || "Standard";
    const uniqueId = `${product._id || product.id}-${selectedColor}-${selectedSize}`;

    const unitPrice =
      product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === uniqueId);

      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updated = [...prevCart];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + quantity,
        };
        return updated;
      } else {
        // Add new item
        const newItem = {
          id: uniqueId,
          productId: product._id || product.id,
          name: product.name,
          image: product.images?.[0] || product.image?.[0] || "",
          price: product.price,
          discount: product.discount || 0,
          discountedPrice: unitPrice,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
          stock: product.stock || 99,
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Remove single item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Total quantity of items for badge
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Financial calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (item.discount > 0) {
        const itemDiscount = (item.price * item.discount) / 100;
        return acc + itemDiscount * item.quantity;
      }
      return acc;
    }, 0);
  }, [cart]);

  const deliveryFee = useMemo(() => {
    return cart.length > 0 ? 15 : 0;
  }, [cart]);

  const total = useMemo(() => {
    const calculatedTotal = subtotal - discountTotal + deliveryFee;
    return calculatedTotal > 0 ? calculatedTotal : 0;
  }, [subtotal, discountTotal, deliveryFee]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discountTotal,
        deliveryFee,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
