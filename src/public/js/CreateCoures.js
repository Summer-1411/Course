const btnCreateCoures = document.querySelector("#btn_createCoures");

if (btnCreateCoures) {
  btnCreateCoures.addEventListener("click", (e) => {
    e.preventDefault();
    handleCreateCoures();
  });
}

async function handleCreateCoures() {
  try {
    const name = document.querySelector(".create_name").value;
    const mota = document.querySelector(".create_mota").value;
    const videoId = document.querySelector(".create_videoId").value;
    const level = document.querySelector(".create_level").value;
    const img = document.querySelector(".exampleInputImg").value;
    const res = await axios({
      method: "POST",
      url: "/api/v1/coures",
      data: {
        name,
        img,
        mota,
        videoId,
        level,
      },
    });
    console.log(res);
    if (res.data.status == "success") {
      location.assign("/admin/ManagerCoures");
    }
  } catch (error) {
    console.log(error);
  }
}
