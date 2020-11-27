import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../../lib/state/actions";
import useAuthentication from "../../lib/hooks/useAuthentication";

const styles = {
  height: "100vh",
  fontSize: 20,
};
function Success({ history }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.user }));
  const { handleAuthentication } = useAuthentication(dispatch);
  function getUserProfile() {
    return new Promise((resolve) => {
      handleAuthentication();
      resolve();
    });
  }
  function dispatchAndSaveOrder() {
    return new Promise(async (resolve) => {
      const items = localStorage.getItem("items")
        ? JSON.parse(localStorage.getItem("items"))
        : [];
      const total = JSON.parse(localStorage.getItem("total"));
      const order = {
        owner_id: user?._id,
        email: user?.email,
        items: items,
        total: total,
      };
      await dispatch(saveOrder(order));
      resolve();
    });
  }
  function clearStorage() {
    return new Promise((resolve) => {
      localStorage.setItem("items", []);
      resolve();
    });
  }
  function redirectHome() {
    return new Promise((resolve) => {
      setTimeout(() => history.push("/"), 2000);
      resolve();
    });
  }
  useEffect(() => {
    async function confirmOrder() {
      await getUserProfile();
      await dispatchAndSaveOrder();
      await clearStorage();
      await redirectHome();
    }
    confirmOrder();
  }, [user]);
  return (
    <>
      <div
        style={styles}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="alert alert-success mt-3 mb-3">
          <p className="icontext">
            <i className="icon text-success fa fa-thumbs-up"></i>Thank you for
            your order & your payment
          </p>
        </div>
      </div>
    </>
  );
}
export default Success;
