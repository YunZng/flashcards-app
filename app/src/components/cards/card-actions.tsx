import {
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import EditCardDialog from "./edit-card-dialog";
import useMutationCards from "@/hooks/use-mutation-cards";
import { useStore } from "@/lib/store";

const CardActions = ({ id }: { id: string }) => {
  const selectedDeckId = useStore((state) => state.selectedDeckId)!;
  const { deleteCard } = useMutationCards();
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
              onClick={() => deleteCard(selectedDeckId, id)}
            >
              <TrashIcon className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCardDialog id={id} />
    </Dialog>
  );
};
export default CardActions;
