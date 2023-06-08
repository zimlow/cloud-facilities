import React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Button } from "@react-email/button";
import { Text } from "@react-email/text";

export function Email(props) {
  return (
    <Html lang="en">
      <Head>
        <h1>Your Booking has been confirmed!</h1>
        <Hr />
        <Text>Your Booking Reference: {props.booking_ref}</Text>

        <p>Thank you for booking with us.</p>

        <Button href="localhost:3000/managebooking">Manage Booking</Button>
        <Hr />
      </Head>
    </Html>
  );
}
