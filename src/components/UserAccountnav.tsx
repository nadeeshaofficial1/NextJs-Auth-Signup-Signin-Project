"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserAccountnav = () => {
  return (
    <Button onClick={() => signOut(
        {
            redirect: false,
            callbackUrl: `${window.location.origin}/sign-in`,
        }
    )} variant="destructive">Sign Out</Button>
  )
}

export default UserAccountnav
