const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `
}

function createCol(char) {
  return `
    <div class="column">
      ${char}
    </div>
  `
}

function createRow(content, order="") {
  return `
    <div class="row">
      <div class="row-info">${order}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => {
        return createCol(
            String.fromCharCode(CODES.A + index)
        )
      })
      .join('')
  const cells = new Array(colsCount)
      .fill(createCell())
      .join('')

  rows.push(createRow(cols))
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}