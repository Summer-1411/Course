const express = require("express");
const router = express.Router();
const viewControllers = require("../app/controllers/viewControllers");
const authorzicationControllers = require("../app/controllers/AuthorticationControllers");
const userControllers = require("../app/controllers/UserControllers");

router.get(
  "/Coures/:slug",
  authorzicationControllers.protect,
  viewControllers.pageChitiet
);

router.get(
  "/coure-detail/:slug",
  authorzicationControllers.isLogin,
  viewControllers.pageXemchitiet
);
router.get(
  "/admin/CreateCoures",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin", "manager"),
  viewControllers.pageCreateCoures
);
router.get(
  "/admin/UpdateCoures/:id",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin", "manager"),
  viewControllers.PageUpdateCoures
);
router.get(
  "/admin/ManagerCoures",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin", "manager"),
  viewControllers.PageManagerCoures
);
router.get(
  "/admin/system",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.PageSystem
);
router.get(
  "/admin/system/create_admin",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.Pagecreate_admin
);
router.get(
  "/admin/system/edit/:id",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.PageEdit_admin
);
router.get("/signup", viewControllers.pageSignup);
router.get("/login", viewControllers.pageLogin);
router.get(
  "/about",
  authorzicationControllers.isLogin,
  viewControllers.Page_about
);
router.get(
  "/category",
  authorzicationControllers.isLogin,
  viewControllers.page_category
);
router.get(
  "/test",
  authorzicationControllers.isLogin,
  viewControllers.page_test
);
router.get(
  "/user",
  authorzicationControllers.isLogin,
  viewControllers.user_view
);
router.get(
  "/user/profile",
  authorzicationControllers.isLogin,
  viewControllers.profile
);
router.get(
  "/admin/profine",
  authorzicationControllers.protect,
  viewControllers.pageAdmin_Profine
);
router.get(
  "/admin/Dashboard",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.pageAdmin_Dashboard
);
router.get(
  "/admin/manager-users",
  authorzicationControllers.protect,
  authorzicationControllers.decentralization("admin"),
  viewControllers.pageManagerUsers
);
router.get(
  "/Docs",
  authorzicationControllers.isLogin,
  viewControllers.pageDocs
);

router.get(
  "/",
  authorzicationControllers.isLogin,
  viewControllers.pageOverView
);

module.exports = router;
