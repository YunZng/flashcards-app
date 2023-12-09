import Header from "./header";
import Decks from "./decks/decks";
import { useStore } from "@/lib/store";

const Feed = () => {
  const user = useStore((state) => state.user);
  const empty = (
    <div className="shadow-inner h-full flex items-center justify-center text-slate-300	text-xl">
      Please login to view your cards or register to use this app.
    </div>
  );
  return (
    <div className="flex flex-col w-full min-h-screen md:max-w-xl">
      <Header />
      {user ? <Decks /> : empty}
    </div>
  );
};

export default Feed;
