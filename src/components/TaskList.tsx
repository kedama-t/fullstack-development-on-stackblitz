import { ReactNode } from "react";

export default async function TaskList(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-slate-100 p-2">
      {children}
    </div>
  )
}
