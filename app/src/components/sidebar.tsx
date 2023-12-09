import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import AddDeckDialog from "./decks/add-deck-dialog";
import { useStore } from "@/lib/store";
import AddCardDialog from "./cards/add-card-dialog";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button variant={"ghost"} size="sm">
        <Link to="/homework-5-flashcards-app-YunZng/">
          <HomeIcon className="w-5 h-5" />
        </Link>
      </Button>
      <Button variant={"ghost"} size="sm">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>
      {selectedDeckId ?
        <AddCardDialog /> : <AddDeckDialog />
      }
    </div>
  );
};

export default Sidebar;
