import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Image } from "@yext/pages-components";
import ProfessionalCardUniv from "./cards/ProfessionalCardUniv";

const OurTeam = ({ teamMembers }: any) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-2 md:grid-cols-4">
      {teamMembers
        .filter(
          (teamMember: any) => teamMember.c_individualOrTeam === "INDIVIDUAL"
        )
        .map((teamMember: any) => {
          return (
            <ProfessionalCardUniv key={teamMember.id} result={teamMember} />
          );
        })}
    </ul>
  );
};

export default OurTeam;
