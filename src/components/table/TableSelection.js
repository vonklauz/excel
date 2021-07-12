export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  clear() {
    this.group.
        forEach($el => {
          $el.removeClass(TableSelection.className)
        })
    this.group = []
  }

  selectGroup(cells) {
    this.clear()
    cells.forEach( $cell => $cell.addClass(TableSelection.className))
    this.group = cells
  }
}