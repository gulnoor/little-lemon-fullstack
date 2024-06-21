import Cart from "../ui/Cart";
import StripeForm from "../ui/Stripe";

const Checkout = () => {
  return (
    <section className="flex py-0 px-0">
      <Cart
        tailwindcss={
          "flex flex-col md:flex-row justify-between w-full h-[80vh]"
        }
      />
    </section>
  );
};

export default Checkout;
