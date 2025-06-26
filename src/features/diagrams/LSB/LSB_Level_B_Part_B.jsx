import RoomPlateOverlay from "../../../ui/RoomPlateOverlay";
import PropTypes from "prop-types";

function LSB_Level_B_Part_B({ highlightedRooms, onRoomClick }) {
  return (
    <RoomPlateOverlay
      imageSrc="/level_b_part_b.webp"
      jsonPath="/LSB_Level_B_Part_B.json"
      highlightedRooms={highlightedRooms}
      onRoomClick={onRoomClick}
    />
  );
}

LSB_Level_B_Part_B.propTypes = {
  highlightedRooms: PropTypes.instanceOf(Set),
  onRoomClick: PropTypes.func,
};

export default LSB_Level_B_Part_B;
