import Cart from "../ui/Cart";
import StripeForm from "../ui/Stripe";

const Checkout = () => {
  return (
    <section className="flex">
      <Cart tailwindcss={"flex w-full md:w-1/2"} />
    </section>
  );
};

export default Checkout;
