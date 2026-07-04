"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LngLat = [number, number];

type City = {
  coordinates: LngLat;
  name: string;
  primary?: boolean;
};

type MapSize = {
  height: number;
  width: number;
};

const TILE_SIZE = 256;
const EARTH_CIRCUMFERENCE_MILES = 24901;
const MADISON: LngLat = [-89.4012, 43.0731];
const MIN_ZOOM = 6;
const MAX_ZOOM = 10;

const visibleCities: City[] = [
  { name: "Madison", coordinates: MADISON, primary: true },
  { name: "Sun Prairie", coordinates: [-89.2137, 43.1836] },
  { name: "Middleton", coordinates: [-89.5043, 43.0972] },
  { name: "Verona", coordinates: [-89.5332, 42.9908] },
  { name: "Waunakee", coordinates: [-89.4557, 43.1919] },
  { name: "Fitchburg", coordinates: [-89.4237, 43.0022] },
  { name: "DeForest", coordinates: [-89.3437, 43.2478] },
  { name: "Cottage Grove", coordinates: [-89.1998, 43.0761] },
  { name: "Stoughton", coordinates: [-89.2179, 42.9169] },
  { name: "Janesville", coordinates: [-89.0187, 42.6828] },
  { name: "Portage", coordinates: [-89.4626, 43.5391] },
  { name: "Baraboo", coordinates: [-89.7443, 43.4711] },
  { name: "Watertown", coordinates: [-88.7293, 43.1947] }
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeTileX(tileX: number, zoom: number) {
  const tileCount = 2 ** zoom;
  return ((tileX % tileCount) + tileCount) % tileCount;
}

function project([lng, lat]: LngLat, zoom: number) {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const worldSize = TILE_SIZE * 2 ** zoom;
  const x = ((lng + 180) / 360) * worldSize;
  const y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * worldSize;

  return { x, y };
}

function unproject(x: number, y: number, zoom: number): LngLat {
  const worldSize = TILE_SIZE * 2 ** zoom;
  const lng = (x / worldSize) * 360 - 180;
  const mercator = Math.PI - (2 * Math.PI * y) / worldSize;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(mercator) - Math.exp(-mercator)));

  return [lng, lat];
}

function milesToPixels(miles: number, latitude: number, zoom: number) {
  const worldSize = TILE_SIZE * 2 ** zoom;
  const milesPerPixel = (Math.cos((latitude * Math.PI) / 180) * EARTH_CIRCUMFERENCE_MILES) / worldSize;

  return miles / milesPerPixel;
}

function getNearestWrappedX(x: number, centerX: number, zoom: number) {
  const worldSize = TILE_SIZE * 2 ** zoom;
  let wrappedX = x;

  if (wrappedX - centerX > worldSize / 2) {
    wrappedX -= worldSize;
  }

  if (wrappedX - centerX < -worldSize / 2) {
    wrappedX += worldSize;
  }

  return wrappedX;
}

