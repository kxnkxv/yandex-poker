import svgToCanvas from 'Utils/svgToCanvas/svgToCanvas'

const AllInLabel = svgToCanvas(`

<svg width="140" height="72" viewBox="0 0 140 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.9">
<g filter="url(#filter0_d_450_2577)">
<rect width="100" height="32" rx="16" transform="matrix(-1 0 0 1 120 20)" fill="#FFED4B"/>
</g>
</g>
<defs>
<filter id="filter0_d_450_2577" x="0" y="0" width="140" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_450_2577"/>
<feOffset/>
<feGaussianBlur stdDeviation="8"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.929412 0 0 0 0 0.294118 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_450_2577"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_450_2577" result="shape"/>
</filter>
</defs>
</svg>


`)

export default AllInLabel
