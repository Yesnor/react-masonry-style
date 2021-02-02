import React from "react";
export const context = React.createContext();

export const initialState = {
  photos: [],
  allPhotos: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_all_photos":
      return { ...state, photos: action.payload, allPhotos: action.payload };
    case "add_photo":
      return {
        ...state,
        allPhotos: [...state.allPhotos, action.payload],
        photos: [...state.photos, action.payload],
      };
    case "filter_photos":
      const newState = state.allPhotos.filter((item) => {
        return item.description.toLowerCase().indexOf(action.payload) !== -1;
      });
      return {
        ...state,
        photos: [...newState],
      };
    default:
      return state;
  }
};
