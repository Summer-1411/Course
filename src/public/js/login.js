const btnlogin = document.querySelector("#Btn_Login");

if (btnlogin)
  btnlogin.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin();
  });
async function handleLogin() {
  const email = document.querySelector("#typeEmailX").value;
  const password = document.querySelector("#typePasswordX").value;
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/login",
      data: {
        email,
        password,
      },
    });
    console.log(res.status);

    if (res.data.status == "success") {
      // alertsussess.classList.add("active_success");
      window.setTimeout(() => {
        location.assign("/");
      });
      // } else if (res.data.status == "failed") {
      //   alertfalse.classList.add("active_false");
    }
  } catch (error) {
    // else if (res.data.status != "success") {
    // alertfalse.classList.add("active_false");
    // setTimeout(() => {
    //   alertfalse.classList.remove("active_false");
    // }, 5000);
    // }
    console.log(error);
  }
}
