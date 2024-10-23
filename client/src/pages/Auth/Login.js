import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast'
import axios from 'axios'
import '../../styles/AuthStyle.css'
import { useNavigate ,useLocation} from 'react-router-dom';
import { AuthContext } from '../../context/auth';


export default function Login() {

    const useAuth = useContext(AuthContext)
    const { auth, setAuth } = useAuth

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const location=useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                })
                localStorage.setItem("auth",JSON.stringify(res.data))
                navigate(location.state || "/");

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Layout title="Login-RajKart">
                <div className="form-container" >
                    <form onSubmit={handleSubmit}>
                        <h4 className="title">LOGIN FORM</h4>

                        <div className="mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Email "
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>

                        <div className="mb-3">

                        <button type="submit" className="pnf-btn">
                            LOGIN
                        </button>
                        </div>
                        <button type="button" className="pnf-btn" onClick={()=>{navigate('/forgot-password')}}>
                            Forgot Password
                        </button>

                    </form>
                </div>
            </Layout>
        </>
    )
}

