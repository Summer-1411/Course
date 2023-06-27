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
        // loggerStart("Testing API register");
        // testCase(`${i}. Đầy đủ thông tin đăng ký`); i++
        // const registerResponse = await fetch('http://localhost:3000/api/v1/user/signup', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username: 'admin', email: 'admin@gmil.com', password: "123456", confirmpassword: "123456" }),
        // }) 
        // const registerData = await registerResponse.json();
        // if(registerData.status){
        //     loggerSuccess("Register API test passed!")
        // }else {
        //     loggerError(registerData.message)
        // }
        // testCase(`${i}. Thiếu 1 trong các thông tin`); i++;
        // const registerResponse1 = await fetch('http://localhost:3000/api/v1/user/signup', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username: 'John Doe', password: "123456", confirmpassword: "123456" }),
        // }) 
        // const registerData1 = await registerResponse1.json();
        // if(registerData1.status){
        //     loggerSuccess("Register API test passed!")
        // }else {
        //     loggerError(registerData1.message)
        // }
        // loggerEnd("Testing API register") 

        // loggerStart("Testing API login");
        // testCase(`${i}. Thiếu thông tin đăng nhập`); i++
        // const loginResponse = await fetch('http://localhost:3000/api/v1/user/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: 'john.doe@example.com'}),
        // }) 
        // const loginData = await loginResponse.json();
        // if(loginData.status){
        //     loggerSuccess("Login API test passed!")
        // }else {
        //     loggerError(loginData.message)
        // }
        // testCase(`${i}. Tài khoản đăng nhập không tồn tại `); i++
        // const loginResponse1 = await fetch('http://localhost:3000/api/v1/user/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({email: 'fail@example.com', password: "123456"}),
        // }) 
        // const loginData1 = await loginResponse1.json();
        // if(loginData1.status){
        //     loggerSuccess("Login API test passed!")
        // }else {
        //     loggerError(loginData1.message)
        // }
        // testCase(`${i}. Mật khẩu không chính xác `); i++
        // const loginResponse2 = await fetch('http://localhost:3000/api/v1/user/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({email: 'levantung14112002@gmail.com', password: "fail"}),
        // }) 
        // const loginData2 = await loginResponse2.json();
        // if(loginData2.status){
        //     loggerSuccess("Login API test passed!")
        // }else {
        //     loggerError(loginData2.message)
        // }
        console.log("Đăng nhập với vai trò user");
        let accessTokenUser;
        const loginResponse1 = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: 'test999999@gmail.com', password: "123456"}),
        }) 
        const loginData1 = await loginResponse1.json();
        if(loginData1.status){
            loggerSuccess("Login user API test passed!")
            accessTokenUser = loginData1.accessToken
        }else {
            console.log("123");
            loggerError(loginData1.message)
        }
        console.log({accessTokenUser});   
        console.log("Đăng nhập với vai trò admin");
        let accessTokenAdmin;
            
        const loginResponse3 = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: 'admin@gmail.com', password: "123456"}),
        }) 
        const loginData3 = await loginResponse3.json();
        if(loginData3.status){
            loggerSuccess("Login admin API test passed!")
            accessTokenAdmin = loginData3.accessToken
        }else {
            loggerError(loginData3.message)
        }
        console.log({accessTokenAdmin});
        testCase(`TC_01. Không có Access token ở request và thực hiện thêm khoá học`); i++
        const createCourse0 = await fetch('http://localhost:3000/api/course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: 'C++', img: "abc.jpg", mota: "C++", videoId: "T1CYS6c5eqY", level: "Cơ bản"}),
        }) 
        const createCourseData0 = await createCourse0.json();
        if(createCourseData0.status){
            loggerSuccess("Thêm mới khoá học thành công")
        }else {
            loggerError(createCourseData0.message)
        }
        let fakeAccessToken = "fakeAccessToken"
        testCase(`TC_02. Access token không hợp lệ và thực hiện thêm khoá học`); i++
        const createCourse3 = await fetch('http://localhost:3000/api/course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${fakeAccessToken}` },
            body: JSON.stringify({name: 'C++', img: "abc.jpg", mota: "C++", videoId: "T1CYS6c5eqY", level: "Cơ bản"}),
        }) 
        const createCourseData3 = await createCourse3.json();
        if(createCourseData3.status){
            loggerSuccess("Thêm mới khoá học thành công")
        }else {
            loggerError(createCourseData3.message)
        }
        testCase(`TC_03. Access token của tài khoản có quyền User và thực hiện thêm khoá học`); i++
        const createCourse = await fetch('http://localhost:3000/api/course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessTokenUser}` },
            body: JSON.stringify({name: 'C++', img: "abc.jpg", mota: "C++", videoId: "T1CYS6c5eqY", level: "Cơ bản"}),
        }) 
        const createCourseData = await createCourse.json();
        if(createCourseData.status){
            loggerSuccess("Thêm mới khoá học thành công")
        }else {
            loggerError(createCourseData.message)
        }
        testCase(`TC_04. Access token của tài khoản có quyền Admin, nhập thiếu thông tin khoá học`); i++
        const createCourse1 = await fetch('http://localhost:3000/api/course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessTokenAdmin}` },
            body: JSON.stringify({name: 'C++'}),
        }) 
        const createCourseData1 = await createCourse1.json();
        if(createCourseData1.status){
            loggerSuccess("Thêm mới khoá học thành công")
        }else {
            loggerError(createCourseData1.message)
        }
        testCase(`TC_05. Access token của tài khoản có quyền Admin, đầy đủ tin khoá học`); i++
        const createCourse2 = await fetch('http://localhost:3000/api/course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessTokenAdmin}` },
            body: JSON.stringify({name: 'C++', img: "abc.jpg", mota: "C++", videoId: "T1CYS6c5eqY", level: "Cơ bản"}),
        }) 
        const createCourseData2 = await createCourse2.json();
        if(createCourseData2.status){
            loggerSuccess("Thêm mới khoá học thành công")
        }else {
            loggerError(createCourseData2.message)
        }

        
    } finally {
        // Đóng trình duyệt
        await driver.quit();
    }
};

example();