import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { zhCN } from "@clerk/localizations";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider localization={zhCN}>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
