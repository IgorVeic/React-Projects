import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from "react";

interface RegionHeadingProps {
  page: string;
  totalCountriesPerRegion: Record<string, number>;
  sortBy: string;
  totalCountries: number;
}

const RegionHeading = ({
  page,
  totalCountriesPerRegion,
  sortBy,
  totalCountries,
}: RegionHeadingProps) => {
  const regionTotalCountries = useMemo(
    () => totalCountriesPerRegion[page.toLowerCase()],
    [page, totalCountriesPerRegion]
  );

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-4">{`${page} Page`}</h1>
      <p className="text-center text-lg mb-4">
        <FontAwesomeIcon icon={faGlobe} className="mr-2" />
        Total Countries:{" "}
        <span className="font-bold">
          {sortBy === "all" ? regionTotalCountries : totalCountries}
        </span>
      </p>
      {page === "Oceania" &&
        sortBy === "landlocked" &&
        totalCountries === 0 && (
          <p className="text-center text-lg font-bold text-red-500">
            There are no landlocked countries in Oceania.
          </p>
        )}
    </>
  );
};

export default RegionHeading;
