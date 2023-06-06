"use client";
import React from "react";

const ContactCard = (props) => {
  const contact = props.contactdetails;

  return (
    <>
      {contact.map((c) => {
        return (
          <div key={c.contact_value} className="mb-6">
            <label
              htmlFor={c.contact_type}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {c.contact_type.charAt(0) + c.contact_type.slice(1).toLowerCase()} No.
            </label>
            <input
              type="text"
              id={c.contact_type}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={c.contact_value}
              disabled
            />
          </div>
        );
      })}
    </>
  );
};

export default ContactCard;
