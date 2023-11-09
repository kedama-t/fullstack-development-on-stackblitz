"use client";

import addTask from "@/actions/addTask";
import updateTask from "@/actions/updateTask";
import { useState } from "react";

export default function TaskInput(props: { id?: number, name?: string, description?: string }) {
    const [name, setName] = useState(props.name ?? "");
    const [description, setDescription] = useState(props.description ?? "");

    const onClickHander = () => {
        if (props.id) {
            updateTask(props.id, name, description);
        } else {
            addTask(name, description);
        }
    }

    return (

        <form className="my-2 flex flex-col rounded-xl bg-slate-300 p-2">
            <div className="flex flex-col gap-1">
                <input
                    className="rounded-md bg-slate-200 p-2 text-slate-900"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input
                    className="rounded-md bg-slate-200 p-2 text-slate-900"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <button className="rounded-md bg-green-500 p-2 text-slate-50" onClick={() => onClickHander()}>Submit</button>
            </div>
        </form>
    )
}
