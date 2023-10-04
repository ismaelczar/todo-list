import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react'
import { Item } from '../Task/Item'

import { ClipboardText, PlusCircle } from 'phosphor-react'
import styles from './List.module.css'

interface Tasks {
  id: number
  type: string
  content: string
  concluded: boolean
  item: number
}

export function List() {
  const [tasks, setTask] = useState<Tasks[]>([])

  const [newText, setNewText] = useState('')

  const completedTaskValue = tasks.filter(
    (task) => task.concluded === true,
  ).length

  function hundleSubmitForm(event: FormEvent) {
    event.preventDefault()

    setTask((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        type: 'paragraph',
        content: newText,
        concluded: false,
        item: 0,
      },
    ])

    setNewText('')
  }

  function hundleNewTask(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewText(event.target.value)
  }

  function hundleInvalidText(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity(
      'Antes de criar, informe qual será a tarefa!',
    )
  }

  function handleCompletedTask(taskId: number) {
    setTask((prevState) =>
      prevState.map((task) => {
        if (task.id === taskId && task.concluded === false) {
          return { ...task, concluded: true, item: +1 }
        } else if (task.id === taskId && task.concluded === true) {
          return { ...task, concluded: false, item: -1 }
        }
        return task
      }),
    )
  }

  function hundleRemoveTask(taskId: number) {
    setTask((prevState) => prevState.filter((task) => task.id !== taskId))
  }

  return (
    <form onSubmit={hundleSubmitForm}>
      <div className={styles.submitList}>
        <textarea
          name="comment"
          required
          placeholder="Adicione uma nova tarefa"
          onChange={hundleNewTask}
          onInvalid={hundleInvalidText}
          value={newText}
        />
        <button type="submit" title="Criar tarefa">
          Criar
          <PlusCircle size={18} />
        </button>
      </div>

      <div className={styles.status}>
        <p className={styles.newTask}>
          Tarefas criadas
          <span className={styles.statusValue}>{tasks.length}</span>
        </p>

        <p className={styles.endTask}>
          Concluídas
          <span
            className={styles.statusValue}
          >{`${completedTaskValue} de ${tasks.length}`}</span>
        </p>
      </div>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Item
            key={task.id}
            id={task.id}
            content={task.content}
            concluded={task.concluded}
            onCompletedTask={handleCompletedTask}
            onRemoveTask={hundleRemoveTask}
          />
        ))
      ) : (
        <div className={styles.defaultValueTask}>
          <ClipboardText size={75} />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <small>Crie tarefas e organize seus itens a fazer</small>
        </div>
      )}
    </form>
  )
}
