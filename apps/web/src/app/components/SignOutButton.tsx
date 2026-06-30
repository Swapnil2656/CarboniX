import { signOut } from "@/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button 
        type="submit"
        className="text-on-surface-variant hover:text-error transition-colors font-body-md bg-transparent border-none cursor-pointer"
      >
        Sign Out
      </button>
    </form>
  );
}
