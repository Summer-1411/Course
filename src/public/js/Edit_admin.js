const BTN_edit_Admin = document.querySelector(".BTN_edit_Admin");

if (BTN_edit_Admin) {
  BTN_edit_Admin.addEventListener("click", async (e) => {
    e.preventDefault();
    const editAdmin_ID = document.querySelector(".editAdmin_ID").value;
    const editAdmin_name = document.querySelector(".editAdmin_name").value;
    const editAdmin_email = document.querySelector(".editAdmin_email").value;
    const editAdmin_Confirm_Password = document.querySelector(
      ".editAdmin_Confirm_Password"
    ).value;
    const Admin = document.querySelector(
      'input[name="EditAdmin"]:checked'
    ).value;
    console.log(
      editAdmin_ID,
      editAdmin_name,
      editAdmin_email,
      editAdmin_Confirm_Password,
      Admin
    );
    const res = await axios({
      method: "patch",
      url: `/api/v1/user/admin/${editAdmin_ID}`,
      data: {
        username: editAdmin_name,
        email: editAdmin_email,
        role: Admin,
      },
    });
    console.log(res);
    if (res.data.status == "success") {
      window.location.assign("/admin/system");
    }
  });
}
