import {
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditDeckDialog from "./edit-deck-dialog";
import useMutationDecks from "@/hooks/use-mutation-decks";

const DeckActions = ({ id }: { id: string }) => {
  const { deleteDeck } = useMutationDecks();
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus-visible:ring-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute w-8 h-8 top-3 right-3 outline-none"
          >
            <DotsVerticalIcon className="w-full h-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup className="w-32">
            <DialogTrigger asChild>
              <DropdownMenuItem className="flex">
                <Pencil1Icon className="mr-2" />
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              className="flex text-red-500 focus:text-white focus:bg-red-500"
              onClick={() => deleteDeck(id)}
            >
              <TrashIcon className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditDeckDialog id={id} />
    </Dialog>
  );
};
export default DeckActions;
