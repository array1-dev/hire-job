import FooterLayout from '../../components/footer'
import NavbarComponent from '../../components/navbar'
import styles from './Profile.module.scss'
import Image from 'next/image'
import { FiMapPin, FiPhone, FiEdit2 } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import useVerify from '../../lib/useVerify'
import { useSelector, useDispatch } from 'react-redux'
import { GetBySlug, GetUserExperience, GetPortfolio, GetSkills, UpdateUser, AddSkill, RemoveSkill, AddExperience, RemoveExperience } from '../../redux/actions/users'
import axios from 'axios'
import useSWR from 'swr'
const urlImage = process.env.NEXT_PUBLIC_URL_IMAGE
const fetcher = url => axios.get(url).then(res => res.data).catch(err => err.response.data);


const ProfileLayout = () => {
    const dispatch = useDispatch()
    const { data, mutateData } = useVerify({})
    let { GetUser, ResponseData, GetSkill, GetPortofolio, GetExperience } = useSelector(state => state.users)
    const { data: token } = useSWR(`/api/auth/token`, fetcher)
    console.log(GetSkill, 'skill');
    console.log(GetPortofolio, 'portofolio');
    console.log(GetExperience, 'exp');
    useEffect(() => {
        dispatch(GetBySlug(data.userSlug))
        dispatch(GetSkills(token?.token))
        dispatch(GetUserExperience(token?.token))
        dispatch(GetPortfolio(token?.token, data.userSlug))
        mutateData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, ResponseData])
    // const user = GetUser?.results[0]?
    // console.log(GetUser)
    const [skill, setSkill] = useState({})
    const [expe, setExpe] = useState({})
    const [formProfile, setFormProfile] = useState({
        userFullName: GetUser?.results[0]?.userFullName,
        address: GetUser?.results[0]?.address,
        jobDesk: GetUser?.results[0]?.jobdesk,
        categories: GetUser?.results[0]?.categories,
        userImage: GetUser?.results[0]?.userImage,
        instagram: GetUser?.results[0]?.instagram,
        github: GetUser?.results[0]?.github,
        gitlab: GetUser?.results[0]?.gitlab,
        userDescription: GetUser?.results[0]?.userDescription,
    })

    // console.log(formProfile)

    const handleProfil = (e) => {
        e.preventDefault()
        const bodyFormData = new FormData()
        bodyFormData.append('userFullName', formProfile.userFullName)
        bodyFormData.append('address', formProfile.address)
        bodyFormData.append('jobDesk', formProfile.jobDesk)
        bodyFormData.append('categories', formProfile.categories)
        bodyFormData.append('userImage', formProfile.userImage)
        bodyFormData.append('userDescription', formProfile.userDescription)
        bodyFormData.append('instagram', formProfile.instagram)
        bodyFormData.append('github', formProfile.github)
        bodyFormData.append('gitlab', formProfile.gitlab)
        dispatch(UpdateUser(token.token, bodyFormData))
    }

    const handleSkill = (e) => {
        e.preventDefault()
        dispatch(AddSkill(token.token, skill))
    }

    const deleteSkill = async (id) => {
        dispatch(RemoveSkill(token.token, id));
    }

    const deleteExpe = async (id) => {
        dispatch(RemoveExperience(token.token, id));
    }

    const handleExpe = (e) => {
        e.preventDefault()
        dispatch(AddExperience(token.token, expe))
    }

    return (<>
        <NavbarComponent />
        <div className={styles.bgPrimary} />
        <div className="container my-5">
            <div className="row">

                <div className="col-lg-4 col-md-5">
                    <div className={`card ${styles.cardDetail}`}>
                        <div className="card-body text-center">
                            <Image src={GetUser?.results[0]?.userImage !== null ? `${urlImage}/${GetUser?.results[0]?.userImage}` : '/img/person.png'} alt="profile img" className="img-circle" width="100" height="100" />
                            <div className={styles.detailPage}>
                                <h3 className={styles.nameDetail}>{GetUser?.results[0]?.userFullName}</h3>
                                <p className={styles.jobDetail}>{GetUser?.results[0]?.jobdesk}</p>
                                <p className={`mb-3 ${styles.pDetail} `}>{GetUser?.results[0]?.categories}</p>
                                <p className={styles.pDetail}><FiMapPin className={styles.iconMap} />{GetUser?.results[0]?.address}</p>
                                <p className={styles.pDetail}><FiPhone className={styles.iconMap} />{GetUser?.results[0]?.userPhone}</p>
                                <p className={` ${styles.pDetail} text-justify`}>{GetUser?.results[0]?.userDescription}</p>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100">Ubah Password</button>
                </div>
                <div className="col-lg-8 col-md-7">
                    <div className={`card ${styles.cardDetail} mb-3`}>
                        <div className="card-header">
                            <h3 className={styles.nameDetail}>Data Diri</h3>
                        </div>
                        <div className="card-body">
                            <form encType='multipart/form-data' onSubmit={(e) => handleProfil(e)}>
                                <div className="form-group">
                                    <label>Nama lengkap</label>
                                    <input type="text" className="form-control" placeholder="Masukan nama lengkap" defaultValue={GetUser?.results[0]?.userFullName} onChange={(e) => setFormProfile(prevData => ({ ...prevData, userFullName: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                    <label>Pekerjaan</label>
                                    <input type="text" className="form-control" placeholder="Masukan pekerjaan" defaultValue={GetUser?.results[0]?.jobdesk} onChange={(e) => setFormProfile(prevData => ({ ...prevData, jobDesk: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                    <label>Jenis pekerjaan</label>
                                    <select className="form-control selectForm" onChange={(e) => setFormProfile(prevData => ({ ...prevData, categories: e.target.value }))} >
                                        {GetUser?.results[0]?.categories === null ? <option>Pilih jenis pekerjaan</option> : <option>{GetUser?.results[0]?.categories}</option>}
                                        <option>Freelance</option>
                                        <option>Fulltime</option>
                                        <option>Part-time</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Domisili</label>
                                    <input type="text" className="form-control" placeholder="Masukan Domisili" defaultValue={GetUser?.results[0]?.address} onChange={(e) => setFormProfile(prevData => ({ ...prevData, address: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                    <label>Foto Profil</label>
                                    <input type="file" className="form-control" placeholder="Masukan foto profil" onChange={(e) => setFormProfile(prevData => ({ ...prevData, userImage: e.target.files[0] }))} />
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Instagram</label>
                                            <input type="text" className="form-control" placeholder="Masukan Instagram" defaultValue={GetUser?.results[0]?.instagram} onChange={(e) => setFormProfile(prevData => ({ ...prevData, instagram: e.target.value }))} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Github</label>
                                            <input type="text" className="form-control" placeholder="Masukan Github" defaultValue={GetUser?.results[0]?.github} onChange={(e) => setFormProfile(prevData => ({ ...prevData, github: e.target.value }))} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Gitlab</label>
                                            <input type="text" className="form-control" placeholder="Masukan Gitlab" defaultValue={GetUser?.results[0]?.gitlab} onChange={(e) => setFormProfile(prevData => ({ ...prevData, gitlab: e.target.value }))} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Deskripsi singkat</label>
                                    <textarea className="form-control" rows="3" placeholder="Masukan deskripsi singkat" onChange={(e) => setFormProfile(prevData => ({ ...prevData, userDescription: e.target.value }))} >{GetUser?.results[0]?.userDescription}</textarea>
                                </div>
                                <div className="form-group text-end my-3">
                                    <button className="btn btn-secondary btn-secondary-mobile" onClick={(e) => handleProfil(e)}>Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={`card ${styles.cardDetail} my-3`}>
                        <div className="card-header">
                            <h3 className={styles.nameDetail}>Skill</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => handleSkill(e)}>
                                <div className="row d-flex align-items-center">
                                    <div className="col-lg-9 col-md-12">
                                        <div className="form-group">
                                            <label>Skill</label>
                                            <input type="text" className="form-control" placeholder="Masukan skill" onChange={(e) => setSkill(prevData => ({ ...prevData, skillName: e.target.value }))} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-12">
                                        <div className="form-group">
                                            <button className="btn btn-secondary marginBtn btn-secondary-mobile">Simpan</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row my-3 rowSkill w-80">
                                {!GetSkill.length ? 'no data' : GetSkill?.map((item, index) => (
                                    <div className="col-3" key={index}>
                                        <button className="btn btnSkill">{item.skillName} <a type='button' onClick={() => deleteSkill(item.skill_id)}><BsTrash /></a></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`card ${styles.cardDetail} my-3`}>
                        <div className="card-header">
                            <h3 className={styles.nameDetail}>Pengalaman Kerja</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => handleExpe(e)}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Nama perusahaan</label>
                                            <input type="text" className="form-control" placeholder="Masukan nama perusahaan" onChange={(e) => setExpe(prevData => ({ ...prevData, experiencePlace: e.target.value }))} required />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Posisi</label>
                                            <input type="text" className="form-control" placeholder="web developer" onChange={(e) => setExpe(prevData => ({ ...prevData, experienceName: e.target.value }))} required />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Tanggal masuk</label>
                                            <input type="date" className="form-control" onChange={(e) => setExpe(prevData => ({ ...prevData, experienceIn: e.target.value }))} required />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Tanggal keluar</label>
                                            <input type="date" className="form-control" onChange={(e) => setExpe(prevData => ({ ...prevData, experienceOut: e.target.value }))} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Deskripsi singkat</label>
                                    <textarea className="form-control" rows="3" placeholder="Masukan deskripsi singkat pekerjaan" onChange={(e) => setExpe(prevData => ({ ...prevData, experienceDescription: e.target.value }))} required></textarea>
                                </div>
                                <div className="form-group text-end my-3">
                                    <button className="btn btn-secondary w-100 btn-secondary-mobile">Simpan</button>
                                </div>
                            </form>
                            <hr />
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nama perusahaan</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!GetExperience.length ? 'no data' : GetExperience?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.experiencePlace}</td>
                                            <td><a type='button'><FiEdit2 /></a>{' '}<a type='button' onClick={() => deleteExpe(item.experienceId)}><BsTrash /></a></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={`card ${styles.cardDetail} my-3`}>
                        <div className="card-header">
                            <h3 className={styles.nameDetail}>Portofolio</h3>
                        </div>
                        <div className="card-body">
                            <form encType='multipart/form-data' onSubmit={(e) => handlePortfolio(e)}>
                                <div className="form-group">
                                    <label>Nama Aplikasi</label>
                                    <input type="text" className="form-control" placeholder="Nama Aplikasi" required />
                                </div>
                                <div className="form-group">
                                    <label>Link Repository</label>
                                    <input type="text" className="form-control" placeholder="Link Repository" required />
                                </div>
                                <div className="form-group">
                                    <label>Upload Gambar</label>
                                    <input type="file" className="form-control" />
                                </div>
                                <div className="form-group text-end my-3">
                                    <button className="btn btn-secondary w-100 btn-secondary-mobile">Simpan</button>
                                </div>
                            </form>
                            <hr />
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nama Aplikasi</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!GetPortofolio.length ? 'no data' : GetPortofolio?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.portfolioName}</td>
                                            <td><a type='button'><FiEdit2 /></a>{' '}<a type='button'><BsTrash /></a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterLayout />
    </>)
}

export default ProfileLayout