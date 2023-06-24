const { Builder, By, until } = require('selenium-webdriver');
const fetch = require('node-fetch');
const {createLogger, createLoggerTitle } = require('./logger')
const loggerStart = createLoggerTitle("START")
const testCase = createLogger("Test case")
const loggerEnd = createLoggerTitle("END")
const loggerSuccess = createLogger("SUCCESS")
const loggerError = createLogger("FAIL")



async function example() {
    let i = 1;
    // Khởi tạo trình duyệt từ xa sử dụng Source Labs
    const driver = await new Builder()
        .usingServer('https://oauth-levantung14112002-9c876:1236c517-a2fd-4fba-87c4-623ea1daf8b5@ondemand.us-west-1.saucelabs.com:443/wd/hub')
        .withCapabilities({
            platformName: 'Windows 10',
            browserName: 'chrome',
            version: 'latest',
            user: 'oauth-levantung14112002-9c876',
            accessKey: '1236c517-a2fd-4fba-87c4-623ea1daf8b5',
        })
        .build();

    try {
        loggerStart("Testing API register");
        testCase(`${i}. Đầy đủ thông tin đăng ký`); i++
        const registerResponse = await fetch('http://localhost:3000/api/v1/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', email: 'admin@gmil.com', password: "123456", confirmpassword: "123456" }),
        }) 
        const registerData = await registerResponse.json();
        if(registerData.status === "success"){
            loggerSuccess("Register API test passed!")
        }else {
            loggerError(registerData.message)
        }
        testCase(`${i}. Thiếu 1 trong các thông tin`); i++;
        const registerResponse1 = await fetch('http://localhost:3000/api/v1/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'John Doe', password: "123456", confirmpassword: "123456" }),
        }) 
        const registerData1 = await registerResponse1.json();
        if(registerData1.status === "success"){
            loggerSuccess("Register API test passed!")
        }else {
            loggerError(registerData1.message)
        }
        loggerEnd("Testing API register") 

        loggerStart("Testing API login");
        testCase(`${i}. Thiếu thông tin đăng nhập`); i++
        const loginResponse = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'john.doe@example.com'}),
        }) 
        const loginData = await loginResponse.json();
        if(loginData.status === "success"){
            loggerSuccess("Login API test passed!")
        }else {
            loggerError(loginData.message)
        }
        testCase(`${i}. Tài khoản đăng nhập không tồn tại `); i++
        const loginResponse1 = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: 'fail@example.com', password: "123456"}),
        }) 
        const loginData1 = await loginResponse1.json();
        if(loginData1.status === "success"){
            loggerSuccess("Login API test passed!")
        }else {
            loggerError(loginData1.message)
        }
        testCase(`${i}. Mật khẩu không chính xác `); i++
        const loginResponse2 = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: 'levantung14112002@gmail.com', password: "fail"}),
        }) 
        const loginData2 = await loginResponse2.json();
        if(loginData2.status === "success"){
            loggerSuccess("Login API test passed!")
        }else {
            loggerError(loginData2.message)
        }
        testCase(`${i}. Tài khoản và mật khẩu chính xác `); i++;
        const loginResponse3 = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: 'admin@gmail.com', password: "123456"}),
        }) 
        const loginData3 = await loginResponse3.json();
        if(loginData3.status === "success"){
            loggerSuccess("Login API test passed!")
        }else {
            loggerError(loginData3.message)
        }
        loggerEnd("Testing API login") 
    } finally {
        // Đóng trình duyệt
        await driver.quit();
    }
};

example();