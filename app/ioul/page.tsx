"use client";
import React, { useState } from "react";
import "./styles.css"; // ensure this file is alongside

interface Elem { top: string; left: number; className: string; text: string; }
const itemTexts: Elem[] = [
  { top: '35.4vh', left: 96.0, className: 'item-text', text: '1ncOME' },
  { top: '41.6vh', left: 96.0, className: 'item-text', text: 'cL1EnT' },
  { top: '35.4vh', left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '41.6vh', left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '35.4vh', left: 118.0, className: 'item-text', text: 'T1cKETS' },
  { top: '41.6vh', left: 118.0, className: 'item-text', text: '1nQU1RY' },
  { top: '35.4vh', left: 131.0, className: 'item-text right-flow', text: '0' },
  { top: '41.6vh', left: 131.0, className: 'item-text right-flow', text: '0' },
  { top: '35.4vh', left: 139.0, className: 'item-text', text: 'OnL1nE' },
  { top: '41.6vh', left: 139.0, className: 'item-text', text: 'JO1nED' },
  { top: '35.4vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '41.6vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '53vh', left: 139.0, className: 'item-text', text: 'JOBLOg' },
  { top: '59.2vh', left: 139.0, className: 'item-text', text: 'H1R1ngS' },
  { top: '65.4vh', left: 139.0, className: 'item-text', text: 'ORDERS' },
  { top: '71.6vh', left: 139.0, className: 'item-text', text: '1nV1TES' },
  { top: '53vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '59.2vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '65.4vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '71.6vh', left: 153.4, className: 'item-text right-flow', text: '0' },
  { top: '53vh', left: 96.0, className: 'item-text', text: 'cL1cKS' },
  { top: '59.2vh', left: 96.0, className: 'item-text', text: 'LEADS' },
  { top: '53vh', left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '59.2vh', left: 109.0, className: 'item-text right-flow', text: '0' },
  { top: '53vh', left: 118.0, className: 'item-text', text: 'AD cTR' },
  { top: '59.2vh', left: 118.0, className: 'item-text', text: 'AD cPc' },
  { top: '53vh', left: 131.0, className: 'item-text right-flow', text: '0' },
  { top: '59.2vh', left: 131.0, className: 'item-text right-flow', text: '0' },
];

const centerTexts: Elem[] = [
  { top: '35.4vh', left: 106.0, className: 'center-text', text: 'UPDATES' },
  { top: '41.6vh', left: 106.0, className: 'center-text', text: 'cATALOg' },
  { top: '35.4vh', left: 119.0, className: 'center-text right-flow', text: '0' },
  { top: '41.6vh', left: 119.0, className: 'center-text right-flow', text: '0' },
  { top: '35.4vh', left: 128.0, className: 'center-text', text: 'T1cKETS' },
  { top: '41.6vh', left: 128.0, className: 'center-text', text: 'cOnTAcT' },
  { top: '35.4vh', left: 141.0, className: '
