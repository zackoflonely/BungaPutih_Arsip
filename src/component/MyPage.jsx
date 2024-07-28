import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox,HiHome } from 'react-icons/hi';
import img from '../assets/logo-kukar.png';
import img2 from '../assets/logo-kkn.png';
import img3 from '../assets/logo-unmul.png';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function MyPage({isOpen}) {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  const logOut = () => {
    Swal.fire({
      title: "Anda yakin untuk Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/");
        Swal.fire({
          title: "Keluar Berhasil",
          icon: "success",
        });
      }
    });
  }
  useEffect(() => {
    getKlasifikasi();
    window.scrollTo(0, 0);
  }, []); 
  const [getKonten,setKonten]= useState([]);
  const getKlasifikasi = async () => {
      const response = await Axios.get(`${import.meta.env.VITE_API}/api/klasifikasi`);
      setKonten(response.data);
    };
  return (
    <div>
    <Sidebar aria-label="Default sidebar example" className={`overflow-y-auto fixed top-0 ${isOpen ? 'block' : 'w-0 hidden'}`}>
      <Sidebar.Items className='w-46'>
        <div className='flex justify-center items-center my-3'>
          <img src={img2} className='h-8' alt="" />
          <img src={img3} className='h-8' alt="" />
          <h1 className='text-left ml-3 text-xs font-semibold'>KKN 50 UNIVERSITAS MULAWARMAN KUKAR 68</h1>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex justify-center'>
            <img src={img} className='h-32' alt="" />
          </div>
          <h1 className='text-md font-bold'>Pemerintah Desa Bunga Putih</h1>
          <h2 className='text-md font-semibold'>Kecamatan Marangkayu</h2>
        </div>
        <Sidebar.ItemGroup className='text-left'>
          <Sidebar.Item icon={HiHome}>
            <Link to="/">Dashboard</Link>           
          </Sidebar.Item>
          <Sidebar.Collapse className='' icon={HiChartPie} label="Surat">
            {getKonten.map((item, idx)=>(
              <Sidebar.Item key={idx}><Link to={`/jenis/${item.ID_Klasifikasi}`}>{item.ID_Klasifikasi}</Link></Sidebar.Item>
            ))}
          </Sidebar.Collapse>
          <Sidebar.Item icon={HiInbox}><Link to="/klasifikasi">Jenis</Link></Sidebar.Item>
          {isLoggedIn?(
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              <div onClick={logOut} className='text-red-500 font-bold'>
                Keluar
              </div>
            </Sidebar.Item>
          ):(
            <Sidebar.Item icon={HiArrowSmRight}>
              <Link to='/login' className='text-green-500 font-bold'>
                Masuk
              </Link>
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}
MyPage.propTypes = {
  isOpen: PropTypes.bool.isRequired
};