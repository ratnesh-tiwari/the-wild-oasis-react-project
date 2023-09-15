import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isLoading } = useCheckout();

  return (
    <Button
      variation="primary"
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
