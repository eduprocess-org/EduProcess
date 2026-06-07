import { useContext } from "react";
<<<<<<< HEAD
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
=======

import { AuthContext }
  from "../context/AuthContext";

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

>>>>>>> cfb49a40847bf95a58ef7fe38fdc0bebd3ba2584
  }

  return context;
}