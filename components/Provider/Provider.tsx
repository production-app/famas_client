"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

let persister: any;
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

if (typeof window !== "undefined") {
  persister = createSyncStoragePersister({
    storage: window.localStorage,
  });
}

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //   const [queryClient] = React.useState(() => new QueryClient());
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default Provider;
