export const BallsBg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
              viewBox="0 0 800 750">
            <defs>
                <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%"
                        filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="40" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic"
                                    edgeMode="none" result="blur"></feGaussianBlur>
                </filter>
            </defs>
            <g filter="url(#bbblurry-filter)">
                <ellipse rx="150" ry="150" cx="324.33446482713316" cy="236.17086784003288"
                         fill="hsla(345, 100%, 60%, 0.62)"></ellipse>
                <ellipse rx="150" ry="150" cx="542.9376310178745" cy="443.61638653340765"
                         fill="hsla(345, 100%, 60%, 0.62)"></ellipse>
                <ellipse rx="150" ry="150" cx="295.1708271765584" cy="535.641334413858"
                         fill="hsla(345, 100%, 60%, 0.45)"></ellipse>
            </g>
        </svg>
    )
}