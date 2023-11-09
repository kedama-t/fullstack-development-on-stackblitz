"use client";

import deleteTask from "@/actions/deleteTask";
import { ReactNode, useState } from "react";
import TaskInput from "./TaskInput";

export default function TaskItem(props: { id: number, name: string, description: string, children?: ReactNode }) {
  const { id, name, description, children } = props;
  const [editorVisible, setEditorVisible] = useState(false);
  const editHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditorVisible(!editorVisible);
  }
  return (
    <>
      <div className="mx-auto flex w-11/12 flex-row justify-between rounded-md bg-slate-200 p-1">
        <div className="p-2">
          {children ?? (<>
            <p className="text-md font-bold">{name}</p>
            <p className="text-xs text-slate-500">{description}</p>
          </>
          )}
        </div>
        <div className="p-2">
          <form className="m-auto flex flex-row gap-1">
            <button className="rounded-md bg-red-500 p-2 text-slate-50" onClick={() => deleteTask(id)}>Delete</button>
            <button className="rounded-md bg-green-500 p-2 text-slate-50" onClick={editHandler}>{editorVisible ? "Cancel" : "Edit"}</button>
          </form>
        </div>
      </div>
      {editorVisible ? <TaskInput id={id} name={name} description={description} /> : null}
    </>
  )
}
