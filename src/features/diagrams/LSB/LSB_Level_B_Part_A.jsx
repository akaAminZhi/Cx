import RoomPlateOverlay from "../../../ui/RoomPlateOverlay";
import PropTypes from "prop-types";

function LSB_Level_B_Part_A({ highlightedRooms, onRoomClick }) {
  return (
    <RoomPlateOverlay
      imageSrc="/level_b_part_a.webp"
      jsonPath="/LSB_Level_B_Part_A.json"
      highlightedRooms={highlightedRooms}
      onRoomClick={onRoomClick}
    />
  );
}

LSB_Level_B_Part_A.propTypes = {
  highlightedRooms: PropTypes.instanceOf(Set),
  onRoomClick: PropTypes.func,
};

export default LSB_Level_B_Part_A;
