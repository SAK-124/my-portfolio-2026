'use client'

import { ReactNode } from 'react'
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DotsSixVertical } from '@phosphor-icons/react/dist/ssr'

interface HasId {
  id: string
}

export interface SortableListProps<T extends HasId> {
  items: T[]
  onReorder: (ids: string[]) => void
  renderItem: (item: T, handleProps: { ref: (el: HTMLElement | null) => void; attrs: Record<string, unknown> }) => ReactNode
  className?: string
}

export function SortableList<T extends HasId>({ items, onReorder, renderItem, className }: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((x) => x.id === active.id)
    const newIndex = items.findIndex((x) => x.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    const next = [...items]
    const [moved] = next.splice(oldIndex, 1)
    next.splice(newIndex, 0, moved)
    onReorder(next.map((x) => x.id))
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((x) => x.id)} strategy={verticalListSortingStrategy}>
        <div className={className}>
          {items.map((item) => (
            <SortableRow key={item.id} id={item.id}>
              {(h) => renderItem(item, h)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function SortableRow({
  id,
  children,
}: {
  id: string
  children: (h: { ref: (el: HTMLElement | null) => void; attrs: Record<string, unknown> }) => ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  }
  return (
    <div ref={setNodeRef} style={style}>
      {children({
        ref: () => {},
        attrs: { ...attributes, ...listeners },
      })}
    </div>
  )
}

export function DragHandle({
  attrs,
  className = '',
}: {
  attrs: Record<string, unknown>
  className?: string
}) {
  return (
    <button
      type="button"
      {...attrs}
      aria-label="Drag to reorder"
      className={`profile-icon-chip cursor-grab active:cursor-grabbing ${className}`}
    >
      <DotsSixVertical size={16} weight="bold" />
    </button>
  )
}
