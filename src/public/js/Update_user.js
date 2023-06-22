const BTN_UPDATE_USER = document.querySelector("#BTN_UPDATE_USER");
const MESSAGE_SUCCESS = document.querySelector("#MESSAGE_SUCCESS");
const MESSAGE_ERROR = document.querySelector("#MESSAGE_ERROR");
if (BTN_UPDATE_USER) {
  BTN_UPDATE_USER.addEventListener("click", (e) => {
    e.preventDefault();
    handle_Update_User();
  });
}

async function handle_Update_User() {
  try {
    const PROFILE_USER_ID = document.querySelector("#PROFILE_USER_ID").value;
    const PROFILE_USER_NAME =
      document.querySelector("#PROFILE_USER_NAME").value;
    const PROFILE_USER_EMAIL = document.querySelector(
      "#PROFILE_USER_EMAIL"
    ).value;
    const PROFILE_USER_PHONE = document.querySelector(
      "#PROFILE_USER_PHONE"
    ).value;
    console.log(PROFILE_USER_NAME, PROFILE_USER_EMAIL, PROFILE_USER_ID);
    const res = await axios({
      method: "patch",
      url: `/api/v1/user/${PROFILE_USER_ID}`,
      data: {
        _id: PROFILE_USER_ID,
        username: PROFILE_USER_NAME,
        email: PROFILE_USER_EMAIL,
      },
    });
    console.log(res);
    if (res.data.status == "failed") {
      return MESSAGE_ERROR.classList.remove("hiddlen_notifications");
    }
    if (res.data.status == "success") {
      MESSAGE_SUCCESS.classList.remove("success_message_notifications");
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (error) {
    window.location.assign("/");
  }
}
