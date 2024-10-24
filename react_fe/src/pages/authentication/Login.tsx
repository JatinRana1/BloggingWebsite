import { useFormik } from "formik";
import { loginSchema } from "../../schema/authSchema";
import { login} from "../../api/api";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../slice/authSlice";
import '../../styles/shadow/form-shadow.scss';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    interface formValues{
        email: string;
        password: string;
    }

    const initialValues: formValues = {
        email: "",
        password: ""
    }

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, setErrors } = useFormik({
        initialValues,
        validationSchema: loginSchema, 
        onSubmit: async (formData) => {
            try {
                const data = await login(formData, {
                    withCredentials: true
                })
                
                const token = data.data.token;

                if(token){
                    const user = jwtDecode(token);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    dispatch(setUser({userData: user}));
                    navigator('/');
                }
                
                
            } catch (error) {
                const AxiosError = error as AxiosError
                if(AxiosError.response && AxiosError.response.data){
                    setErrors(AxiosError.response.data)
                }else{
                    console.error('An Error occurred: ', AxiosError.message)
                }
            }
        }
    })

    return(<div className="d-flex justify-content-center align-items-center container vh-100">
        <form className="form-shadow rounded p-5" onSubmit={handleSubmit}>
            <h1 className="text-center py-4">Login</h1>
            <div className="mb-3">
                <label className="form-label" htmlFor="emailInput">Email: </label>
                <input className={`form-control ${touched.email && errors.email ? "is-invalid" : ''} ${touched.email && !errors.email ? 'is-valid' : ''} `} id="emailInput" type="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email}/>
                { touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div> }
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="passwordInput">Password: </label>
                <input className={`form-control ${touched.password && errors.password ? "is-invalid" : ''} ${touched.password && !errors.password ? 'is-valid' : ''} `} id="passwordInput" type="password" name="password" onBlur={handleBlur} onChange={handleChange}/>
                { touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div> }
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
    )
}