import { useState, useContext } from "react";
import axios from "axios";
import { context } from "./context";

export default function AddPhotoModal() {
  const { dispatch } = useContext(context);
  const [photoUrl, setPhotoUrl] = useState("");
  const [label, setLabel] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const clearInputs = () => {
    setPhotoUrl((prev) => (prev = ""));
    setLabel((prev) => (prev = ""));
    setIsAdded(false);
  };
  const validateUrl = (url) => {
    url.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    );
  };
  const addPhoto = (e) => {
    e.preventDefault();
    const photo = { photoUrl, label };
    if (validateUrl(photo.photoUrl)) {
      axios.post(`http://localhost:8000/addPhoto`, photo);
      dispatch({ type: "add_photo", payload: photo });
      setIsAdded(true);
    } else {
      console.log("not an url", photoUrl);
    }
  };

  return (
    <div className="modal fade" id="addPhoto" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">
              {" "}
              {isAdded ? "Photo added successfully!" : "Add a new photo"}{" "}
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                clearInputs();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group mb-3">
                <label>
                  <strong>Label</strong>
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Photo URL</strong>
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                clearInputs();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={addPhoto}
              disabled={isAdded}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
