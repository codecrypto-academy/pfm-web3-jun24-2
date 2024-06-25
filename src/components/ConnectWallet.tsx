"use client";

import React from "react";
import { getDonations } from "@/lib/events";

export default function () {
  return <button onClick={() => getDonations('')}>Soy un boton</button>;
}
