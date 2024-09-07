export const readLocalCart = () => {
  let localCart = [];
  if (typeof window !== undefined) {
    try {
      localCart = JSON.parse(window.localStorage.getItem("cart"));

      return localCart === null ? [] : localCart;
    } catch (e) {
      console.log("couldn't parse local cart");
    }
  }
  return localCart;
};

export function readLocal() {
  let localCart = [];
  if (typeof window !== undefined) {
    localCart = window.localStorage.getItem("cart");
    if (localCart === null) {
      window.localStorage.setItem("cart", "[]");
      return [];
    }
    try {
      localCart = JSON.parse(localCart);
      if (!Array.isArray(localCart)) {
        console.error("local cart is not in the correct format");
        window.localStorage.setItem("cart", "[]");
        return [];
      }
    } catch (e) {
      console.error("error parsing local cart");
      window.localStorage.setItem("cart", "[]");
      return [];
    }
  }
  return localCart;
}
