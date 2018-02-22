
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
} from './types';


// used: set new location id
export const mapLocationChanged = (text) => {
  return {
    type: MAP_LOCATION_ID_CHANGED,
    payload: text 
  };
};
export const placeMarkersReset = () => {
  return {
    type: MAP_PLACE_MARKERS_RESET, 
  };
};

export const selectMarker = (marker) => {
  return (dispatch) => ({
    type: MAP_SELECTED_MARKER_CHANGED,
    payload: marker
  });
};

// Used: set the user's position
export const userPositionChanged = (coords) => {
  return {
    type: MAP_USER_POSITION_CHANGED,
    payload: coords 
  };
};

// Used: set list of place markers
export const placeMarkersChanged = (markers) => {
  return {
    type: MAP_PLACE_MARKERS_CHANGED, 
    payload: markers
  };
};

const getPosition = (dispatch, coords) => {
  dispatch({
    type: MAP_INITIAL_POSITION, 
    payload: coords 
  });
}
// used: set the map region
export const mapRegionChanged = (region) => {
  console.log("OUTPUT REGION", region);
  return {
    type: MAP_REGION_CHANGED,
    payload: region
  };
};

export const setRoute = (route) => {
  
  console.log("from the action creator: ", route.dtd);
  return (dispatch) => {
   setProperDistance(dispatch, route);
  }
}

const setProperDistance = (dispatch, route) => {
  dispatch({
    type: SET_ROUTE,
    payload: route
  });
};

export const requestMarker = (routeId) => {
  return {
    type: GET_MARKER, 
    routeId 
  }
}

export const fetchMarker = (routeId) => {
  return (dispatch) => {
    dispatch(requestMarker(routeId))
    return "Hej";
  }
}

export const getAsyncPosition = (region, cb) => async (dispatch) => {
  try {
    dispatch({ 
      type: MAP_ASYNC,
      payload: region.id 
    });
    dispatch({
      type: SET_ROUTE,
      payload: region.route 
    })
    cb();
  } catch (err) {
    console.log(err);
  }
};


// Used: set a new route 
export const mapRouteChanged = (route) => {
  return (dispatch) => {
    dispatch({
      type: SET_ROUTE, 
      payload: route
    });
    loadRoute(dispatch, route);
  }
}

export const loadRoute = (dispatch, route) => {
  return (dispatch) => {
    dispatch({type: GET_ROUTE, payload: route});
  }
}