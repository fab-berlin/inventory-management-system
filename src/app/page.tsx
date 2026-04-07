import InventoryItem from "@/03_components/InventoryItem/InventoryItem";

export default function Home() {
  return (
    <div className="container mx-auto max-w-full md:max-w-2/3 pt-8">
      <h1 className="text-3xl font-bold mb-4">Dies ist ein test</h1>
      <InventoryItem />
    </div>
  );
}
