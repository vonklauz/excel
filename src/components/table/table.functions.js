import {
  range
} from "@/core/utils"

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === "cell"
}

export function matrix(current, target) {
  current = current.id(true)
  target = target.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {
  col,
  row
}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col > MIN_VALUE ? col-- : col
      break
    case 'ArrowUp':
      row > MIN_VALUE ? row-- : row
      break
    default:
      break
  }

  return `[data-id="${row}:${col}"]`
}