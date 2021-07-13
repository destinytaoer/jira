import { ReactNode } from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "./authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
