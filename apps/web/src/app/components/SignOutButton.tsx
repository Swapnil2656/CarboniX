import { handleSignOut } from "./auth-actions";

export function SignOutButton() {
  return (
    <form action={handleSignOut}>
      <button 
        type="submit"
        className="text-on-surface-variant hover:text-error transition-colors font-body-md bg-transparent border-none cursor-pointer"
      >
        Sign Out
      </button>
    </form>
  );
}
