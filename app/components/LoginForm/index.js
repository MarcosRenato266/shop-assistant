import React from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import { withFormik } from "formik";
import WithApolloClient from "../../libs/with-apollo-client";
import Auth from "../../libs/auth";
import yup from "../../libs/yup";

// Form Validation
const formikEnhancer = withFormik({
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email(11)
      .required("Digite seu Email"),
    password: yup
      .string()
      .min(3)
      .required("Digite sua Senha")
  }),
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  handleSubmit: (values, { apolloClient, setStatus, setSubmitting }) => {
    const { email, password } = values;
    if (email && password) {
      Auth.loginRequest(email, password)
        .then(response => {
          Auth.login(response.data, apolloClient, "/dashboard");
        })
        .catch(error => {
          if (error && error.response && error.response.status === 401) {
            openNotificationWithIcon("error", "Email e(ou) Senha Inválidas.");
            setStatus({ errorMessage: "Email ou Senha errados" });
          } else {
            openNotificationWithIcon(
              "error",
              "Nossos Serviços estão temporáriamente indisponíveis. Tente novamente mais tarde"
            );
            setStatus({ errorMessage: "Tente mais tarde" });
          }
          setSubmitting(false);
        });
    }
  },
  displayName: "LoginForm"
});

// Antd Notification
const openNotificationWithIcon = (type, description) => {
  notification[type]({
    message: "Ops! Algo deu Errado",
    description: description
  });
};

function index(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;


  // Validate Fields function
  function getValidateStatus(param) {
    return errors[param] && touched[param]
      ? "error"
      : touched[param]
      ? "success"
      : "";
  }

  // Handle pre submit
  function handleFormSubmit() {
    const { email, password } = values;
    if (email && password) {
      Object.entries(errors).length === 0
        ? props.submitForm()
        : openNotificationWithIcon("error", "Verifique os campos assinalados.");
    } else {
      props.setFieldTouched("cpf");
      openNotificationWithIcon("error", "Verifique os campos assinalados.");
    }
  }

  // Handle enter to submit form
  function handleEnterToSubmit(key) {
    key === "Enter" && handleFormSubmit();
  }

  return (
    <Form>
      <Form.Item hasFeedback validateStatus={getValidateStatus("email")}>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyPress={e => handleEnterToSubmit(e.key)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={handleFormSubmit}
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isSubmitting}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default WithApolloClient(formikEnhancer(index));
