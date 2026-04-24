import InventoryItem from "@/03_components/InventoryItem/InventoryItem";
import Headline from "@/03_components/atoms/Headline";

export default function Home() {
  return (
    <div className="">
      <Headline text={'Inventar'} level={'h1'} />
      <InventoryItem />
    </div>
  );
}
