import { Result } from "@yext/search-headless-react";
import ProfessionalCardUniv from "./cards/ProfessionalCardUniv";
import Cta from "./cta";

interface TeamMember {
  id: string;
  c_individualOrTeam: "INDIVIDUAL" | "TEAM";
  result: Result<any>;
}

interface OurTeamProps {
  teamMembers: TeamMember[];
  name?: string;
}

const OurTeam = ({ teamMembers }: OurTeamProps) => {
  const individualMembers = teamMembers.filter(
    (teamMember) => teamMember.c_individualOrTeam === "INDIVIDUAL"
  );

  return (
    <ul role="list" className="grid grid-cols-1 gap-2 md:grid-cols-4">
      {individualMembers.map((teamMember: any) => (
        <li key={teamMember.id} role="listitem">
          <ProfessionalCardUniv result={teamMember} />
        </li>
      ))}
    </ul>
  );
};

const OurTeamMobile = ({ teamMembers, name }: OurTeamProps) => {
  const individualMembers = teamMembers.filter(
    (teamMember) => teamMember.c_individualOrTeam === "INDIVIDUAL"
  );
  const displayedMembers = individualMembers.slice(0, 10);

  return (
    <>
      <ul role="list" className="grid grid-cols-1 gap-2 md:grid-cols-4">
        {displayedMembers.map((teamMember: any) => (
          <li key={teamMember.id} role="listitem">
            <ProfessionalCardUniv result={teamMember} />
          </li>
        ))}
      </ul>
      {teamMembers.length > 10 && (
        <nav className="flex mt-8 flex-col md:flex-row gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
          <Cta
            buttonText="View more"
            style="primary"
            url={`/search.html?query=${name}+Professionals&vertical=financial_professionals`}
            classNames="md:px-4 md:py-1 md:text-sm rounded-md px-2 py-1 w-full text-center"
          />
        </nav>
      )}
    </>
  );
};

export { OurTeam, OurTeamMobile };
