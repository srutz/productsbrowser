import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

console.log("PROCESSING ABOUT PAGE")


export function Component() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={() => setOpen(!open)}>Toggle sheet</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>A side sheet?</SheetTitle>
            <SheetDescription>Some more information goes here.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

//export { AboutPage as Component };

