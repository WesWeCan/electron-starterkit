import { app, BrowserWindow } from 'electron'

const isDevelopment = (import.meta as any).env.MODE !== "production";
console.log("main.ts: isDevelopment: ", isDevelopment);
console.log("Node Version: " + process.version);


import {InternalServer} from "./internalServer/InternalServer";
const internalServer = new InternalServer();



const createWindow = async () => {

    const devServerUrl = process.env.VITE_DEV_SERVER_URL;

    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
        },
        kiosk: false
    });

    if (devServerUrl) {
        mainWindow.loadURL(devServerUrl);
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile("build/index.html");
        // mainWindow.webContents.openDevTools();
    }

    console.log("main.ts: createWindow: devServerUrl: ", devServerUrl);

    await internalServer.init(app);

}











// ======== Electron App Events ========

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}