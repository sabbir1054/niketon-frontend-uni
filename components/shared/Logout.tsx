import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
