import React, { useState, useRef, useEffect, FC } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import {
  MapPinIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import ClearDataButton from "./ClearDataButton";
import uiUseStore from "@/store/UIStore";
import "./Google.css";
import { Config } from "@/constants/config";
import toast from "react-hot-toast";
import HeroSearchCustomToast from "@/components/CustomToast/HeroSearchCustomToast";
import { StatusMessages } from "@/constants/StatusMessages";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  autoFocus?: boolean;
  mobileClassName?: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

type AddressComponents = AddressComponent[];

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you looking?",
  className = "nc-flex-1.5",
  mobileClassName = ""
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: Config.KEY.MAP,
    libraries: ["places", "marker"]
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [zipcode, setZipcode] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showPopover, setShowPopover] = useState(autoFocus);
  const {
    HeaderLocation,
    setHeaderLocation,
    setIsHeaderBorderVisible,
    setIsShowCareVeticalLine,
    locationvalue,
    setLocationValue,
    setLongitude,
    setLatitude,
    setStorePostalCode
  } = uiUseStore();

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!showPopover || containerRef.current.contains(event.target as Node)) {
        return;
      }
      setShowPopover(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopover]);

  useEffect(() => {
    if (inputRef.current && autocompleteRef.current) {
      const element = document.getElementsByClassName(
        "pac-container"
      )[0] as HTMLElement;
      if (element) {
        element.style.width = `${inputRef.current.offsetWidth}px`;
      }
    }
    setIsScriptLoaded(isLoaded);
  }, [isLoaded]);

  useEffect(() => {
    setLocationValue(HeaderLocation || locationvalue || "");
  }, [HeaderLocation]);

  const getComponent = (
    components: AddressComponents,
    type: string
  ): string => {
    return (
      components.find((component) => component.types.includes(type))
        ?.long_name || ""
    );
  };

  const fetchPostalCode = async (lat: number, lng: number) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${Config.KEY.MAP}`;
    const response = await fetch(url);
    const data = await response.json();
    const postalCodeComponent = data.results[0].address_components.find(
      (comp: AddressComponent) => comp.types.includes("postal_code")
    );
    return postalCodeComponent
      ? postalCodeComponent.long_name
      : "Postal code not available";
  };

  const extractAddress = (address: string) => {
    const addressComponents = address.split(","); // Split address by commas
    return addressComponents.slice(0, -1).join(", "); // Remove postal
  };

  const handlePlaceChanged = async () => {
    console.log(autocompleteRef.current);
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const lat = place.geometry?.location!.lat() ?? 0;
      const lng = place.geometry?.location!.lng() ?? 0;

      if (place.geometry) {
        const address = extractAddress(
          place.formatted_address || place.name || ""
        );

        const components = place.address_components as AddressComponents;
        let postalCode = getComponent(components, "postal_code");

        if (!postalCode && place.geometry.location) {
          postalCode = await fetchPostalCode(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        }

        if (!address) {
          toast.custom((t) => (
            <HeroSearchCustomToast
              icon={
                <ExclamationTriangleIcon
                  className="h-10 w-10 rounded-full text-yellow-400"
                  aria-hidden="true"
                />
              }
              description1={
                StatusMessages.ErrorMessage.LocationInputValidationDescription1
              }
              description2={
                StatusMessages.ErrorMessage.LocationInputValidationDescription2
              }
              toasttype={t}
            />
          ));
        }
        localStorage.setItem("LocationValue", address || "");
        setLocationValue(address);
        setHeaderLocation(address ?? "");
        setZipcode(postalCode);
        setStorePostalCode(postalCode);
        setShowPopover(false);
        setLatitude(lat);
        setLongitude(lng);
        setIsShowCareVeticalLine(true);
        setIsHeaderBorderVisible(true);
      }
    }
  };

  if (!isScriptLoaded) return <div>Loading...</div>;

  return (
    <div
      className={`relative flex ${className} xl:dark:bg-gray-800 xl:bg-white xl:px-0 xs:px-9`}
      ref={containerRef}
    >
      <div
        onClick={() => {
          setShowPopover(true);
          setIsHeaderBorderVisible(false);
          setIsShowCareVeticalLine(false);
        }}
        className={`flex px-10 z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${showPopover ? "nc-hero-field-focused" : ""
          } dark:text-white text-black ${mobileClassName}`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="xs:w-7 xs:h-7 sm:w-7 sm:h-7" />
        </div>
        <div className="flex-grow">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xs:text-xs lg:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
              placeholder={placeHolder}
              value={locationvalue}
              autoFocus={showPopover}
              onChange={(e) => setLocationValue(e.currentTarget.value)}
              ref={inputRef}
              required
            />
          </Autocomplete>
          <span className="block mt-0.5 xs:text-xs lg:text-sm text-neutral-400 font-light dark:text-neutral-300">
            <span className="line-clamp-1">
              {!!locationvalue ? placeHolder : desc}
            </span>
          </span>
          {locationvalue && showPopover && (
            <ClearDataButton
              onClick={() => {
                setLocationValue("");
                setZipcode("");
                setStorePostalCode("");
                inputRef.current?.focus();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
