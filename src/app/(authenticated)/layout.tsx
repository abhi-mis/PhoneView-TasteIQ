"use client";
import Navbar from "@/components/header/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { ScrollText, ShoppingBag, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (pathname === "/home") {
      router.push("/cart");
    } else if (pathname === "/cart") {
      router.push("/checkout");
    } else if (pathname === "/orders") {
      router.push("/home");
    }
  };

  const Buttons = [
    {
      name: "Home",
      link: "/home",
      icon: ScrollText,
    },
    {
      name: "Cart",
      link: "/cart",
      icon: ShoppingBag,
    },
    {
      name: "Orders",
      link: "/orders",
      icon: ListOrdered,
    },
  ];

  return (
    <div className="w-screen relative h-screen overflow-hidden flex flex-col items-center bg-secondary">
      <Navbar />
      <div className="w-full flex flex-1 h-full overflow-auto">{children}</div>
      <div className="fixed bottom-4 flex-col flex gap-4">
        {!(pathname === "/checkout") && (
          <div
            className={
              pathname === "/orders"
                ? "rounded-full p-[5px] flex bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-gradient-xy"
                : ""
            }
          >
            <Button
              className={
                pathname === "/orders"
                  ? "w-full rounded-3xl py-6 px-2 flex justify-evenly gap-3 shadow-lg"
                  : "w-full bg-green-500 hover:bg-green-800 rounded-3xl py-6 px-2 flex justify-evenly gap-3 shadow-lg"
              }
              onClick={handleClick}
            >
              {pathname === "/home" && (
                <div className="rounded-full bg-foreground px-4 py-2">1</div>
              )}
              {pathname === "/home"
                ? "View Cart >>"
                : pathname === "/orders"
                ? "Order more >"
                : "Checkout >"}
            </Button>
          </div>
        )}
        <div className="bg-foreground rounded-3xl py-2 px-2 flex justify-evenly gap-3 shadow-lg">
          {Buttons.map((button) => {
            const Icon = button.icon;
            const isActive = pathname === button.link;
            return (
              <Button
                key={button.name}
                size="icon"
                onClick={() => router.push(button.link)}
                variant={isActive ? "outline" : "default"}
                className={`rounded-full transition-colors duration-200 ${
                  isActive ? "bg-background" : "bg-foreground"
                }`}
              >
                <Icon
                  size={24}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-background"
                  }`}
                />
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
