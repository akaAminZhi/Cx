import ProjectTable from "../features/projects/ProjectTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Projects() {
  return (
    <>
      <Row type="horizontal">
        <Heading>All Projects</Heading>
      </Row>
      <Row>
        <ProjectTable></ProjectTable>
      </Row>
    </>
  );
}

export default Projects;
