import React from 'react';
import { Svg, Path, Line, Circle, Text as SvgText } from 'react-native-svg';

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {

  const adjustedAngle = 180 - angle; 
  const rad = (adjustedAngle * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad), 
  };
};

const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? '1' : '0';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`; 
};

const ORIGauge = ({ value }: { value: number }) => {
  const width = 300;
  const height = 160;
  const radius = 100;
  const centerX = width / 2;
  const centerY = height;

  // Ajustamos el ángulo: 0° (rojo) a 180° (verde)
  const angle = ((100 - value) / 100) * 180;

  //posición final de la aguja
  const needleEnd = polarToCartesian(centerX, centerY, radius - 10, angle);


  const segments = [
    { start: 0, end: 36, color: '#f44336' },   // rojo (0%)
    { start: 36, end: 72, color: '#ff9800' },  
    { start: 72, end: 108, color: '#ffeb3b' }, 
    { start: 108, end: 144, color: '#8bc34a' },
    { start: 144, end: 180, color: '#4caf50' } // verde intenso (100%)
  ];

  return (
    <Svg width={width} height={height + 40}>
      {segments.map((s, i) => (
        <Path
          key={i}
          d={describeArc(centerX, centerY, radius, s.start, s.end)}
          stroke={s.color}
          strokeWidth="18"
          fill="none"
        />
      ))}

      {/* Aguja */}
      <Line
        x1={centerX}
        y1={centerY}
        x2={needleEnd.x}
        y2={needleEnd.y}
        stroke="#000"
        strokeWidth="3"
      />
      <Circle cx={centerX} cy={centerY} r="6" fill="#000" />

      <SvgText
        x={centerX}
        y={centerY + 30}
        fontSize="18"
        fill="#000"
        textAnchor="middle"
      >
        ORI: {value}
      </SvgText>
    </Svg>
  );
};

export default ORIGauge;