import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Deck } from "@/lib/types";
import { useStore } from "@/lib/store";
import { useToast } from "../ui/use-toast";
import useMutationDecks from "@/hooks/use-mutation-decks";

const EditDeckDialog = ({ id }: { id: string }) => {
  const deck: Deck = useStore((state) =>
    state.decks.find((deck) => deck.id === id),
  )!;

  const { editADeck } = useMutationDecks();
  const { toast } = useToast();

  const handlesubmit: () => void = (): void => {
    const title: string = (document.getElementById("title") as HTMLInputElement)
      .value;
    if (!title.trim()) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Cannot add a deck with no title.",
        variant: "destructive",
      });
    } else {
      editADeck(title, id);
    }
    document.getElementById("cancel")?.click();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Deck</DialogTitle>
        <DialogDescription>Edit the title of your deck here.</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          className="col-span-3"
          placeholder="Enter your title here."
          defaultValue={deck.title}
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button id="cancel" type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" onClick={handlesubmit}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
export default EditDeckDialog;
