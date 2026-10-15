import type { ReactNode } from "react";

export default function Scene({ children }: { children: ReactNode }) {
  return <div data-narrative="">{children}</div>;
}
