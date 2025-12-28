import { Metadata } from "next";
import CheckoutClient from "../../app/checkout/client";

export const metadata: Metadata = {
  title: "Checkout | Gourmet",
  description: "Complete your order",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}