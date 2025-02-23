import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableData from "../../Table";
import { faMailBulk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Button } from "flowbite-react";

function SuratMasuk(){
    const { id } = useParams();
    const [getKonten,setKonten]= useState([]);
    const [getTahun,setTahun]= useState([]);
    const [getData,setData]= useState('');
    const getSurat = async () => {
        const response = await Axios.get(`${import.meta.env.VITE_API}/jenis/${id}/${getData}`);
        setKonten(response.data);
    };
    console.log(getData);
    const getTahunSurat = async () => {
        const response = await Axios.get(`${import.meta.env.VITE_API}/api/tahun`);
        setTahun(response.data);
        };
    useEffect(() => {
        getSurat();
        getTahunSurat();
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData,id]); 
    return(
        <div>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Tahun Surat</InputLabel>
                <Select
                label="Tahun"
                value={getData}
                onChange={(e) => setData(e.target.value)}
                >
                {getTahun.map((item,idx)=>(
                    <MenuItem key={idx} value={item.Tahun}>{item.Tahun}</MenuItem>
                ))}
                </Select>
            </FormControl>
            <h1 className="w-full my-3 text-left text-3xl font-semibold font-mono">
                <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faMailBulk}/> {id}
            </h1>
            <Link to='/upload'>
                <Button color="light" className="my-2 bg-white border-lg-black text-black hover:font-bold font-base"><FontAwesomeIcon style={{ fontSize: '0.8em', marginRight:'3px' }} icon={faPlus} />Surat</Button>
            </Link>
            <TableData getKonten={getKonten}/>
        </div>
    )
}

export default SuratMasuk;