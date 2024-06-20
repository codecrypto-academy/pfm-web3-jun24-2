"use client";

import React from "react";
import { saludar } from "./../../data";

export default function () {
  return <button onClick={() => saludar()}>Soy un boton</button>;
}
