import Cart from "@/components/Cart/Cart";
import Products from "@/components/Products";

export default function Home() {
  return (
    <>
      <div>
        <Cart />
      </div>
      <div>
        <h1>Welcome to Sentinel Gear</h1>
      </div>
      <div>
        <Products />
      </div>
    </>

  );
}
