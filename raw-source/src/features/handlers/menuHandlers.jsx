export const createHandlers = (navigate) => ({
  handleClickHomeProvider: () => navigate("/provider"),
  handleClickHomeBuyer: () => navigate("/user/products"),
  handleClickHomeAdmin: () => navigate("/admin"),

  handleClickInventoryBuyer: () => navigate("/user/inventory"),
  handleClickInventoryProvider: () => navigate("/provider/products"),
  handleClickUsersAdmin: () => navigate("/admin/users"),
  handleClickProductsAdmin: () => navigate("/admin/products"),


  handleClickOrdersProvider: () => navigate("/provider/orders"),
  handleClickOrdersBuyer: () => navigate("/buyer/orders"),

  handleClickProfile: () => navigate("/profile"),
  handleClickLogout: () => {
    localStorage.clear();
    navigate("/login")}
  });