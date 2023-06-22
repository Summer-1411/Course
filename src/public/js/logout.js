const logout = document.querySelector("#BTN_LOGOUT");
if (logout) {
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });
}
async function handleLogout() {
  try {
    const res = await axios({
      method: "get",
      url: "/api/v1/user/logout",
    });
    if (res.data.status == "success") {
      location.reload(true);
      window.location.assign("/");
    }
  } catch (error) {
    res.status(500).json("lỗi token");
  }
}
