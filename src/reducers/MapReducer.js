import {
  MAP_LOCATION_ID_CHANGED,
  MAP_ATTRACTION_FETCH,
  MAP_SELECTED_MARKER_CHANGED,
  MAP_INITIAL_POSITION,
  MAP_ASYNC,
  SET_ROUTE,
  GET_MARKER,
  GET_ROUTE,
  MAP_REGION_CHANGED,
  MAP_USER_POSITION_CHANGED,
  MAP_PLACE_MARKERS_CHANGED,
  MAP_PLACE_MARKERS_RESET
} from '../actions/types';

const INITIAL_STATE = {
  locationId: '',

  // must have an initial state to work
  region: {
    latitude: 48.15278342806624,
  longitude: 11.583065316081047,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
  },
  currentPosition: {}, 
  initialPosition: null, 
  selectedMarkerPosition: null,
  markers: null, 
  route: ''  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case MAP_REGION_CHANGED:
      return {...state, region: action.payload };
    case MAP_USER_POSITION_CHANGED:
      return {...state, currentPosition: action.payload};
    case MAP_PLACE_MARKERS_CHANGED:
      return {...state, markers: action.payload };
    case MAP_PLACE_MARKERS_RESET: 
      return {...state, markers: INITIAL_STATE.markers};
    case MAP_LOCATION_ID_CHANGED:
      console.log("In the reducer: ", action.payload);
      return { ...state, locationId: action.payload};
    case MAP_ATTRACTION_FETCH: 
      return { ...state};
    case MAP_SELECTED_MARKER_CHANGED: 
      return { ...state, selectedMarkerPosition: action.payload };
    case MAP_INITIAL_POSITION: 
      console.log("What the reducer sees: ", action.payload);
      return {...state, initialPosition: action.payload };
    case MAP_ASYNC:
      console.log("Async Map Reducer", action.payload); 
      return {...state, locationId:  action.payload};
    case SET_ROUTE: 
      return  {...state, route: action.payload };
    case GET_MARKER: 
      return { ...state, route: action.payload};
    case GET_ROUTE: 
      return state;
    default:
    return state;
  }
};