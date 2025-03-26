import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function ProjectRow({ project }) {
  const { image, name: projectName, id: projectId } = project;
  const navigate = useNavigate();
  const hoverAcition =
    "hover:scale-103 hover:cursor-pointer hover:font-bold  hover:shadow-lg hover:rounded-xl hover:ring-3 hover:ring-gray-500 ";
  const activeAction =
    "active:scale-103 active:cursor-pointer active:font-bold  active:shadow-lg active:rounded-xl active:ring-3 active:ring-gray-500 ";

  const handleClick = () => {
    // e.preventDefault(); // 阻止默认跳转
    // 延迟跳转 300 毫秒，让 active 效果有机会显示
    if (window.matchMedia("(max-width: 1028px)").matches) {
      setTimeout(() => {
        navigate(`/projects/${projectId}`, { state: { projectName } });
      }, 300);
    } else {
      navigate(`/projects/${projectId}`, { state: { projectName } });
    }
  };
  return (
    <div
      onClick={handleClick}
      className={
        "grid grid-cols-2 gap-x-10 border-b-1 m-1 rounded   border-b-gray-100 p-8 items-center bg-white transition-all duration-200 " +
        hoverAcition +
        activeAction
      }
    >
      <img
        src={image}
        alt={projectName}
        className="block w-[6.4rem] aspect-[3/2] object-cover object-center transform scale-150 -translate-x-[4px]"
      ></img>
      <div className="text-2xl font-semibold text-gray-600  ">
        {projectName}
      </div>
    </div>
  );
}
ProjectRow.propTypes = {
  project: PropTypes.object,
};
export default ProjectRow;
