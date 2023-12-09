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
import { Card } from "@/lib/types";
import { useStore } from "@/lib/store";
import { useToast } from "../ui/use-toast";
import useMutationCards from "@/hooks/use-mutation-cards";

const EditCardDialog = ({ id }: { id: string }) => {
  const selectedDeckId = useStore((state) => state.selectedDeckId)!;
  const card: Card = useStore((state) =>
    state.cards.find((card) => card.id === id),
  )!;
  const { editACard } = useMutationCards();
  const { toast } = useToast();

  const handlesubmit: () => void = (): void => {
    const front: string = (document.getElementById("front") as HTMLInputElement)
      .value;
    const back: string = (document.getElementById("back") as HTMLInputElement)
      .value;

    if (!front.trim() || !back.trim()) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Cannot add a card with no front or no back.",
        variant: "destructive",
      });
    } else {
      editACard(selectedDeckId, id, front, back);
    }
    document.getElementById("cancel")?.click();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Card</DialogTitle>
        <DialogDescription>Edit the front and back of your card here.</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="front" className="text-right">
          Front
        </Label>
        <Input
          id="front"
          className="col-span-3"
          placeholder="Enter your front here."
          defaultValue={card.front}
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
          defaultValue={card.back}
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
export default EditCardDialog;
