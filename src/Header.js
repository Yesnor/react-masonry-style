import { useContext, useState, useEffect } from "react";
import { context } from "./context";

export default function Header() {
  const { dispatch } = useContext(context);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch({ type: "filter_photos", payload: filter });
    // eslint-disable-next-line
  }, [filter]);
  return (
    <header className="d-flex justify-content-between align-items-center mb-5">
      <div className="flex-centered header-left">
        <h5 className="flex-centered">
          <span className="material-icons">account_box</span>splash
        </h5>
        <div
          className="form-group position-relative"
          style={{ marginLeft: "1rem" }}
        >
          <span
            className="material-icons position-absolute"
            style={{ color: "grey", left: "10px", top: "10px" }}
          >
            search
          </span>
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search by name"
            style={{ paddingLeft: "40px" }}
            value={filter}
            onChange={(e) => {
              setFilter((prev) => (prev = e.target.value));
            }}
          />
        </div>
      </div>
      <button
        className="btn btn-success rounded"
        data-bs-toggle="modal"
        data-bs-target="#addPhoto"
      >
        Add photo
      </button>
    </header>
  );
}
