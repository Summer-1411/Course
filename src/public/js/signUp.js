const btnSignUp = document.querySelector("#BTN_SIGN_UP");
// const alertsussess1 = document.querySelector(".alert-sussess");
// const alertfalse1 = document.querySelector(".alert-false");

if (btnSignUp) {
  btnSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    handleSignUp();
  });
}
async function handleSignUp() {
  try {
    const username = document.querySelector("#typeUserNameX").value;
    const email = document.querySelector("#typeEmailX").value;
    const password = document.querySelector("#typePasswordX").value;
    const confirmpassword = document.querySelector(
      "#typeConfirmPasswordX"
    ).value;
    const phoneNumber = document.querySelector("#typePhoneNumberX").value;
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/signup",
      data: {
        username,
        email,
        password,
        confirmpassword,
        phoneNumber,
      },
    });

    console.log(res);
    if (res.data.status == "success") {
      // alertsussess1.classList.add("active_success");
      window.setTimeout(() => {
        location.assign("/login");
      }, 200);
      // } else if (res.data == "vui lòng nhập đầy đủ thông tin") {
      //   alertfalse1.classList.add("active_false");
    }
  } catch (error) {
    //   alertfalse1.classList.add("active_false");
    //   setTimeout(() => {
    //     alertfalse1.classList.remove("active_false");
    //   }, 5000);
    // }
    console.log(error);
  }
}
