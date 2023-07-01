import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/api/AuthSlice ";
const Register = () => {
  const [register] =useRegisterMutation();
  const navigate = useNavigate();
  const initialValue = {
    name: '',
    email: '',
    password : ''
  }
  const ValidationSchema = Yup.object({
    name: Yup.string().required("enter your name "),
    email: Yup.string().required("enter your email "),
    password: Yup.string().required("enter your password ")
  })
  const handleSubmit = (values) => {
    console.log(values);
    register({
      name: values.name,
      email: values.email,
      password : values.password
    }).then(() => { navigate('/Login')})
    .catch( (error) => {
      console.log(error)
    })
  }
  return (
    <div className="  bg-blue-800 md:w-3/4 lg:w-1/2 shadow p-10 rounded-md">
      <p className="text-3xl p-3 my-3 text-white">SING UP  </p>
      <div>
        <Formik
          initialValues={initialValue}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-3 space-y-4">
            <Field className="p-3 text-base w-full rounded shadow" type="text" name="name" placeholder="Enter name" />
            <ErrorMessage name="name" component="div" className="text-red-500"/>
            <Field className="p-3 text-base w-full rounded shadow" type="textarea" name="email" placeholder="Enter email" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
            <Field className="p-3 text-base w-full rounded shadow" type="text" name="password" placeholder="Enter password" />
            <ErrorMessage name="password" component="div" className="text-red-500" />
            <button type="submit" className="p-3 text-base w-full rounded shadow bg-yellow-500 text-blue-800 hover:bg-yellow-400 font-semibold">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register