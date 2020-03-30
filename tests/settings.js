exports.opts = {
    port: 4723,
    path: "/wd/hub",
    logLevel: 'debug',
    capabilities: {
        platformName: "Android",
        platformVersion: "9",
        deviceName: "emulator-5554",
        appPackage: "com.vbanthia.androidsampleapp",
        appActivity: ".MainActivity",
        automationName: "UiAutomator2",
    }
};