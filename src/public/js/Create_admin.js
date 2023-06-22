const BTN_Create_Admin = document.querySelector(".BTN_Create_Admin");
if (BTN_Create_Admin) {
  BTN_Create_Admin.addEventListener("click", (e) => {
    e.preventDefault();
    handleCreateAdmin();
  });
}
const handleCreateAdmin = async () => {
  const Admin_name = document.querySelector(".Admin_name").value;
  const Admin_email = document.querySelector(".Admin_email").value;
  const Admin_Password = document.querySelector(".Admin_Password").value;
  const Admin_Confirm_Password = document.querySelector(
    ".Admin_Confirm_Password"
  ).value;
  const Admin = document.querySelector('input[name="Admin"]:checked').value;

  const res = await axios({
    method: "POST",
    url: "/api/v1/user/createAdmin",
    data: {
      username: Admin_name,
      email: Admin_email,
      password: Admin_Password,
      confirmpassword: Admin_Confirm_Password,
      role: Admin,
    },
  });
  console.log(res);
  if (res.data.status == "success") {
    window.location.assign("/admin/system");
  }
};
