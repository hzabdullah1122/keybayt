"use client";

import { useCallback, useMemo } from "react";
import { Input, SearchableSelect } from "@/components/ui";
import FormSection from "@/components/projects/shared/FormSection";
import MapPinPicker from "@/components/projects/location/MapPinPicker";
import LocationDetectNote from "@/components/projects/location/LocationDetectNote";
import { useAddressSearch } from "@/hooks/useAddressSearch";
import { useDetectedLocation } from "@/hooks/useDetectedLocation";
import { toLocationOptions } from "@/lib/locationMatch";
import { placesService } from "@/services/placesService";

export default function LocationSection({ form }) {
  const { values, set, setRegion, setCity, fillLocationIfEmpty } = form;
  const { status: locationStatus, detected } = useDetectedLocation(fillLocationIfEmpty);

  const placePin = useCallback(
    ({ lat, lng }) => {
      set("lat", lat);
      set("lng", lng);
    },
    [set],
  );
  const addressSearch = useAddressSearch(placePin);

  const countryCode = detected?.countryCode;
  const near = useMemo(() => {
    if (values.lat !== null) return { lat: values.lat, lng: values.lng };
    return detected ? { lat: detected.lat, lng: detected.lng } : undefined;
  }, [values.lat, values.lng, detected]);

  const buildQuery = (address) =>
    [address, values.city, values.region].filter(Boolean).join(", ");

  // Lists come from the user's location + live place search (no fixed country lists).
  const regionOptions = useMemo(
    () => toLocationOptions([], detected?.region, values.region),
    [detected, values.region],
  );
  const cityOptions = useMemo(
    () =>
      toLocationOptions([], detected?.region === values.region ? detected.city : "", values.city),
    [detected, values.region, values.city],
  );
  const districtOptions = useMemo(
    () =>
      toLocationOptions([], detected?.city === values.city ? detected.district : "", values.district),
    [detected, values.city, values.district],
  );

  const searchLevel = (level) => async (query) => {
    const names = await placesService.search(level, query, {
      countryCode,
      region: values.region,
      city: values.city,
      near,
    });
    return names.map((name) => ({ value: name, label: name }));
  };

  return (
    <FormSection
      id="location"
      title="2. Location"
      description="Location carries 25% of the match score, so the map pin is required."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <SearchableSelect
          label="Region *"
          options={regionOptions}
          value={values.region}
          onChange={setRegion}
          onSearch={searchLevel("region")}
          placeholder="Select region"
          searchPlaceholder="Type to search regions..."
        />
        <SearchableSelect
          label="City *"
          options={cityOptions}
          value={values.city}
          onChange={setCity}
          onSearch={searchLevel("city")}
          placeholder={values.region ? "Select city" : "Select a region first"}
          searchPlaceholder="Type to search cities..."
          disabled={!values.region}
        />
        <SearchableSelect
          label="District *"
          options={districtOptions}
          value={values.district}
          onChange={(v) => set("district", v)}
          onSearch={searchLevel("district")}
          placeholder={values.city ? "Select district" : "Select a city first"}
          searchPlaceholder="Type to search districts..."
          disabled={!values.city}
        />
      </div>
      <LocationDetectNote status={locationStatus} detected={detected} />

      <Input
        label="Full address"
        value={values.address}
        onChange={(e) => {
          set("address", e.target.value);
          addressSearch.search(buildQuery(e.target.value), { countryCode });
        }}
        placeholder="Street, landmark or national address"
      />

      <MapPinPicker
        lat={values.lat}
        lng={values.lng}
        status={addressSearch.status}
        onChange={(point) => {
          placePin(point);
          addressSearch.reset();
        }}
        onFind={() =>
          addressSearch.search(buildQuery(values.address), { immediate: true, countryCode })
        }
        onClear={() => {
          set("lat", null);
          set("lng", null);
          addressSearch.reset();
        }}
      />
    </FormSection>
  );
}
