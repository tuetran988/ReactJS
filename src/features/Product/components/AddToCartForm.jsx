import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@material-ui/core";
import InputField from "../../../components/form-controls/InputField";
import QuantityField from "../../../components/form-controls/QuantityField";

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required()
      .min(2, "least min quantity equals 2")
      .typeError("please enter number"),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="quantity" form={form} />
      <Button type="submit" variant="outlined" size="small" color="primary">
        Add To Cart
      </Button>
    </form>
  );
}

export default AddToCartForm;
