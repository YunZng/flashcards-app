import useMutationUser from "@/hooks/use-mutation-user";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export const LogoutDialog = () => {
    const { logoutUser } = useMutationUser();
    const handleButton = async () => {
        await logoutUser();
    }
    return (<Dialog>
        <DialogTrigger asChild>
            <Button aria-label={"Make a Post"} variant="destructive" size="sm">
                Logout
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>You sure?</DialogTitle>
                <DialogDescription>
                    You sure you wanna logout?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button id="cancel" type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    aria-label={"Make a Post"}
                    variant="destructive"
                    size="sm"
                    onClick={handleButton}
                >
                    Yes bruh
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
};