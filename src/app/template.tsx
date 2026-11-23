import type { ReactNode } from "react";
import { PageCurtain } from "@/components/layout/PageCurtain";

const Template = ({ children }: { children: ReactNode }) => (
  <>
    <PageCurtain />
    {children}
  </>
);

export default Template;
