import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { LexicalRichText } from "@yext/pages-components";
import * as React from "react";

type RelatedFAQProps = {
  faqs: FAQProps[];
};

type FAQProps = {
  question: string;
  answerV2: any;
};

const RelatedFaqs = ({ faqs }: RelatedFAQProps) => {
  console.log(JSON.stringify(faqs));

  return (
    <>
      {faqs.map((item, index: number) => (
        <React.Fragment key={index}>
          <FAQAccordion question={item.question} answerV2={item.answerV2} />
          {index >= 0 && index < 5 && <hr />}
        </React.Fragment>
      ))}
    </>
  );
};

export default RelatedFaqs;

const FAQAccordion = ({ question, answerV2 }: FAQProps) => {
  return (
    <section className="mx-auto w-full divide-y">
      <Disclosure as="h3" className="px-6 py-3" defaultOpen={false}>
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="text-left text-lg font-medium group-data-[hover]:/80">
            {question}
          </span>
          <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <div className="overflow-hidden py-2">
          <DisclosurePanel
            transition
            className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
          >
            <LexicalRichText serializedAST={JSON.stringify(answerV2.json)} />
          </DisclosurePanel>
        </div>
      </Disclosure>
    </section>
  );
};
