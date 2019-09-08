export default class MemHelper {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new MemHelper()
      }
      
      return this._instance
  }

  _isRunning = false
  _queue = []

  addOperation(op) {
    this._queue.push(op)

    if (this._queue.length > 1 && this._isRunning == false) {
      this._isRunning = true
      this.releaseOne()
      this.releaseOne()
    }
  }

  releaseOne() {
    if (this._queue.length > 0) {
      const o = this._queue.shift()
      o()
    }
  }
}