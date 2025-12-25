// CsvTable.jsx
import { useEffect, useState } from "react";
import Papa from "papaparse";

const CsvTable = ({ src }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: true });
        setData(parsed.data.filter(row => Object.values(row).some(Boolean)));
      });
  }, [src]);

  if (!data.length) return null;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvTable;
