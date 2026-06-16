import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Button } from "@/components/ui/button";
import { HomePage } from "@/routes/HomePage";

describe("Button", () => {
  test("renders its label", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Submit</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is set", () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });
});

describe("HomePage", () => {
  test("renders the Recipe-Browser heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Recipe-Browser" })).toBeInTheDocument();
  });
});
