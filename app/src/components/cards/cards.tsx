import useQueryCards from "@/hooks/use-query-cards";
import Card from "./card";
import { useStore } from "@/lib/store";
import Header from "../header";

const Cards = () => {
  const user = useStore((state) => state.user);
  const { cards } = useQueryCards();
  const empty = (
    <div className="shadow-inner h-full flex items-center justify-center text-slate-300	text-xl">
      Please login to view your cards or register to use this app.
    </div>
  );
  return (
    <div className="flex flex-col w-full min-h-screen md:max-w-xl">
      <Header />
      {user ?
        <div className="relative pt-12 shadow-inner h-full overflow-auto snap-y snap-proximity">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </div>
        :
        empty}
    </div>
  );

};

export default Cards;
