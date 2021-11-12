import axios from 'axios'

export default class MyUploadAdapter {
  constructor (loader) {
    this.loader = loader
  }

  upload () {
    return this.loader.file
      .then(file => new Promise((resolve) => {
        this._sendRequest(file, resolve)
      }))
  }

  _sendRequest (file, resolve) {
    const data = new FormData()
    data.append('upload', file)
    axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, data)
      .then(response => {
        if (!response.data.success) return
        this.loader.imageUrl = response.data.imageUrl
        resolve({ default: response.data.imageUrl })
      })
  }
}
