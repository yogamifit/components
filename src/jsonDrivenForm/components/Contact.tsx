import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import FormContext from "../FormContext";
import { ContactLayout, Layout } from "../types";

export default function Contact() {
  const { data, update } = useContext(FormContext);

  const selectedContactMethod = data.contactMethod as string;
  const currentContactDetail = data.phone as string;

  function handleContactMethodSelect(contactMethod: string) {
    update("contactMethod", contactMethod);
  }

  function handleContactDetailChange(contactDetail: string) {
    update("phone", contactDetail);
  }

  useEffect(() => {
    if (!selectedContactMethod) {
      update("contactMethod", "whatsapp");
    }
  }, [selectedContactMethod, update]);

  useEffect(() => {
    const phone = localStorage.getItem("phone");
    if (phone) {
      update("phone", phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <SelectWrapper>
        <Select
          name="contact_method"
          onChange={(e) => handleContactMethodSelect(e.target.value)}
          value={selectedContactMethod}
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="sms">SMS</option>
          <option value="imessage">iMessage</option>
          <option value="phone">Phone call</option>
        </Select>
      </SelectWrapper>
      <TextInput
        name="contact-detail"
        type="tel"
        value={currentContactDetail || ""}
        onChange={(e) => handleContactDetailChange(e.target.value)}
        placeholder={
          {
            sms: "Example, +919876543210",
            whatsapp: "Example, +919876543210",
            imessage: "Example, +919876543210",
            phone: "Example, +919876543210",
          }[selectedContactMethod]
        }
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
`;

const SelectWrapper = styled.div`
  border-radius: 7px;
  border: 1px solid #a7a7a7;
  margin-right: 10px;
  width: 200px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  border: none;
  background-color: white;
  width: 100%;
`;

const TextInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #a7a7a7;

  :focus {
    border: 1px solid #e86c00;
  }
`;

export function isContactLayout(layout: Layout): layout is ContactLayout {
  if (layout.type === "contact") return true;
  return false;
}