export function LocationsMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{ center: ReturnType<typeof project>; pointerX: number; pointerY: number } | null>(null);
  const [center, setCenter] = useState<LngLat>(MADISON);
  const [mapSize, setMapSize] = useState<MapSize>({ height: 560, width: 560 });
  const [zoom, setZoom] = useState(7);

  useEffect(() => {
    const element = mapRef.current;

    if (!element) {
      return undefined;
    }

    const updateSize = () => {
      const bounds = element.getBoundingClientRect();
      setMapSize({
        height: Math.max(bounds.height, 360),
        width: Math.max(bounds.width, 320)
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  const centerPixel = useMemo(() => project(center, zoom), [center, zoom]);
  const leftWorld = centerPixel.x - mapSize.width / 2;
  const topWorld = centerPixel.y - mapSize.height / 2;
  const tileCount = 2 ** zoom;
  const minTileX = Math.floor(leftWorld / TILE_SIZE) - 1;
  const maxTileX = Math.floor((leftWorld + mapSize.width) / TILE_SIZE) + 1;
  const minTileY = clamp(Math.floor(topWorld / TILE_SIZE) - 1, 0, tileCount - 1);
  const maxTileY = clamp(Math.floor((topWorld + mapSize.height) / TILE_SIZE) + 1, 0, tileCount - 1);
  const radiusPixels = milesToPixels(50, MADISON[1], zoom);
  const madisonPixel = project(MADISON, zoom);
  const madisonX = getNearestWrappedX(madisonPixel.x, centerPixel.x, zoom) - leftWorld;
  const madisonY = madisonPixel.y - topWorld;

  const tiles = [];

  for (let tileX = minTileX; tileX <= maxTileX; tileX += 1) {
    for (let tileY = minTileY; tileY <= maxTileY; tileY += 1) {
      tiles.push({
        key: `${zoom}-${tileX}-${tileY}`,
        left: tileX * TILE_SIZE - leftWorld,
        top: tileY * TILE_SIZE - topWorld,
        url: `https://tile.openstreetmap.org/${zoom}/${normalizeTileX(tileX, zoom)}/${tileY}.png`
      });
    }
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      center: centerPixel,
      pointerX: event.clientX,
      pointerY: event.clientY
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;

    if (!dragStart) {
      return;
    }

    const worldSize = TILE_SIZE * 2 ** zoom;
    const nextX = dragStart.center.x - (event.clientX - dragStart.pointerX);
    const nextY = clamp(dragStart.center.y - (event.clientY - dragStart.pointerY), 0, worldSize);

    setCenter(unproject(nextX, nextY, zoom));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom((currentZoom) => clamp(currentZoom + (event.deltaY < 0 ? 1 : -1), MIN_ZOOM, MAX_ZOOM));
  };

  const zoomIn = () => setZoom((currentZoom) => clamp(currentZoom + 1, MIN_ZOOM, MAX_ZOOM));
  const zoomOut = () => setZoom((currentZoom) => clamp(currentZoom - 1, MIN_ZOOM, MAX_ZOOM));

  return (
    <div className="locations-map-real">
      <div
        ref={mapRef}
        aria-label="Interactive map centered on Madison, Wisconsin"
        className="locations-map-real__canvas"
        onPointerCancel={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        role="application"
      >
        <div className="locations-map-real__tiles" aria-hidden="true">
          {tiles.map((tile) => (
            // Map tiles are dynamic raster coordinates, so Next Image optimization is not appropriate here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              className="locations-map-real__tile"
              draggable={false}
              height={TILE_SIZE}
              key={tile.key}
              src={tile.url}
              style={{ left: tile.left, top: tile.top }}
              width={TILE_SIZE}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="locations-map-real__radius"
          style={{
            height: radiusPixels * 2,
            left: madisonX - radiusPixels,
            top: madisonY - radiusPixels,
            width: radiusPixels * 2
          }}
        />

        {visibleCities.map((city) => {
          const cityPixel = project(city.coordinates, zoom);
          const left = getNearestWrappedX(cityPixel.x, centerPixel.x, zoom) - leftWorld;
          const top = cityPixel.y - topWorld;

          return (
            <div
              className={city.primary ? "locations-map-marker locations-map-marker--primary" : "locations-map-marker"}
              key={city.name}
              style={{ left, top }}
            >
              <span className="locations-map-marker__point" />
              <span className="locations-map-marker__label">{city.name}</span>
            </div>
          );
        })}
      </div>

      <div className="locations-map-real__controls" aria-label="Map zoom controls">
        <button aria-label="Zoom in" onClick={zoomIn} type="button">
          +
        </button>
        <button aria-label="Zoom out" onClick={zoomOut} type="button">
          -
        </button>
      </div>

      <div className="locations-map-real__legend">
        <span />
        Approximately 50 miles from Madison, WI
      </div>

      <a
        className="locations-map-real__open"
        href="https://www.openstreetmap.org/?mlat=43.0731&mlon=-89.4012#map=8/43.0731/-89.4012"
        rel="noreferrer"
        target="_blank"
      >
        Open larger map
      </a>
    </div>
  );
}
