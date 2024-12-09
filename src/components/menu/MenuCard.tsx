// src/components/menu/MenuCard.tsx
import { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types/menu";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    id: number,
    price: number
  ) => void;
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (increment: number) => {
    const newQuantity = Math.max(1, quantity + increment);
    setQuantity(newQuantity);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden bg-amber-100">
        <Image
          src={item.image_url || "/images/coffee-placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-amber-600">
            ৳{parseFloat(item.price).toFixed(2)}
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
            >
              <Minus size={16} className="text-amber-700" />
            </button>

            <span className="w-8 text-center text-black font-medium">
              {quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(1)}
              className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
            >
              <Plus size={16} className="text-amber-700" />
            </button>
          </div>
        </div>

        <button
          onClick={() =>
            onAddToCart(
              item,
              quantity,
              item.id,
              Number(parseFloat(item.price).toFixed(2))
            )
          }
          className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-amber-600 to-amber-700
                     text-white rounded-lg font-medium flex items-center justify-center
                     space-x-2 hover:from-amber-700 hover:to-amber-800 transition-all
                     duration-300 transform hover:-translate-y-0.5"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
