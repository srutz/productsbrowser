import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks"
import { MyButton } from "../MyButton";
import { atom, useAtom } from "jotai";

const counterAtom = atom(1)

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return (
    <div className="flex gap-2">
    </div>
  );
}


