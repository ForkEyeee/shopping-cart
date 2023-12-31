import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "../components/CartItem";

describe("CartItem", () => {
  it("renders CartItem Component", () => {
    render(<CartItem />);
    expect(screen.getAllByRole("button")).toBeDefined();
    expect(screen.getAllByRole("img")).toBeDefined();
  });
});
