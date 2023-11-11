import { useEffect } from 'react';
import { District, Province, Regencie, Village } from '../interfaces/Emsifa';

import Prism from 'prismjs';
import '../prism.css';

interface Props {
  title: string;
  data: Province[] | Regencie[] | District[] | Village[];
  endpoint: string;
  fetchData?: (id: string) => Promise<void>;
}

export default function Card({ title, data, fetchData, endpoint }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, [data]);

  return (
    <>
      {data.length !== 0 && (
        <div className="mt-10 border border-gray-500 relative">
          <div className="flex items-center h-32">
            <pre className="w-3/5 h-32">
              <div className="border border-violet-500 w-fit px-2 text-violet-200 mb-2  ">Fetch</div>
              <code className="language-js max-w-full">
                {`fetch(${endpoint})
.then(response => response.json())
.then(regencies => console.log(regencies));
`}
              </code>
            </pre>
            <span className="w-[1px] h-32 bg-gradient-to-t from-transparent  via-gray-500 to-transparent rounded-full "></span>
            <pre className="w-2/5 h-32">
              <div className="border border-violet-500 w-fit px-2 text-violet-200 mb-2  ">JSON</div>
              <code className="language-json">{JSON.stringify(data)}</code>
            </pre>
          </div>
          <div className="p-5">
            <label htmlFor="province" className="text-2xl text-white">
              Pilih {title}
            </label>
            <select id="province" className="w-full border bg-transparent border-gray-500 text-white py-2 px-3 mt-2">
              <option> </option>
              {data &&
                data.map(province => (
                  <option key={province.id} value={province.name} onClick={() => fetchData && fetchData(province.id)}>
                    {province.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
}
