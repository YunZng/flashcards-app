import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Dialog,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { useToast } from "./ui/use-toast";
import { useStore } from "@/lib/store";

const AddDeckDialog = () => {
  const { addDeck } = useMutationDecks();
  const user = useStore((state) => state.user);
  const { toast } = useToast();

  const handlesubmit = async() => {
    const title: string = (document.getElementById("title") as HTMLInputElement)
      .value;
    if (!title.trim()) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Cannot add a deck with no title.",
        variant: "destructive",
      });
    } else {
      await addDeck(title);
    }
    document.getElementById("cancel")?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Deck</DialogTitle>
          <DialogDescription>
            {user ? "Give a name to your deck here." : "Please log in to create a deck/card."}
          </DialogDescription>
        </DialogHeader>
        {user ? (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              placeholder="Enter your title here."
            />
          </div>
        ) : (<></>)
        }
        <DialogFooter>
          <DialogClose asChild>
            <Button id="cancel" type="button" variant="secondary">
              {user ? "Cancel" : "Okay"}
            </Button>
          </DialogClose>
          {user ? (
            <Button type="submit" onClick={handlesubmit}>
              Save
            </Button>
          ) : (<></>)
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddDeckDialog;
