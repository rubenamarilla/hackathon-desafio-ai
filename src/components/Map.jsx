import { useEffect, useState, useRef, useCallback } from "react"

import {
    APIProvider,
    Map,
    useMap,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps"

import { MarkerClusterer } from "@googlemaps/markerclusterer"
import { Circle } from './Circle.jsx'

const center = {
    lat: -25.2637,
    lng: -57.5759,
};

const MapComponent = ({locations=[]}) => (
  <div className="map">
  <APIProvider
    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    onLoad={() => console.log("Maps API has loaded.")}
  >
      <Map
        defaultZoom={13}
        defaultCenter={center}
        onCameraChanged={ev =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
        mapId="da37f3254c6a6d1c"
      >
          <PoiMarkers pois={locations} />
      </Map>
  </APIProvider>
  </div>
)

const PoiMarkers = props => {
    const map = useMap()
    const [markers, setMarkers] = useState({})
    const clusterer = useRef(null)
    const [circleCenter, setCircleCenter] = useState(null)
    const handleClick = useCallback(ev => {
        if (!map) return
        if (!ev.latLng) return
        console.log("marker clicked: ", ev.latLng.toString())
        map.panTo(ev.latLng)
        setCircleCenter(ev.latLng)
    })
    // Initialize MarkerClusterer, if the map has changed
    useEffect(() => {
        if (!map) return
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map })
        }
    }, [map])

    // Update markers, if the markers array has changed
    useEffect(() => {
        clusterer.current?.clearMarkers()
        clusterer.current?.addMarkers(Object.values(markers))
    }, [markers])

    const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return
        if (!marker && !markers[key]) return

        setMarkers(prev => {
            if (marker) {
                return { ...prev, [key]: marker }
            } else {
                const newMarkers = { ...prev }
                delete newMarkers[key]
                return newMarkers
            }
        })
    }

    return (
      <>
          <Circle
            radius={800}
            center={circleCenter}
            strokeColor={"#0c4cb3"}
            strokeOpacity={1}
            strokeWeight={3}
            fillColor={"#3b82f6"}
            fillOpacity={0.3}
          />
          {props.pois.map(poi => (
            <AdvancedMarker
              key={poi.key}
              position={poi.location}
              ref={marker => setMarkerRef(marker, poi.key)}
              clickable={true}
              onClick={handleClick}
            >
                <Pin
                  background={"#FBBC04"}
                  glyphColor={"#000"}
                  borderColor={"#000"}
                />
            </AdvancedMarker>
          ))}
      </>
    )
}

export default MapComponent;