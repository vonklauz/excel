import {
  $
} from "@/core/dom"

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  $resizer.css({
    opacity: 1
  })
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const side = type === 'col' ? 'bottom' : 'right'
  let value;
  let delta;

  document.onmousemove = e => {
    if (type === 'col') {
      delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px',
        zIndex: 5000,
        [side]: '-5000px'
      })
    } else {
      delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px',
        zIndex: 5000,
        [side]: '-5000px'
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0,
      zIndex: 0
    })

    if (type === 'col') {
      $parent.css({
        width: value + 'px'
      })
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({
        height: value + 'px'
      })
    }
  }
}