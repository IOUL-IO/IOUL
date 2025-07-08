"use client";
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Legacy script logic (unchanged)...
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<!-- Fixed white mask layers -->
  <div class="layer-one"></div>
  <div class="layer-two"></div>
  <div class="layer-three"></div>
  <div class="layer-four"></div>
  <div class="layer-five"></div>
  <div class="layer-six"></div>

  <!-- All visible UI sits inside page‑content -->
  <div class="page-content">

    <!-- Primary guideline lines -->
    <div class="line original"></div>
    <div class="line second"></div>
    <div class="line third"></div>
    <div class="line fourth"></div>
    <div class="line fifth"></div>
    <div class="line sixth"></div>

    <div class="line util-line"></div>

    <span class="custom-text job-item" style="position:absolute; top:35.4vh; left:6.41vw;">JOB LOg</span>
    <span class="custom-text job-item" style="position:absolute; top:41.6vh; left:6.41vw;">APPL1ED</span>
    <span class="custom-text job-item" style="position:absolute; top:53vh; left:6.41vw;">QUAL1FY</span>
    <span class="custom-text job-item" style="position:absolute; top:59.2vh; left:6.41vw;">1n1T1ATE</span>

    <span class="custom-text right-flow job-item" style="position:absolute; top:35.4vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:41.6vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:53vh; left:28.41vw;">0</span>
    <span class="custom-text right-flow job-item" style="position:absolute; top:59.2vh; left:28.41vw;">0</span>

    <!-- Divider line that used to slide with the containers -->
    <div class="custom-line job-item"></div>

    <!-- Item lines -->
    <div class="job-line job-line-one" style="position:absolute; top:47.8vh; left:36vw; width:36vw;"></div>
    <div class="job-line job-line-two" style="position:absolute; top:47.8vh; left:79vw; width:14.8vw;"></div>

    <!-- Center lines -->
    <div class="freelance-line freelance-line-one" style="position:absolute; top:47.8vh; left:106.0vw; width:36vw;"></div>
    <div class="freelance-line freelance-line-two" style="position:absolute; top:47.8vh; left:149.0vw; width:14.8vw;"></div>

    <!-- Center texts -->
    <span class="freelance-text" style="position:absolute; top:35.4vh; left:106.0vw;">LOOK UP:</span>
    <span class="freelance-text" style="position:absolute; top:41.6vh; left:106.0vw;">JOB LOg:</span>
    <span class="freelance-text right-flow" style="position:absolute; top:35.4vh; left:119.7vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:41.6vh; left:119.7vw;">0</span>
    <span class="freelance-text" style="position:absolute; top:35.4vh; left:128.0vw;">PER1OD:</span>
    <span class="freelance-text" style="position:absolute; top:41.6vh; left:128.0vw;">F1LTER:</span>
    <span class="freelance-text right-flow" style="position:absolute; top:35.4vh; left:141.0vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:41.6vh; left:141.0vw;">0</span>
    <span class="freelance-text" style="position:absolute; top:35.4vh; left:149.0vw;">RAT1ngS</span>
    <span class="freelance-text" style="position:absolute; top:41.6vh; left:149.0vw;">REcE1PT</span>
    <span class="freelance-text right-flow" style="position:absolute; top:53vh; left:163.4vw;">0</span>
    <span class="freelance-text right-flow" style="position:absolute; top:59.2vh; left:163.4vw;">0</span>

    <!-- Item texts -->
    <span class="job-text" style="position:absolute; top:35.4vh; left:36vw;">LOOK UP:</span>
    <span class="job-text" style="position:absolute; top:41.6vh; left:36vw;">OPT FOR:</span>
    <span class="job-text right-flow" style="position:absolute; top:35.4vh; left:49.7vw;">0</span>
    <span class="job-text right-flow" style="position:absolute; top:41.6vh; left:49.7vw;">0</span>
    <span class="job-text" style="position:absolute; top:35.4vh; left:58vw;">PER1OD:</span>
    <span class="job-text" style="position:absolute; top:41.6vh; left:58vw;">F1LTER:</span>
    <span class="job-text right-flow" style="position:absolute; top:35.4vh; left:71vw;">0</span>
    <span class="job-text right-flow" style="position:absolute; top:41.6vh; left:71vw;">0</span>
    <span class="job-text" style="position:absolute; top:35.4vh; left:79vw;">AcT1VE</span>
    <span class="job-text" style="position:absolute; top:41.6vh; left:79vw;">JO1nED</span>
    <span class="job-text right-flow" style="position:absolute; top:35.4vh; left:93.4vw;">0</span>
    <span class="job-text right-flow" style="position:absolute; top:41.6vh; left:93.4vw;">0</span>
    <span class="job-text" style="position:absolute; top:53vh; left:79vw;">JA:</span>
    <span class="job-text" style="position:absolute; top:59.2vh; left:79vw;">JA:</span>
    <span class="job-text" style="position:absolute; top:65.4vh; left:79vw;">JA:</span>
    <span class="job-text" style="position:absolute; top:71.6vh; left:79vw;">JL:</span>
    <span class="job-text right-flow" style="position:absolute; top:53vh; left:93.4vw;">0</span>
    <span class="job-text right-flow" style="position:absolute; top:59.2vh; left:93.4vw;">0</span>
    <span class="job-text right-flow" style="position:absolute; top:65.4vh; left:93.4vw;">0</span>
    <span class="job-text right-flow" style="position:absolute; top:71.6vh; left:93.4vw;">0</span>

    <!-- Community & Zero items -->
    <div class="freelance-items-container" style="position:absolute; z-index:1;">
      <span class="custom-text" style="position:absolute; top:35.4vh; left:35.41vw;">OFFER LOg</span>
      <span class="custom-text" style="position:absolute; top:41.6vh; left:35.41vw;">ORDER LOg</span>
      <span class="custom-text" style="position:absolute; top:53vh; left:35.41vw;">HELP LOg</span>
      <span class="custom-text" style="position:absolute; top:59.2vh; left:35.41vw;">JUnK LOg</span>
      <div class="custom-line" style="position:absolute; top:47.8vh; left:35.41vw; width:22.48vw; height:1px; background:rgba(230,230,230,0.28);"></div>
    </div>
    <div class="zero-items-container" style="position:absolute; z-index:1;">
      <span class="custom-text right-flow" style="position:absolute; top:35.4vh; left:57.4vw;">0</span>
      <span class="custom-text right-flow" style="position:absolute; top:41.6vh; left:57.4vw;">0</span>
      <span class="custom-text right-flow" style="position:absolute; top:53vh; left:57.4vw;">0</span>
      <span class="custom-text right-flow" style="position:absolute; top:59.2vh; left:57.4vw;">0</span>
    </div>
`
      }}
    />
  );
}
