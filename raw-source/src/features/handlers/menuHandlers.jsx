
export const createHandlers = (navigate) => ({
  handleClickHomeProvider: () => navigate("/admin/dashboard"),
  handleClickHomeBuyer: () => navigate("/user/products"),
  handleClickHomeAdmin: () => navigate("/admin/inventory"),

  handleClickInventoryBuyer: () => navigate("/user/inventory"),
  handleClickUsersAdmin: () => navigate("/admin/users"),
  handleClickInventoryAdmin: () => navigate("/admin/inventory"),


  handleClickOrdersProvider: () => navigate("/provider/orders"),
  handleClickOrdersBuyer: () => navigate("/user/orders"),

  handleClickProfile: () => navigate("/profile"),
  handleClickLogout: () => {
    localStorage.clear();
    navigate("/login")}
  });

