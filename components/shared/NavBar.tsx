"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authKey } from "@/constance/authKey";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { setUser } from "@/redux/slice/authSlice";
import { removeFromLocalStorage } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import SpinnerOverlay from "./SpinnerOverlay";

const NavBar = () => {
  const router = useRouter();
  const { data: profileData, isLoading } = useGetMyProfileQuery({});
  const dispatch = useDispatch();

  if (isLoading) {
    return <SpinnerOverlay />;
  }
  const handleLogout = () => {
    removeFromLocalStorage(authKey);
    dispatch(setUser({ token: null }));
    router.push("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white p-3 py-5 shadow-sm border-b-1">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl  font-bold">
            <Image
              src={"/images/logo.png"}
              alt="rme logo"
              width={50}
              height={50}
            />
          </Link>
          <div className="space-x-4 hidden md:flex">
            <Link
              href="/home"
              className="text-black hover:font-bold transition-all duration-75 ease-in-out "
            >
              Home
            </Link>
            <Link
              href="/houses"
              className="text-black hover:font-bold transition-all duration-75 ease-in-out"
            >
              Houses
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-x-4 flex">
          {!profileData?.data && (
            <>
              <Link
                href="/auth/login"
                className="text-black hover:font-bold transition-all duration-75 ease-in-out"
              >
                <Button className="cursor-pointer">Login</Button>
              </Link>
              <Link
                href="/auth/register"
                className="text-black hover:font-bold transition-all duration-75 ease-in-out"
              >
                <Button variant={"outline"} className="cursor-pointer">
                  Register
                </Button>
              </Link>
            </>
          )}

          {profileData?.data && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={`${profileData?.data?.photo}`} />
                  <AvatarFallback>{profileData?.data?.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Profile</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
                <Link href={"/dashboard"}>
                  {" "}
                  <DropdownMenuItem className="cursor-pointer border-b-1 rounded-none hover:bg-primary hover:text-white shadow-none w-full">
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <Link href={"/dashboard/profile"}>
                  <DropdownMenuItem className="cursor-pointer border-b-1 rounded-none hover:bg-primary hover:text-white shadow-none w-full">
                    Profile
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer  rounded-none hover:bg-primary hover:text-white shadow-none w-full"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
