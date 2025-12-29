import { useAuth } from "../AuthContext";

export default function Settings() {
  const { logOut } = useAuth();

  return (
    <main>
        <button onClick = {logOut}>Sign Out</button>
    </main>
  );
};