import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";


export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const [ open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={() => navigate({ to: "/contact"})}>Contact Infos</Button>
      <Button onClick={() => setOpen(!open)}>Toggle sheet</Button>
      <Button variant="destructive">Button 1</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}


