const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {
    const win = new BrowserWindow({
        title: "Reddit Desktop",
        width: 1400,
        height: 800,
        minWidth: 765,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
})

win.loadURL('http://localhost:3000')

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})