import Navbar from "@/app/components/Navbar";
import CartSideBar from "@/app/components/Cart/CartSidebar";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <CartSideBar />
            <main className="pt-15">
                {children}
            </main>
        </>
    );
}