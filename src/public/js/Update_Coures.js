const btn_UpdateCoures = document.querySelector("#btn_UpdateCoures");
if (btn_UpdateCoures) {
  btn_UpdateCoures.addEventListener("click", (e) => {
    e.preventDefault();
    handleUpdateCoures();
  });
}
const handleUpdateCoures = async () => {
  const INPUT_COURES_ID = document.querySelector("#INPUT_COURES_ID").value;
  const INPUT_NAME = document.querySelector("#INPUT_NAME").value;
  const INPUT_IMAGE = document.querySelector("#INPUT_IMAGE").value;
  const INPUT_MOTA = document.querySelector("#INPUT_MOTA").value;
  const INPUT_VIDEOID = document.querySelector("#INPUT_VIDEOID").value;
  const INPUT_LEVEL = document.querySelector("#INPUT_LEVEL").value;
  try {
    const res = await axios({
      method: "patch",
      url: `/api/v1/coures/${INPUT_COURES_ID}`,
      data: {
        name: INPUT_NAME,
        mota: INPUT_MOTA,
        videoId: INPUT_VIDEOID,
        level: INPUT_LEVEL,
        img: INPUT_IMAGE,
      },
    });
    if (res.data.status == "success") {
      window.location.assign("/admin/ManagerCoures");
    }
  } catch (error) {
    console.log(error);
  }
};
