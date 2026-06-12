import CartModal from "@/components/Cart/CartModal";
import Products from "@/components/Products";

export default function Home() {
  return (
    <>
      <CartModal />
      <div>
        <h1>Welcome to Sentinel Gear</h1>
      </div>
      <div>
        <Products />
      </div>
    </>

  );
}
