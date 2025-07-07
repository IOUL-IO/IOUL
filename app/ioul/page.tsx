"use client";
import React, { useEffect } from 'react';
import LegacyScripts, { runLegacyScripts } from '../legacy-scripts';

export default function Page() {
  useEffect(() => {
    // After the HTML is in the DOM, re-run legacy scripts to attach events
    runLegacyScripts();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: `
<p style="display:none" lang="en">This page is already in English. No translation is needed.</p>

<div class="layer-one"></div>
<div class="layer-two"></div>
<div class="layer-three"></div>

<div class="page-content">
  <!-- ... all the original HTML content including inline <script> tags ... -->
  <!-- For brevity, retain your existing template here -->
</div>
`}} />
  );
}
