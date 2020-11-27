import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormValidation } from "../../lib/hooks/useFormValidation";
import useAuthentication from "../../lib/hooks/useAuthentication";
import { setDelivery } from "../../lib/state/actions";

import * as Input from "../Auth/Input";
import Payment from "./Payment";
import DeliveryBox from "./DeliveryBox";

const defaultValues = {
  delivery: "standard",
  address: "",
};

const options = ["Canada", "Russia", "United States", "India", "Afganistan"];
const Checkout = () => {
  const dispatch = useDispatch();
  const { handleAuthentication } = useAuthentication(dispatch);
  const { user } = useSelector((state) => ({ ...state.user }));
  const { delivery } = useSelector((state) => ({ ...state.cart }));
  const { first, last, email, address, country, city } = user ?? {};
  const {
    formValues,
    validate,
    register,
    handleOnChange,
    isValid,
  } = useFormValidation({
    formName: "checkout",
    defaultValues: { ...user, ...defaultValues },
  });

  React.useEffect(() => register({ ...user, ...defaultValues }), [user]);
  React.useEffect(() => {
    validate(formValues["checkout"] ?? {});
  }, [formValues]);

  React.useEffect(() => {
    handleAuthentication();
  }, [user]);

  const handleDeliveryOnChange = (e, value) => {
    handleOnChange(e, value);
    dispatch(setDelivery(value));
  };

  return (
    <>
      <section
        className="section-content padding-y"
        style={{ margin: "100px auto", maxWidth: "720px" }}
      >
        <div className="container">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title mb-3">Delivery info</h4>

              <div className="form-row">
                <div className="form-group col-sm-6">
                  <DeliveryBox
                    title="standard"
                    value={delivery}
                    message="Free by airline within 20 days"
                    onChange={(e) => handleDeliveryOnChange(e, "standard")}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <DeliveryBox
                    title="fast"
                    value={delivery}
                    message="Extra 20$ will be charged"
                    onChange={(e) => handleDeliveryOnChange(e, "fast")}
                  />
                </div>
              </div>

              <div className="form-row">
                <Input.Text
                  label="First name"
                  name="first"
                  value={first}
                  onChange={handleOnChange}
                />
                <Input.Text
                  label="Last name"
                  name="last"
                  value={last}
                  onChange={handleOnChange}
                />
              </div>

              <div className="form-row">
                <Input.Email
                  label="Email"
                  value={email}
                  onChange={handleOnChange}
                  col="6"
                />
              </div>
              <div className="form-row">
                <Input.Select
                  name="country"
                  options={options}
                  value={country}
                  label="Country"
                  col="6"
                  onChange={handleOnChange}
                />
                <Input.Text
                  label="City"
                  name="city"
                  value={city}
                  onChange={handleOnChange}
                />
              </div>
              <Input.TextArea
                label="Address"
                name="address"
                value={address}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-row" style={{ padding: "0 25px 30px" }}>
              <Payment isValid={!isValid} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Checkout;
