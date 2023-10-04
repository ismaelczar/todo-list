import styles from './Item.module.css'
import { Trash } from 'phosphor-react'

interface ItemProps {
  content: string
  concluded: boolean
  id: number
  onCompletedTask: (taskId: number) => void
  onRemoveTask: (taskId: number) => void
}

export function Item({
  id,
  content,
  concluded,
  onCompletedTask,
  onRemoveTask,
}: ItemProps) {
  return (
    <section className={styles.item}>
      <label className={styles.checkboxcontainer}>
        <input
          onClick={() => onCompletedTask(id)}
          title="Marcar tarefa como conclúida"
          type="checkbox"
        />
        <span className={styles.checkmark}></span>
      </label>

      <p>{concluded ? <s>{content}</s> : content}</p>

      <button onClick={() => onRemoveTask(id)} title="Deletar tareda">
        <Trash size={20} color="#808080" />
      </button>
    </section>
  )
}
