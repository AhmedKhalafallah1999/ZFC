import { FormRow, FormRowSelect } from "./index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useNavigation, Form, Link } from "react-router-dom";
import { POST_SORT_BY } from "../../../utils/constants";
const SearchContainer = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow type="search" name="search" defaultValue="" />
          <FormRowSelect
            name="sort"
            defaultValue="newest"
            list={[...Object.values(POST_SORT_BY)]}
          />

          <Link to="/dashboard/all-fans" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "searching" : "search"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
