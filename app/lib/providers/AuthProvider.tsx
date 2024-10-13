"use client";

import { ReactNode } from "react";
import SessionProvider from "./SessionProvider";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
