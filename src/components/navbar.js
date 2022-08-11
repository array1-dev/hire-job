import Image from "next/image"
import Link from "next/link"
import { BiEnvelope } from 'react-icons/bi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { useRouter } from 'next/router'
import useVerify from "../lib/useVerify"
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from "swr"
import { useEffect } from "react"

const urlWeb = process.env.NEXT_PUBLIC_URL_IMAGE
const urlAPI = process.env.NEXT_PUBLIC_URL_API
const fetcher = url => axios.get(url).then(res => res.data).catch(err => err.response.data);


const NavbarComponent = () => {
    const router = useRouter()
    const { data, mutateData } = useVerify();
    const { data: token } = useSWR("/api/auth/token", fetcher)
    const { data: notif } = useSWR(`/api/notification?token=${token?.token}`, fetcher, { refreshInterval: 3000 })
    console.log(notif)

    const handleClick = async () => {
        await axios({
            method: "PATCH",
            url: `${urlAPI}/notification/`,
            headers: {
                Authorization: `Bearer ${token?.token}`
            }
        }).then(res => {
            toast.success("Notification has been read", { position: "top-left", autoClose: 2000, hideProgressBar: false, pauseOnHover: true, draggable: true, progress: undefined });
            router.push('/notification')
        })
    }

    const handleLogout = () => {
        axios({
            method: "GET",
            url: `/api/auth/logout`,
        }).then
            (res => {
                if (res.data.success) {
                    toast.success(`You have been logout!`, {
                        position: "top-left",
                        autoClose: 1500,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    mutateData()

                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (<>
        <div className="bg-white box-shadowNavbar">
            <div className="container">
                <nav className="navbar">
                    <div className="container">
                        <Link href='/'><a className="navbar-brand">
                            <Image src='/img/logo/logopurple.svg' alt="logo" width="90" height="38" />
                        </a></Link>
                        <div className="d-flex">
                            {data?.isLoggedIn ? (<>
                                <div className="iconNavbar d-flex align-items-center justify-content-center mx-4">
                                    <a type="button"><IoIosNotificationsOutline onClick={() => handleClick()} className="fs-3 mx-3" /></a>
                                    {notif?.unread < 1 || notif?.unread == undefined ? '' : (<>
                                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger notip">
                                            {notif?.unread}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </>)}
                                    <Link href={'/chat'}><a><BiEnvelope className="fs-3 mr-3" /></a>
                                    </Link>
                                </div>
                                <div className="dropdown">
                                    <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Image src={data.userImage === null ? '/img/person.png' : `${urlWeb}/${data.userImage}`} alt="profile img" className="img-circle" width="28" height="28"></Image>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link href={'/home'}><a className="dropdown-item">Home</a></Link></li>
                                        <li><Link href={'/profile'}><a className="dropdown-item">Profile</a></Link></li>
                                        <li><a type="button" className="dropdown-item" onClick={() => handleLogout()}>Logout</a></li>
                                    </ul>
                                </div>
                            </>) : (<>
                                <div className="navbarBtn">
                                    <Link href={'/auth'}><button className="btn btn-light mx-3">Masuk</button></Link>
                                    <Link href={'/auth/signup'}><button className="btn btn-primary">Daftar</button></Link>
                                </div>
                            </>)}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </>
    )
}

export default NavbarComponent