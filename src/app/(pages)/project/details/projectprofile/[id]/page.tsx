import ProjectForm from "@/components/project/details/basic/general/page";
import NavBar from "@/components/profilenav/page";
const page = () => {
  return (
    <div className="mt-20">
      <NavBar/>
      <ProjectForm />
    </div>
  );
};
export default page;
