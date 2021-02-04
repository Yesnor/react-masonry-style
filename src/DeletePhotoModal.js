import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { context } from "./context";

export default function DeletePhotoModal({ id }) {
  const [password, setPassword] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const { dispatch } = useContext(context);

  const deletePhoto = (e) => {
    e.preventDefault();
    if (password) {
      console.log(id);
      axios
        .delete("/deletePhoto", {
          data: { id, password },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            axios.get("/getAll").then((res) => {
              dispatch({
                type: "fetch_all_photos",
                payload: res.data.reverse(),
              });
            });
            setIsDeleted(true);
          } else {
            console.log(res.status);
          }
        })
        .catch((err) => console.log("error", err));
    }
  };

  useEffect(() => {
    if (isDeleted) {
      window.location.reload();
    }
  }, [isDeleted, dispatch]);

  return (
    <div className="modal fade" id="deletePhoto" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">
              {isDeleted ? "Deleted!" : "Are you sure?"}
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setPassword("");
                setIsDeleted(false);
              }}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group mb-3">
                <label>
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  required
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword((prev) => (prev = e.target.value));
                  }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              value="Cancel"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setPassword("");
                setIsDeleted(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={deletePhoto}
              className="btn btn-danger"
              disabled={isDeleted}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
