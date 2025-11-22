export const createHandlers = (navigate) => ({
  
  handleClickHomeProvider: () => navigate("/provider"),
  handleClickHomeBuyer: () => navigate("/buyer"),
  handleClickHomeAdmin: () => navigate("/admin"),

  handleClickInventoryBuyer: () => navigate("/buyer/inventory"),      //---------------- handleClickInventoryBuyer: () => navigate("/buyer/inventory")
  handleClickInventoryProvider: () => navigate("/provider/products"),
    
  handleClickUsersAdmin: () => navigate("/admin/users"),
  handleClickProductsAdmin: () => navigate("/admin/products"),

  handleClickTransactionsAdmin: () => navigate("/admin/transactions"),
  handleClickTransactionsBuyer: () => navigate("/buyer/transactions"),
  handleClickTransactionsProvider: () => navigate("/provider/transactions"),


  handleClickOrdersProvider: () => navigate("/provider/orders"),
  handleClickOrdersBuyer: () => navigate("/buyer/orders"),

  handleClickProfile: () => navigate("/profile"),
  handleClickLogout: () => {
    localStorage.clear();
    navigate("/login")}
  });
