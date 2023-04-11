import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Detail } from "./components/Detail/Detail";
import { Transaccion } from "./pages/mercadoPagoTesting/mpLink";
// import { DiscountManager } from "./components/discountManager/DiscountManager";
import { PaymentFailed } from "./pages/paymentFailed/PaymentFailed";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { getListUsers, saveNewUser } from "./redux/actions/userAction";
import {
  getTopRatedProducts,
  setGlobalDiscount,
} from "./redux/actions/productAction";
import { setAutoGlobalDiscount } from "./redux/reducer/productReducer";
import { DashboardUser } from "./components/Dashboard/Users/DashboardUser";
import { DashboardProducts } from "./components/Dashboard/ProductsList/DashboardProducts";
import WishList from "./pages/WishList/WishList";
import "./App.css";
import { Friends } from "./pages/Friends/Friends";
import Library from "./pages/library/Library";
import { DashboardSales } from "./components/Dashboard/Sales/DashboardSales";
import NavbarPhone from "./phone/navBarPhone/navBarPhone";
import { saveUserInGlobalState } from "./redux/reducer/userReducer";
import { CheckOut } from "./pages/CheckOut/CheckOut";
import { NavbarResponsive } from "./components/NavbarResponsive/NavbarResponsive";

function App() {
  const { user, isAuthenticated }: any = useAuth0();
  const dispatch = useAppDispatch();
  const [nameProductSearch, setNameProductSearch] = useState<string>("");
  const userEmail = user?.email;
  const listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );
  let discountGloballyApplied = useAppSelector(
    (state) => state.productReducer.discountGloballyApplied
  );
  let adminDiscount = useAppSelector(
    (state) => state.productReducer.adminDiscount
  );
  console.log("para borrar");
  const admin = listUsersData.find((item) => item.email === userEmail);

  useEffect(() => {
    dispatch(
      saveUserInGlobalState({
        user,
        isAuthenticated,
      })
    );
  }, [user]);

  useEffect(() => {
    dispatch(getTopRatedProducts());
    dispatch(getListUsers());
  }, []);

  useEffect(() => {
    if (!discountGloballyApplied && !adminDiscount) {
      dispatch(setGlobalDiscount());
      dispatch(setAutoGlobalDiscount(true));
    }
  }, [discountGloballyApplied]);

  useEffect(() => {
    if (user !== undefined) {
      dispatch(saveNewUser(user.email, user.name, user.picture));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavbarResponsive />
                <Home />
              </>
            }
          />

          <Route
            path="/products"
            element={
              <>
                <NavbarResponsive />
                <Products />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <NavbarResponsive />
                <CheckOut />
              </>
            }
          />
          <Route
            path="/mptest"
            element={
              <>
                <NavbarResponsive />
                <Transaccion />
              </>
            }
          />
          <Route
            path="/friends"
            element={
              <>
                <NavbarResponsive />
                <Friends />
              </>
            }
          />
          <Route
            path="/failure"
            element={
              <>
                <NavbarResponsive />
                <PaymentFailed />
              </>
            }
          />
          <Route
            path="/wish"
            element={
              <>
                <NavbarResponsive />
                <WishList />
              </>
            }
          />
          <Route
            path="/library"
            element={
              <>
                <NavbarResponsive />
                <Library />
              </>
            }
          />
          <Route
            path="/phone"
            element={
              <>
                <NavbarResponsive />
                <NavbarPhone />
              </>
            }
          />
          <Route
            path="/:id"
            element={
              <>
                <NavbarResponsive />
                <Detail />
              </>
            }
          />
          {admin?.admin && (
            <>
              <Route path="/users" element={<DashboardUser />} />
              <Route path="/productsList" element={<DashboardProducts />} />
              <Route path="/sales" element={<DashboardSales />} />
              {/* <Route path="/discMan" element={<DiscountManager />} /> */}
            </>
          )}
        </Routes>
        <Outlet />
      </div>
    </BrowserRouter>
  );
}

export default App;
