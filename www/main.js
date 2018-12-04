const electron = require('electron')
const {app, BrowserWindow} = electron

let mainWindow

app.disableHardwareAcceleration()

function createWindow () {
  let displays = electron.screen.getAllDisplays()

  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    mainWindow = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      width: externalDisplay.size.width,
      height: externalDisplay.size.height,
      transparent: true, 
      frame: false,
      toolbar: false,
      type: 'desktop',
    })

    mainWindow.loadFile('www/index.html')

    // mainWindow.webContents.openDevTools({ mode: 'detach' })

    mainWindow.on('closed', function () {
      mainWindow = null
    })
  }
}

app.on('ready', async() => {
    setTimeout(() => {
        createWindow()
    }, 200)
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
