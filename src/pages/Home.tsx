import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import '../prism.css';
import { District, Province, Regencie, Village } from '../interfaces/Emsifa';
import Card from '../components/Card';

export default function Home() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regencie[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  const getProvince = async () => {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`);
    const data = await res.json();

    setProvinces(data);
  };

  const getRegencies = async (id: string) => {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`);
    const data = await res.json();

    setRegencies(data);
  };

  const getDistricts = async (id: string) => {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`);
    const data = await res.json();

    setDistricts(data);
  };

  const getVillages = async (id: string) => {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`);
    const data = await res.json();

    setVillages(data);
  };

  useEffect(() => {
    getProvince();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [regencies, districts, villages]);

  return (
    <div className="bg-[#1f2028] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <h1 className="text-4xl text-gray-300">
          API STATIS <span className="block font-semibold text-violet-400">DATA WILAYAH INDONESIA</span>
        </h1>

        <Card
          data={provinces}
          title="Provinsi"
          key="Provinsi"
          fetchData={getRegencies}
          endpoint="`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`"
        />
        <Card
          data={regencies}
          title="Kab/Kota"
          key="Kab/Kota"
          fetchData={getDistricts}
          endpoint="`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`"
        />
        <Card
          data={districts}
          title="Kecamatan"
          key="Kecamatan"
          fetchData={getVillages}
          endpoint="`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`"
        />
        <Card
          data={villages}
          title="Keluarahan"
          key="Keluarahan"
          endpoint="`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`"
        />
      </div>
    </div>
  );
}
