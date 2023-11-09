import getTasks from "@/actions/getTasks"
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import TaskList from "@/components/TaskList";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className="min-w-fit items-center justify-between p-24">
      <h1 className="mb-2 w-full text-center text-2xl font-bold">Task List</h1>
      <div>
        <TaskList>
          {tasks.map(task => {
            return (
              <TaskItem key={task.id} id={task.id} name={task.name ?? ""} description={task.description ?? ""}>
                <p className="text-md font-bold">{task.name}</p>
                <p className="text-xs text-slate-500">{task.description}</p>
              </TaskItem>)
          })}
        </TaskList>
        <TaskInput />
      </div>
    </main>
  )
}
