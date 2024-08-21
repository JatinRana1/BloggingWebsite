import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/authSchema";
import { login } from "../../api/api";

export const Login = () => {

    interface formValues{
        email: string;
        password: string;
    }

    const initialValues: formValues = {
        email: "",
        password: ""
    }

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues,
        validationSchema: loginSchema, 
        onSubmit: (formData) => {
            const data = login(formData)
            console.log(data);
        }
    })

    return(<div className="login row">
        <h1>LOGIN FORM</h1>
        <form className="m-3" onSubmit={handleSubmit}>
            <div className="mb-3 col-md-6">
                <label className="form-label" htmlFor="emailInput">Email: </label>
                <input className={`form-control ${touched.email && errors.email ? "is-invalid" : ''} ${touched.email && !errors.email ? 'is-valid' : ''} `} id="emailInput" type="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email}/>
                { touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div> }
            </div>
            <div className="mb-3 col-md-6">
                <label className="form-label" htmlFor="passwordInput">Password: </label>
                <input className={`form-control ${touched.password && errors.password ? "is-invalid" : ''} ${touched.password && !errors.password ? 'is-valid' : ''} `} id="passwordInput" type="password" name="password" onBlur={handleBlur} onChange={handleChange}/>
                { touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div> }
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
    )
}