export default class CameraRepository {
  static singleInstance = null
  static instance() {
    if (this.singleInstance == null) {
      this.singleInstance = new CameraRepository()
    }
      
    return this.singleInstance
  }

  observers = []

  cameraList = null

  setCameraList(list) {
    this.cameraList = list
    this.notify()
  }

  addObserver(observer) {
    this.observers.push(observer)
    observer(this.cameraList)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o != observer)
  }

  notify() {
    this.observers.forEach(o => {
      o(this.cameraList)
    })
  }
}