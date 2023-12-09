import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import { useStore } from "@/lib/store";
import useMutationCards from "@/hooks/use-mutation-cards";

const AddCardDialog = () => {
  const { addCard } = useMutationCards();
  const user = useStore((state) => state.user);
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const { toast } = useToast();

  const handlesubmit = async () => {
    const front: string = (document.getElementById("front") as HTMLInputElement)
      .value;
    const back: string = (document.getElementById("back") as HTMLInputElement)
      .value;

    if (!front.trim() || !back.trim()) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Cannot add a card with no fron or no back.",
        variant: "destructive",
      });
    } else {
      await addCard(selectedDeckId!, front, back);
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
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            {user ? "Give a front and back to your card here." : "Please log in to create a deck/card."}
          </DialogDescription>
        </DialogHeader>
        {user ? (<>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="front" className="text-right">
              Front
            </Label>
            <Input
              id="front"
              className="col-span-3"
              placeholder="Enter your front here."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="back" className="text-right">
              Back
            </Label>
            <Input
              id="back"
              className="col-span-3"
              placeholder="Enter your back here."
            />
          </div>
        </>
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
export default AddCardDialog;
