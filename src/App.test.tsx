import { render, screen } from "@testing-library/react";
import { Footer } from "./components/Footer";
import { MemoryRouter } from "react-router";

it("renders conduit link", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  const linkElement = screen.getAllByText(/conduit/i)[0];
  expect(linkElement).toBeInTheDocument();
});
