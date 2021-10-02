import Admin from "./pages/Admin";
import PurchasePage from "./pages/PurchasePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Home";
import {
  ADMIN_ROUTE,
  PURCHASE_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
} from "./utils/const";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTER_ROUTE,
    Component: Register,
  },
  {
    path: PURCHASE_ROUTE + "/:id",
    Component: PurchasePage,
  },
];
