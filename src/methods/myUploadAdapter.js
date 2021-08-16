import axios from 'axios'

export default class MyUploadAdapter {
  constructor (loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }
  // Starts the upload process.

  upload () {
    // Return a promise that will be resolved when the file is uploaded.
    return this.loader.file
      .then(file => new Promise((resolve) => {
        this._sendRequest(file, resolve)
      }))
  }

  _sendRequest (file, resolve) {
    // Prepare the form data.
    const data = new FormData()
    data.append('upload', file)
    // Send the request.
    axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, data)
      .then(response => {
        if (!response.data.success) return
        this.loader.imageUrl = response.data.imageUrl
        resolve({ default: response.data.imageUrl })
      })
  }
}
