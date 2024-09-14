import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin h-40 w-40" />
    </div>
  );
}
