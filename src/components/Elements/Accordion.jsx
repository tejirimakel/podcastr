import React from "react";
import styled from "styled-components";
import AccordionItem from "./AccordionItem";

const data = [
  {
    title: "How many team members can I invite?",
    content:
      "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
  },
  {
    title: "What is the maximum file upload size?",
    content:
      "No more than 2GB. All files in your account must fit your allotted storage space.",
  },
  {
    title: "How do I reset my password?",
    content: `Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.`,
  },
  {
    title: "Can I cancel my subscription?",
    content: `Yes! Send us a message and we’ll process your request no questions asked.`,
  },
  {
    title: "Do you provide additional support?",
    content: `Chat and email support is available 24/7. Phone lines are open during normal business hours.`,
  },
];

function Accordion() {
  return (
    <Wrapper id="faq">
      <div className="">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold textCenter leading-tight">
              Frequently Asked Questions
            </h1>
          </HeaderInfo>

          <div {...{ className: "wrapper" }}>
            <ul {...{ className: "accordion-list" }}>
              {data.map((data, key) => {
                return (
                  <li {...{ className: "accordion-list__item", key }}>
                    <AccordionItem {...data} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default Accordion;

const Wrapper = styled.section`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;
const HeaderInfo = styled.div`
  margin-bottom: 3.5rem;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
