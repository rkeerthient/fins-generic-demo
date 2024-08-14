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
      <Disclosure as="section" className="px-3 md:px-6" defaultOpen={false}>
        <DisclosureButton className="group flex w-full items-center justify-between">
          <h4 className="text-left">{question}</h4>
          <ChevronDownIcon className="size-5 text-primary fill-primary group-data-[hover]:fill-primary/50 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 text-sm md:text-base"
          >
            <LexicalRichText serializedAST={JSON.stringify(answerV2.json)} />
          </DisclosurePanel>
        </div>
      </Disclosure>
    </section>
  );
};
