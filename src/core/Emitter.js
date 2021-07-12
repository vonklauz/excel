export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch,fire,trigger
  // уведомление слушателей
  // event это наше собственное событие
  // element.emit('table:select', {a:1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })

    return true
  }

  // on, listen
  // подписка на уведомление
  // либо добавление нового слушателя
  // element.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => {
        return listener !== fn
      })
    }
  }
}


// Пример
// const emitter = new Emitter()
// emitter.subscribe('test', data => console.log('hey', data))
// emitter.emit('test', [1, 2, 3])