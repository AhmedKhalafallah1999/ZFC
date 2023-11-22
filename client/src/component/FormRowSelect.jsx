import axios from "axios";
import { useState } from "react";
import LeagueTable from "./LeagueTable";
const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [showTableName, setShowTableName] = useState("");
  const [tableData, setTableData] = useState([]);
  const onChangeLeague = (e) => {
    const value = e.target.value;
    // console.log(value);
    if (value === "ترتيب الدوري الإنجليزي") {
      setShowTable(true);
      setShowTableName("ترتيب الدوري الإنجليزي");

      const options = {
        method: "GET",
        url: "https://premier-league-standings1.p.rapidapi.com/",
        headers: {
          "X-RapidAPI-Key":
            "e465b7d92fmshf0c7606243d06ddp1dadf1jsnad8bb78b5bed",
          "X-RapidAPI-Host": "premier-league-standings1.p.rapidapi.com",
        },
      };
      fetchSelectedLeague(options);
    } else {
      setShowTable(false);
    }
  };
  const fetchSelectedLeague = async (options) => {
    try {
      const { data } = await axios.request(options);
      setTableData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={name === "Tables" ? "custom" : ""}>
      <header>
        <div className="form-row">
          <label htmlFor={name} className="form-label">
            {labelText || name}
          </label>
          <select
            name={name}
            id={name}
            className="form-select"
            defaultValue={defaultValue}
            onChange={onChangeLeague}
          >
            {list.map((itemValue) => {
              return (
                <option key={itemValue} value={itemValue}>
                  {itemValue}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <section className="custom-section">
        {showTable && showTableName === "ترتيب الدوري الإنجليزي" && (
          <LeagueTable Data={tableData} />
        )}
      </section>
    </div>
  );
};
export default FormRowSelect;
