import axios from "axios";
import { Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRowSelect from "../component/FormRowSelect";
const options = {
  method: "GET",
  url: "https://football-web-pages1.p.rapidapi.com/league-table.json",
  params: {
    comp: "1",
    team: "1",
  },
  headers: {
    "X-RapidAPI-Key": "e465b7d92fmshf0c7606243d06ddp1dadf1jsnad8bb78b5bed",
    "X-RapidAPI-Host": "football-web-pages1.p.rapidapi.com",
  },
};
const leagues = [
  "ترتيب الدوري الإنجليزي",
  "ترتيب الدوري المصري",
  "ترتيب الدوري السعودي",
  "ترتيب الدوري الألماني",
  "ترتيب الدوري الفرنسي",
];
const Stats = () => {
  const fetchPremierLeagueTables = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Leagues</h4>
        <div className="form-center">
          <FormRowSelect
            list={leagues}
            name="Tables"
            labelText="Tables"
            defaultValue="ترتيب الدوري الفرنسي"
          />
          {/* {leagues.map((league, index) => {
            return (
              <button key={index} className="btn">
                {league}
              </button>
            );
          })} */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default Stats;
