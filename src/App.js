import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "./Header";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import AddPhotoModal from "./AddPhotoModal";
import DeletePhotoModal from "./DeletePhotoModal";
import { context } from "./context";

function App() {
  const [deleteId, setDeleteId] = useState("");
  const { state, dispatch } = useContext(context);

  useEffect(() => {
    axios.get("/api/getAll").then((res) => {
      console.log(res.data, "get all received");
      dispatch({ type: "fetch_all_photos", payload: res.data.reverse() });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header />
      <AddPhotoModal />
      <DeletePhotoModal id={deleteId} />
      <ResponsiveMasonry>
        <Masonry columnsCount={3} gutter="15px">
          {state.photos.length > 0 &&
            state.photos.map((photo) => {
              return (
                <img
                  key={photo._id}
                  className="card-img-top"
                  alt="This is alt attribute"
                  src={photo.url}
                  onClick={() => {
                    setDeleteId(photo._id);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#deletePhoto"
                />
              );
            })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default App;
