import Chronometer from "../components/Chronometer";
import Form from "../components/Form";
import List from "../components/List";
import { Itask } from "../types/task";
import style from './App.module.scss'
import { useState } from 'react'

function App() {

  const [tasks, setTasks] = useState<Itask[] | []>([])
  const [selected, setSelected] = useState<Itask>()

  function selectTask(selectedTask: Itask) {
    setSelected(selectedTask)
    setTasks(previousTasks => previousTasks.map(task => ({
      ...task,
      selected: task.id === selectedTask.id ? true : false
    })))
  }

  function endTask() {
    if(selected) {
      setSelected(undefined);
      setTasks(previousTasks => previousTasks.map(task => {
        if(task.id === selected.id) {
          return {
            ...task,
            selected: false,
            completed: true
          }
        }
        return task
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks}/>
      <List
        tasks={tasks}
        selectTask={selectTask}
      />
      <Chronometer
        selected={selected}
        endTask={endTask}
      />
    </div>
  );
}

export default App;
