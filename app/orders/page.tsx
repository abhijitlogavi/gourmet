import { Metadata } from "next";
import OrdersClient from "./client";

export const metadata: Metadata = {
  title: "My Orders | Gourmet",
  description: "View your order history",
};

export default function OrdersPage() {
  return <OrdersClient />;
}