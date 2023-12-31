import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomeItemList from "../components/HomeItemList";
import useDataFetching from "../hooks/fetchItemData";
import { renderHook, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

describe("useDataFetching Hook", () => {
  it("fetches electronic products and matches the snapshot", async () => {
    const { result } = renderHook(() =>
      useDataFetching("https://fakestoreapi.com/products/")
    );
    await waitFor(() => expect(result.current[0]).not.toBeNull());
    expect(result.current[0]).toMatchSnapshot();
  });
});

it("shows an error message when API call fails", async () => {
  render(
    <ChakraProvider>
      <BrowserRouter>
        <HomeItemList error={true} />
      </BrowserRouter>
    </ChakraProvider>
  );

  const errorMessage = screen.getByText("Failed to Fetch Data");
  expect(errorMessage).toBeVisible();
});

it("renders ItemsList Component", async () => {
  render(
    <ChakraProvider>
      <BrowserRouter>
        <HomeItemList />
      </BrowserRouter>
    </ChakraProvider>
  );
  const featuredItemsTitle = await screen.findByText("Today's Stock");
  expect(featuredItemsTitle).toBeVisible();
});
