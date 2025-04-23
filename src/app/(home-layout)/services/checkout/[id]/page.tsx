import CheckoutPage from "@/components/ui/checkout/Checkout";

const Checkout = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    return (
        <div className="min-h-screen w-full">
            <CheckoutPage id={id} />
        </div>
    );
};

export default Checkout;
