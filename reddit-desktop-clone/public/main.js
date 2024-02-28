const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {
    const win = new BrowserWindow({
        title: "Reddit Desktop",
        width: 1400,
        height: 800,
        minWidth: 765,
        center: true,
        resizeable:false,
        // frame: false,
        autoHideMenuBar: true,
        // vibrancy: 'under-window',
        // visualEffectState: 'active',
        // titleBarStyle: "hidden",
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be',
        },
        icon: path.join(__dirname, '../src/Assets/Icons/reddit.png'),
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