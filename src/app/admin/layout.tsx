import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DermaScan: Admin Dashboard",
  description: "DermaScan: Admin Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
