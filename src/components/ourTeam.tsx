import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Image } from "@yext/pages-components";

const OurTeam = ({ teamMembers }: any) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {teamMembers
        .filter(
          (teamMember: any) => teamMember.c_individualOrTeam === "INDIVIDUAL"
        )
        .map((teamMember: any) => {
          const { id, name, mainPhone, emails, headshot, fins_jobTitle, slug } =
            teamMember;
          return (
            <li
              key={id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-start space-x-6 p-6">
                <Image
                  image={headshot}
                  className="!h-24 !w-24 flex-shrink-0 rounded-full bg-gray-300"
                ></Image>
                <div className="flex flex-col items-center space-x-3">
                  <h3 className="truncate text-lg font-medium ">{name}</h3>
                  <p className="">{fins_jobTitle}</p>
                </div>
              </div>
              <div className="flex flex-col w-full px-8  py-4 gap-4">
                <a
                  href={`tel:${mainPhone}`}
                  className="flex flex-row items-center justify-start gap-x-3 rounded-br-lg border border-transparent  text-sm font-semibold "
                >
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                  {mainPhone}
                </a>
                <a
                  href={`mailto:hi@hi.com`}
                  className="flex flex-row items-center justify-start gap-x-3 rounded-bl-lg border border-transparent text-sm font-semibold "
                >
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                  {emails && emails[0]}
                </a>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default OurTeam;
