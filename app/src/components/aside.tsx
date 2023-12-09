import { useStore } from "@/lib/store";
import { LogoutDialog } from "./auth/logout-dialog";
import { RegisterDialog } from "./auth/register-dialog";
import { LoginDialog } from "./auth/login-dialog";

const Aside = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="flex flex-col gap-2 p-4">
      {user ? <LogoutDialog /> : <LoginDialog />}
      {!user && <RegisterDialog />}
    </div>
  );
};

export default Aside;
