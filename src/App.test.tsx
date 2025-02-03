import { render, screen } from "@testing-library/react";
import { useAuth } from "features/Auth/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { http, HttpResponse, server } from "test/server";
import type { ListOfArticlesSchema } from "api/schemas";
import type { z } from "zod";

jest.mock("features/Auth/Auth", () => {
  return { useAuth: jest.fn() };
});

const mockedAuth = useAuth as jest.MockedFunction<typeof useAuth>;
mockedAuth.mockReturnValue({ isAuthenticated: false, JWT: undefined, setJWT: () => void 0 });

const queryClient = new QueryClient();

/* 
TODO:
 - we could create a custom renderer with client query and client wrapper
   so that we don't have to do this every time.

 - we could setup some default API mocks in MSW, so that we don't have to mock or handle them 
   explicitly every time
*/

describe("App", () => {
  beforeEach(() => {
    server.use(
      http.get("http://localhost:3000/api/articles", () => {
        const data = [
          {
            title: "First Article",
            slug: "first-article",
            favorited: false,
            favoritesCount: 0,
            author: { username: "bob", bio: "hello", following: false, image: "" },
            createdAt: new Date(),
            description: "lorem",
          },
        ] satisfies z.infer<typeof ListOfArticlesSchema>;

        return HttpResponse.json({ articles: data }, { status: 200 });
      })
    );
  });

  it("renders conduit links (logo + footer)", () => {
    render(<QueryClientProvider client={queryClient}>{<App />}</QueryClientProvider>);

    const linkElements = screen.getAllByRole("link", { name: "conduit" });
    expect(linkElements).toHaveLength(2);
  });

  it("renders initial articles", () => {
    render(<QueryClientProvider client={queryClient}>{<App />}</QueryClientProvider>);

    screen.getByRole("heading", { level: 1, name: "First Article" });
  });
});
