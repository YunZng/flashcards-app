import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useMutationUser from "@/hooks/use-mutation-user";

export const RegisterDialog = () => {
    const { registerUser } = useMutationUser();
    const { toast } = useToast();

    const handlesubmit = async () => {
        const username: string = (document.getElementById("username") as HTMLInputElement).value;
        const displayName: string = (document.getElementById("displayName") as HTMLInputElement).value;
        const avatar: string = (document.getElementById("avatar") as HTMLInputElement).value;
        const password: string = (document.getElementById("password") as HTMLInputElement).value;
        if (!username || !displayName || !password) {
            toast({
                variant: "destructive",
                title: "Sorry! Username, display name, and password cannot be empty! 🙁",
                description: `Please enter your login credentials.`,
            });
            return;
        }
        await registerUser(username, displayName, avatar, password);
        document.getElementById("cancel")?.click();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button aria-label={"Make a Post"} variant="outline" size="sm">
                    Register
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Please complete this form to register.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            className="col-span-3"
                            placeholder="Enter your username here."
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="displayName" className="text-right">
                            Display Name
                        </Label>
                        <Input
                            id="displayName"
                            className="col-span-3"
                            placeholder="Enter your display name here."
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="avatar" className="text-right">
                            Avatar URL
                        </Label>
                        <Input
                            id="avatar"
                            className="col-span-3"
                            placeholder="Image url of avatar(Optional)."
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            className="col-span-3"
                            placeholder="Enter your password here."
                            type="password"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button id="cancel" type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handlesubmit}>
                            Register
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
