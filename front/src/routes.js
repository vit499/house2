import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
  PURLIST_ROUTE,
  ADDPUR_ROUTE,
  EDITPUR_ROUTE,
  EDIT_TAGS_ROUTE,
  EDIT_NEEDS_ROUTE,
  EDIT_FREQS_ROUTE,
  TEST_ROUTE,
} from "./utils/const";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import PurListPage from "./pages/PurListPage";
import AddPurPage from "./pages/AddPurPage";
import EditPurPage from "./pages/EditPurPage";
import EditTags from "./components/AdminComp/EditTags";
import Test from "./components/Test";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
  {
    path: ADDPUR_ROUTE,
    Component: AddPurPage,
  },
  {
    path: EDITPUR_ROUTE + "/:id",
    Component: EditPurPage,
  },
  {
    path: EDIT_TAGS_ROUTE,
    Component: EditTags,
  },
  {
    path: EDIT_NEEDS_ROUTE,
    Component: EditTags,
  },
  {
    path: EDIT_FREQS_ROUTE,
    Component: EditTags,
  },
  {
    path: TEST_ROUTE,
    Component: Test,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTER_ROUTE,
    Component: RegisterPage,
  },
  {
    path: PURLIST_ROUTE,
    Component: PurListPage,
  },
];
